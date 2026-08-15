const LARK_API_BASE = "https://open.larksuite.com/open-apis";

type LarkResponse<T> = {
  code: number;
  msg: string;
  data?: T;
};

type LarkTokenResponse = LarkResponse<never> & {
  tenant_access_token?: string;
  expire?: number;
};

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

let cachedToken: { value: string; expiresAt: number } | null = null;
let cachedFields: { value: Map<string, LarkField>; expiresAt: number } | null = null;

type LarkField = {
  field_id: string;
  field_name: string;
  type: number;
};

type LarkFieldList = {
  items?: LarkField[];
  has_more?: boolean;
  page_token?: string;
};

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
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const { appId, appSecret } = requireLarkConfig();
  const response = await fetch(`${LARK_API_BASE}/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Lark authentication failed with HTTP ${response.status}.`);
  }

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

async function getLarkFields(tenantAccessToken: string) {
  if (cachedFields && cachedFields.expiresAt > Date.now()) {
    return cachedFields.value;
  }

  const { appToken, tableId } = requireLarkConfig();
  const fields = new Map<string, LarkField>();
  let pageToken = "";

  do {
    const url = new URL(
      `${LARK_API_BASE}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/fields`,
    );
    url.searchParams.set("page_size", "100");
    if (pageToken) url.searchParams.set("page_token", pageToken);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${tenantAccessToken}` },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Unable to read Lark field schema (HTTP ${response.status}).`);
    }

    const result = (await response.json()) as LarkResponse<LarkFieldList>;
    if (result.code !== 0 || !result.data?.items) {
      throw new Error(`Unable to read Lark field schema: ${result.msg || "unknown error"}.`);
    }

    for (const field of result.data.items) fields.set(field.field_name, field);
    pageToken = result.data.has_more ? result.data.page_token || "" : "";
  } while (pageToken);

  cachedFields = { value: fields, expiresAt: Date.now() + 5 * 60_000 };
  return fields;
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

export async function createLarkInquiry(inquiry: WebsiteInquiryRecord) {
  const { appToken, tableId } = requireLarkConfig();
  const tenantAccessToken = await getTenantAccessToken();
  const schema = await getLarkFields(tenantAccessToken);
  const url = `${LARK_API_BASE}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records`;

  const fieldDefinitions = {
    "Inquiry ID": requireField(schema, "Inquiry ID", [1]),
    "Submitted At": requireField(schema, "Submitted At", [5]),
    Status: requireField(schema, "Status", [1, 3]),
    "Full Name": requireField(schema, "Full Name", [1]),
    Company: requireField(schema, "Company", [1]),
    Country: requireField(schema, "Country", [1]),
    Email: requireField(schema, "Email", [1]),
    WhatsApp: requireField(schema, "WhatsApp", [1, 13]),
    Product: requireField(schema, "Product", [1]),
    Quantity: requireField(schema, "Quantity", [1, 2]),
    Message: requireField(schema, "Message", [1]),
    "Source Page": requireField(schema, "Source Page", [1]),
    "Source URL": requireField(schema, "Source URL", [1, 15]),
  } as const;

  const rawFields: Record<keyof typeof fieldDefinitions, string | number> = {
    "Inquiry ID": inquiry.inquiryId,
    "Submitted At": inquiry.submittedAt,
    Status: "New",
    "Full Name": inquiry.fullName,
    Company: inquiry.company,
    Country: inquiry.country,
    Email: inquiry.email,
    WhatsApp: inquiry.whatsapp || "",
    Product: inquiry.product,
    Quantity: inquiry.quantity,
    Message: inquiry.message,
    "Source Page": inquiry.sourcePage,
    "Source URL": inquiry.sourceUrl,
  };

  const fields: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(rawFields)) {
    if (name === "WhatsApp" && !value) continue;
    fields[name] = serializeField(fieldDefinitions[name as keyof typeof fieldDefinitions], value);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tenantAccessToken}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ fields }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Unable to create Lark inquiry (HTTP ${response.status}).`);
  }

  const result = (await response.json()) as LarkResponse<{
    record?: { record_id?: string };
  }>;

  if (result.code !== 0 || !result.data?.record?.record_id) {
    throw new Error(`Unable to create Lark inquiry: ${result.msg || "unknown error"}.`);
  }

  return result.data.record.record_id;
}
