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
  message: string;
  sourcePage: string;
  sourceUrl: string;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

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

export async function createLarkInquiry(inquiry: WebsiteInquiryRecord) {
  const { appToken, tableId } = requireLarkConfig();
  const tenantAccessToken = await getTenantAccessToken();
  const url = `${LARK_API_BASE}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/records`;

  const fields: Record<string, string | number> = {
    "Inquiry ID": inquiry.inquiryId,
    "Submitted At": inquiry.submittedAt,
    Status: "New",
    "Full Name": inquiry.fullName,
    Company: inquiry.company,
    Country: inquiry.country,
    Email: inquiry.email,
    Product: inquiry.product,
    Message: inquiry.message,
    "Source Page": inquiry.sourcePage,
    "Source URL": inquiry.sourceUrl,
  };

  if (inquiry.whatsapp) {
    fields.WhatsApp = inquiry.whatsapp;
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
