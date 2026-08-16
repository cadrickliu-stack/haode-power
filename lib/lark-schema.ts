import "server-only";

import {
  clearLarkSchemaCache,
  getLarkAppToken,
  getWebsiteInquiriesTableId,
  larkApiRequest,
  listLarkFields,
  listLarkTables,
  type LarkField,
} from "@/lib/lark";

type FieldDefinition = {
  field_name: string;
  type: number;
  property?: { options: Array<{ name: string }> };
};

const select = (field_name: string, options: string[]): FieldDefinition => ({
  field_name,
  type: 3,
  property: { options: options.map((name) => ({ name })) },
});

const WEBSITE_FIELDS: FieldDefinition[] = [
  select("Lead Source", [
    "Website Inquiry",
    "Outbound Email",
    "WhatsApp",
    "Facebook",
    "LinkedIn",
    "Referral",
    "Manual Entry",
  ]),
  { field_name: "Job Title", type: 1 },
  { field_name: "Website", type: 15 },
  { field_name: "Company Domain", type: 1 },
  { field_name: "Research Summary", type: 1 },
  { field_name: "Research Sources", type: 1 },
  select("Duplicate Status", ["Unique", "Possible Duplicate", "Confirmed Duplicate"]),
  { field_name: "Related Lead ID", type: 1 },
  { field_name: "Do Not Contact Reason", type: 1 },
  { field_name: "Email Subject", type: 1 },
  { field_name: "Email Draft", type: 1 },
  { field_name: "Resend Email ID", type: 1 },
  { field_name: "Email Sent At", type: 5 },
];

const STATUS_OPTIONS = [
  "New",
  "New Lead",
  "Researching",
  "Ready to Contact",
  "Contacted",
  "Replied",
  "Qualified",
  "Quotation",
  "Negotiation",
  "Follow-up",
  "Won",
  "Lost",
  "Do Not Contact",
];

const PRIORITY_OPTIONS = ["A - High Priority", "B - Relevant", "C - Low Priority"];
const EMAIL_STATUS_OPTIONS = [
  "Draft",
  "Ready",
  "Sent",
  "Delivered",
  "Bounced",
  "Complained",
  "Failed",
];

const ACTIVITY_FIELDS: FieldDefinition[] = [
  { field_name: "Activity ID", type: 1 },
  { field_name: "Related Lead ID", type: 1 },
  select("Activity Type", ["Email", "WhatsApp", "Phone", "Meeting", "Note"]),
  select("Direction", ["Outbound", "Inbound"]),
  { field_name: "Subject", type: 1 },
  select("Activity Status", ["Draft", "Sent", "Delivered", "Bounced", "Complained", "Failed"]),
  { field_name: "Contacted At", type: 5 },
  { field_name: "Resend Email ID", type: 1 },
  { field_name: "Notes", type: 1 },
  { field_name: "Next Action", type: 1 },
];

function mergeOptions(field: LarkField, requested: string[]) {
  const names = new Set((field.property?.options ?? []).map((option) => option.name));
  for (const option of requested) names.add(option);
  return [...names].map((name) => ({ name }));
}

async function createField(tableId: string, definition: FieldDefinition) {
  const appToken = getLarkAppToken();
  await larkApiRequest<{ field?: LarkField }>(
    `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/fields`,
    { method: "POST", body: JSON.stringify(definition) },
  );
}

async function updateSelectField(tableId: string, field: LarkField, options: string[]) {
  const appToken = getLarkAppToken();
  await larkApiRequest<{ field?: LarkField }>(
    `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/fields/${encodeURIComponent(field.field_id)}`,
    {
      method: "PUT",
      body: JSON.stringify({
        field_name: field.field_name,
        type: 3,
        property: { options: mergeOptions(field, options) },
      }),
    },
  );
}

export async function ensureHaodeCrmSchema() {
  const appToken = getLarkAppToken();
  const inquiriesTableId = getWebsiteInquiriesTableId();
  const existing = await listLarkFields(inquiriesTableId, true);
  const addedFields: string[] = [];

  for (const definition of WEBSITE_FIELDS) {
    if (!existing.has(definition.field_name)) {
      await createField(inquiriesTableId, definition);
      addedFields.push(definition.field_name);
    }
  }

  const status = existing.get("Status");
  const priority = existing.get("Priority");
  const emailStatus = existing.get("Email Status");
  if (!status || status.type !== 3 || !priority || priority.type !== 3 || !emailStatus || emailStatus.type !== 3) {
    throw new Error("Status, Priority, and Email Status must already be single-select fields.");
  }
  await updateSelectField(inquiriesTableId, status, STATUS_OPTIONS);
  await updateSelectField(inquiriesTableId, priority, PRIORITY_OPTIONS);
  await updateSelectField(inquiriesTableId, emailStatus, EMAIL_STATUS_OPTIONS);

  let activities = (await listLarkTables()).find((table) => table.name === "Sales Activities");
  let createdActivitiesTable = false;
  if (!activities) {
    const data = await larkApiRequest<{ table?: { table_id?: string; name?: string } }>(
      `/bitable/v1/apps/${encodeURIComponent(appToken)}/tables`,
      {
        method: "POST",
        body: JSON.stringify({
          table: {
            name: "Sales Activities",
            default_view_name: "All Activities",
            fields: ACTIVITY_FIELDS,
          },
        }),
      },
    );
    const tableId = data.table?.table_id;
    if (!tableId) throw new Error("Lark did not return the Sales Activities table ID.");
    activities = { table_id: tableId, name: "Sales Activities" };
    createdActivitiesTable = true;
  }

  clearLarkSchemaCache();
  const activitySchema = await listLarkFields(activities.table_id, true);
  const missingActivityFields = ACTIVITY_FIELDS.filter(
    (definition) => !activitySchema.has(definition.field_name),
  );
  for (const definition of missingActivityFields) {
    await createField(activities.table_id, definition);
  }
  clearLarkSchemaCache();

  return {
    addedFields,
    updatedSelectFields: ["Status", "Priority", "Email Status"],
    salesActivitiesTableId: activities.table_id,
    createdActivitiesTable,
    addedActivityFields: missingActivityFields.map((field) => field.field_name),
  };
}
