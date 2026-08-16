import "server-only";

const LARK_API_BASE = "https://open.larksuite.com/open-apis";
const SALES_ACTIVITIES_TABLE_NAME = "Sales Activities";

type LarkResponse<T> = { code: number; msg: string; data?: T };
type LarkTokenResponse = LarkResponse<never> & {
  tenant_access_token?: string;
  expire?: number;
};

export type LarkField = {
  field_id: string;
  field_name: string;
  type: number;
  is_primary?: boolean;
  property?: { options?: Array<{ id?: string; name: string }> };
};

export type LarkRecord = { record_id: string; fields: Record<string, unknown> };
type LarkTable = { table_id: string; name: string };
type PagedData<T> = { items?: T[]; has_more?: boolean; page_token?: string };

export type WebsiteInquiryRecord = {
  inquiryId: string;
  submittedAt: number;
  fullName: string;
  company: string;
  country: string;
  email: string;
  whatsapp?: string;
  product: string;
  quantity: number;
  message: string;
  sourcePage: string;
  sourceUrl: string;
};

export type OutboundLeadRecord = {
  inquiryId: string;
  submittedAt: number;
  status: "Researching" | "Ready to Contact";
  fullName: string;
  company: string;
  country: string;
  jobTitle?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  companyDomain?: string;
  product: string;
  priority: "A - High Priority" | "B - Relevant" | "C - Low Priority";
  researchSummary: string;
  researchSources: string;
  duplicateStatus: "Unique" | "Possible Duplicate";
  relatedLeadId?: string;
  emailSubject?: string;
  emailDraft?: string;
};

export type OutboundLeadUpdate = Partial<
  Pick<
    OutboundLeadRecord,
    | "status"
    | "fullName"
    | "jobTitle"
    | "email"
    | "whatsapp"
    | "website"
    | "companyDomain"
    | "product"
    | "priority"
    | "researchSummary"
    | "researchSources"
    | "duplicateStatus"
    | "relatedLeadId"
    | "emailSubject"
    | "emailDraft"
  >
>;

export type SalesActivityRecord = {
  activityId: string;
  relatedLeadId: string;
  activityType: "Email" | "WhatsApp" | "Phone" | "Meeting" | "Note";
  direction: "Outbound" | "Inbound";
  subject?: string;
  activityStatus: string;
  contactedAt: number;
  resendEmailId?: string;
  notes?: string;
  nextAction?: string;
};

type FieldValue = string | number | undefined;
type FieldInput = { value: FieldValue; allowedTypes: number[]; required?: boolean };

let cachedToken: { value: string; expiresAt: number } | null = null;
const fieldCache = new Map<string, { value: Map<string, LarkField>; expiresAt: number }>();
let cachedActivitiesTable: { value: string; expiresAt: number } | null = null;

function requireLarkConfig() {
  const appId = process.env.LARK_APP_ID;
  const appSecret = process.env.LARK_APP_SECRET;
  const appToken = process.env.LARK_APP_TOKEN;
  const tableId = process.env.LARK_TABLE_ID;
  if (!appId || !appSecret || !appToken || !tableId) {
    throw new Error("Lark CRM environment variables are not fully configured.");
  }
  return { appId, appSecret, appToken, tableId };
}

async function getTenantAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const { appId, appSecret } = requireLarkConfig();
  const response = await fetch(`${LARK_API_BASE}/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Lark authentication failed with HTTP ${response.status}.`);

  const result = (await response.json()) as LarkTokenResponse;
  if (result.code !== 0 || !result.tenant_access_token) {
    throw new Error(`Lark authentication failed: ${result.msg || "unknown error"}.`);
  }
  cachedToken = {
    value: result.tenant_access_token,
    expiresAt: Date.now() + Math.max(60, result.expire ?? 7_200) * 1_000,
  };
  return cachedToken.value;
}

export async function larkApiRequest<T>(path: string, init: RequestInit = {}) {
  const tenantAccessToken = await getTenantAccessToken();
  const response = await fetch(`${LARK_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${tenantAccessToken}`,
      "Content-Type": "application/json; charset=utf-8",
      ...init.headers,
    },
    cache: "no-store",
    signal: init.signal ?? AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`Lark API request failed with HTTP ${response.status}.`);

  const result = (await response.json()) as LarkResponse<T>;
  if (result.code !== 0 || !result.data) {
    throw new Error(`Lark API request failed: ${result.msg || "unknown error"}.`);
  }
  return result.data;
}

export function getLarkAppToken() {
  return requireLarkConfig().appToken;
}

export function getWebsiteInquiriesTableId() {
  return requireLarkConfig().tableId;
}

export function clearLarkSchemaCache() {
  fieldCache.clear();
  cachedActivitiesTable = null;
}

export async function listLarkFields(tableId = getWebsiteInquiriesTableId(), fresh = false) {
  const cached = fieldCache.get(tableId);
  if (!fresh && cached && cached.expiresAt > Date.now()) return cached.value;

  const { appToken } = requireLarkConfig();
  const fields = new Map<string, LarkField>();
  let pageToken = "";
  do {
    const query = new URLSearchParams({ page_size: "100" });
    if (pageToken) query.set("page_token", pageToken);
    const data = await larkApiRequest<PagedData<LarkField>>(
      `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/fields?${query}`,
    );
    for (const field of data.items ?? []) fields.set(field.field_name, field);
    pageToken = data.has_more ? data.page_token || "" : "";
  } while (pageToken);

  fieldCache.set(tableId, { value: fields, expiresAt: Date.now() + 5 * 60_000 });
  return fields;
}

export async function listLarkTables() {
  const { appToken } = requireLarkConfig();
  const tables: LarkTable[] = [];
  let pageToken = "";
  do {
    const query = new URLSearchParams({ page_size: "100" });
    if (pageToken) query.set("page_token", pageToken);
    const data = await larkApiRequest<PagedData<LarkTable>>(
      `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables?${query}`,
    );
    tables.push(...(data.items ?? []));
    pageToken = data.has_more ? data.page_token || "" : "";
  } while (pageToken);
  return tables;
}

export async function getSalesActivitiesTableId() {
  if (cachedActivitiesTable && cachedActivitiesTable.expiresAt > Date.now()) {
    return cachedActivitiesTable.value;
  }
  const table = (await listLarkTables()).find((item) => item.name === SALES_ACTIVITIES_TABLE_NAME);
  if (!table) throw new Error(`Required Lark table is missing: ${SALES_ACTIVITIES_TABLE_NAME}.`);
  cachedActivitiesTable = { value: table.table_id, expiresAt: Date.now() + 5 * 60_000 };
  return table.table_id;
}

function requireField(fields: Map<string, LarkField>, name: string, allowedTypes: number[]) {
  const field = fields.get(name);
  if (!field) throw new Error(`Required Lark field is missing: ${name}.`);
  if (!allowedTypes.includes(field.type)) {
    throw new Error(`Lark field ${name} has an unsupported type (${field.type}).`);
  }
  return field;
}

function serializeField(field: LarkField, value: string | number) {
  if (field.type === 15) {
    const url = String(value);
    return { link: url, text: url };
  }
  return field.type === 2 || field.type === 5 ? Number(value) : String(value);
}

async function prepareFields(tableId: string, input: Record<string, FieldInput>) {
  const schema = await listLarkFields(tableId);
  const fields: Record<string, unknown> = {};
  for (const [name, definition] of Object.entries(input)) {
    if (definition.value === undefined || definition.value === "") {
      if (definition.required) throw new Error(`Required CRM value is missing: ${name}.`);
      continue;
    }
    fields[name] = serializeField(
      requireField(schema, name, definition.allowedTypes),
      definition.value,
    );
  }
  return fields;
}

export async function createLarkRecord(tableId: string, fields: Record<string, unknown>) {
  const { appToken } = requireLarkConfig();
  const data = await larkApiRequest<{ record?: { record_id?: string } }>(
    `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records`,
    { method: "POST", body: JSON.stringify({ fields }) },
  );
  const recordId = data.record?.record_id;
  if (!recordId) throw new Error("Lark did not return the new record ID.");
  return recordId;
}

export async function updateLarkRecord(
  tableId: string,
  recordId: string,
  fields: Record<string, unknown>,
) {
  const { appToken } = requireLarkConfig();
  await larkApiRequest<{ record?: { record_id?: string } }>(
    `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records/${encodeURIComponent(recordId)}`,
    { method: "PUT", body: JSON.stringify({ fields }) },
  );
}

export async function listLarkRecords(tableId = getWebsiteInquiriesTableId()) {
  const { appToken } = requireLarkConfig();
  const records: LarkRecord[] = [];
  let pageToken = "";
  do {
    const query = new URLSearchParams({ page_size: "500" });
    if (pageToken) query.set("page_token", pageToken);
    const data = await larkApiRequest<PagedData<LarkRecord>>(
      `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records?${query}`,
    );
    records.push(...(data.items ?? []));
    pageToken = data.has_more ? data.page_token || "" : "";
  } while (pageToken);
  return records;
}

export async function findLeadByInquiryId(inquiryId: string) {
  return (await listLarkRecords()).find(
    (record) => String(record.fields["Inquiry ID"] ?? "") === inquiryId,
  );
}

export async function createLarkInquiry(inquiry: WebsiteInquiryRecord) {
  const tableId = getWebsiteInquiriesTableId();
  const fields = await prepareFields(tableId, {
    "Inquiry ID": { value: inquiry.inquiryId, allowedTypes: [1], required: true },
    "Submitted At": { value: inquiry.submittedAt, allowedTypes: [5], required: true },
    Status: { value: "New Lead", allowedTypes: [1, 3], required: true },
    "Lead Source": { value: "Website Inquiry", allowedTypes: [1, 3], required: true },
    "Full Name": { value: inquiry.fullName, allowedTypes: [1], required: true },
    Company: { value: inquiry.company, allowedTypes: [1], required: true },
    Country: { value: inquiry.country, allowedTypes: [1], required: true },
    Email: { value: inquiry.email, allowedTypes: [1], required: true },
    WhatsApp: { value: inquiry.whatsapp, allowedTypes: [1, 13] },
    Product: { value: inquiry.product, allowedTypes: [1], required: true },
    Quantity: { value: inquiry.quantity, allowedTypes: [1, 2], required: true },
    Message: { value: inquiry.message, allowedTypes: [1], required: true },
    "Duplicate Status": { value: "Unique", allowedTypes: [1, 3], required: true },
    "Source Page": { value: inquiry.sourcePage, allowedTypes: [1], required: true },
    "Source URL": { value: inquiry.sourceUrl, allowedTypes: [1, 15], required: true },
  });
  return createLarkRecord(tableId, fields);
}

export async function createOutboundLead(lead: OutboundLeadRecord) {
  const tableId = getWebsiteInquiriesTableId();
  const fields = await prepareFields(tableId, {
    "Inquiry ID": { value: lead.inquiryId, allowedTypes: [1], required: true },
    "Submitted At": { value: lead.submittedAt, allowedTypes: [5], required: true },
    Status: { value: lead.status, allowedTypes: [1, 3], required: true },
    "Lead Source": { value: "Outbound Email", allowedTypes: [1, 3], required: true },
    "Full Name": { value: lead.fullName, allowedTypes: [1] },
    Company: { value: lead.company, allowedTypes: [1], required: true },
    Country: { value: lead.country, allowedTypes: [1], required: true },
    "Job Title": { value: lead.jobTitle, allowedTypes: [1] },
    Email: { value: lead.email, allowedTypes: [1] },
    WhatsApp: { value: lead.whatsapp, allowedTypes: [1, 13] },
    Website: { value: lead.website, allowedTypes: [1, 15] },
    "Company Domain": { value: lead.companyDomain, allowedTypes: [1] },
    Product: { value: lead.product, allowedTypes: [1], required: true },
    Priority: { value: lead.priority, allowedTypes: [1, 3], required: true },
    "Research Summary": { value: lead.researchSummary, allowedTypes: [1], required: true },
    "Research Sources": { value: lead.researchSources, allowedTypes: [1], required: true },
    "Duplicate Status": { value: lead.duplicateStatus, allowedTypes: [1, 3], required: true },
    "Related Lead ID": { value: lead.relatedLeadId, allowedTypes: [1] },
    "Email Subject": { value: lead.emailSubject, allowedTypes: [1] },
    "Email Draft": { value: lead.emailDraft, allowedTypes: [1] },
  });
  return createLarkRecord(tableId, fields);
}

export async function updateOutboundLeadRecord(recordId: string, update: OutboundLeadUpdate) {
  const tableId = getWebsiteInquiriesTableId();
  const fields = await prepareFields(tableId, {
    Status: { value: update.status, allowedTypes: [1, 3] },
    "Full Name": { value: update.fullName, allowedTypes: [1] },
    "Job Title": { value: update.jobTitle, allowedTypes: [1] },
    Email: { value: update.email, allowedTypes: [1] },
    WhatsApp: { value: update.whatsapp, allowedTypes: [1, 13] },
    Website: { value: update.website, allowedTypes: [1, 15] },
    "Company Domain": { value: update.companyDomain, allowedTypes: [1] },
    Product: { value: update.product, allowedTypes: [1] },
    Priority: { value: update.priority, allowedTypes: [1, 3] },
    "Research Summary": { value: update.researchSummary, allowedTypes: [1] },
    "Research Sources": { value: update.researchSources, allowedTypes: [1] },
    "Duplicate Status": { value: update.duplicateStatus, allowedTypes: [1, 3] },
    "Related Lead ID": { value: update.relatedLeadId, allowedTypes: [1] },
    "Email Subject": { value: update.emailSubject, allowedTypes: [1] },
    "Email Draft": { value: update.emailDraft, allowedTypes: [1] },
  });
  if (Object.keys(fields).length === 0) throw new Error("No CRM fields were provided for update.");
  await updateLarkRecord(tableId, recordId, fields);
}

export async function markOutboundEmailSent(
  recordId: string,
  resendEmailId: string,
  sentAt: number,
  nextFollowUp: number,
) {
  const tableId = getWebsiteInquiriesTableId();
  const fields = await prepareFields(tableId, {
    Status: { value: "Contacted", allowedTypes: [1, 3], required: true },
    "Email Status": { value: "Sent", allowedTypes: [1, 3], required: true },
    "Resend Email ID": { value: resendEmailId, allowedTypes: [1], required: true },
    "Email Sent At": { value: sentAt, allowedTypes: [5], required: true },
    "Last Contact": { value: sentAt, allowedTypes: [5], required: true },
    "Next Follow-up": { value: nextFollowUp, allowedTypes: [5], required: true },
  });
  await updateLarkRecord(tableId, recordId, fields);
}

export async function createSalesActivity(activity: SalesActivityRecord) {
  const tableId = await getSalesActivitiesTableId();
  const fields = await prepareFields(tableId, {
    "Activity ID": { value: activity.activityId, allowedTypes: [1], required: true },
    "Related Lead ID": { value: activity.relatedLeadId, allowedTypes: [1], required: true },
    "Activity Type": { value: activity.activityType, allowedTypes: [1, 3], required: true },
    Direction: { value: activity.direction, allowedTypes: [1, 3], required: true },
    Subject: { value: activity.subject, allowedTypes: [1] },
    "Activity Status": { value: activity.activityStatus, allowedTypes: [1, 3], required: true },
    "Contacted At": { value: activity.contactedAt, allowedTypes: [5], required: true },
    "Resend Email ID": { value: activity.resendEmailId, allowedTypes: [1] },
    Notes: { value: activity.notes, allowedTypes: [1] },
    "Next Action": { value: activity.nextAction, allowedTypes: [1] },
  });
  return createLarkRecord(tableId, fields);
}
