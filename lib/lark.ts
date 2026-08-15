const LARK_API_BASE = "https://open.larksuite.com/open-apis";

type LarkResponse<T> = {
  code: number;
  msg: string;
  data?: T;
};

export type LarkField = {
  field_id: string;
  field_name: string;
  type: number;
  is_primary?: boolean;
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
  const { appId, appSecret } = requireLarkConfig();
  const response = await fetch(`${LARK_API_BASE}/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Lark authentication failed with HTTP ${response.status}.`);
  }

  const result = (await response.json()) as LarkResponse<never> & {
    tenant_access_token?: string;
  };

  if (result.code !== 0 || !result.tenant_access_token) {
    throw new Error(`Lark authentication failed: ${result.msg || "unknown error"}.`);
  }

  return result.tenant_access_token;
}

export async function listLarkFields() {
  const { appToken, tableId } = requireLarkConfig();
  const tenantAccessToken = await getTenantAccessToken();
  const url = new URL(
    `${LARK_API_BASE}/bitable/v1/apps/${encodeURIComponent(appToken)}/tables/${encodeURIComponent(tableId)}/fields`,
  );
  url.searchParams.set("page_size", "100");

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${tenantAccessToken}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to read Lark fields (HTTP ${response.status}).`);
  }

  const result = (await response.json()) as LarkResponse<{ items?: LarkField[] }>;
  if (result.code !== 0) {
    throw new Error(`Unable to read Lark fields: ${result.msg || "unknown error"}.`);
  }

  return result.data?.items ?? [];
}
