export type CrmEmailApiPayload = {
  success: boolean;
  inquiryId?: string;
  resendEmailId?: string;
  error?: string;
  requestId?: string;
};

export type ParsedCrmEmailResponse = {
  payload: CrmEmailApiPayload;
  status: number;
  contentType: string;
  requestId: string;
};

const JSON_RESPONSE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
} as const;

export class CrmEmailResponseContractError extends Error {
  readonly status: number;
  readonly contentType: string;
  readonly requestId: string;
  readonly bodyPreview: string;
  readonly requiresReconciliation = true;

  constructor(
    message: string,
    details: { status: number; contentType: string; requestId: string; bodyPreview: string },
  ) {
    super(message);
    this.name = "CrmEmailResponseContractError";
    this.status = details.status;
    this.contentType = details.contentType;
    this.requestId = details.requestId;
    this.bodyPreview = details.bodyPreview;
  }
}

export function crmEmailJsonResponse(payload: CrmEmailApiPayload, status: number, requestId: string) {
  return Response.json(
    { ...payload, requestId },
    {
      status,
      headers: {
        ...JSON_RESPONSE_HEADERS,
        "X-Haode-Request-Id": requestId,
      },
    },
  );
}

function contractError(response: Response, rawBody: string, message: string) {
  const contentType = response.headers.get("content-type") ?? "";
  const requestId = response.headers.get("x-haode-request-id") ?? response.headers.get("x-vercel-id") ?? "";
  return new CrmEmailResponseContractError(message, {
    status: response.status,
    contentType,
    requestId,
    bodyPreview: rawBody.slice(0, 1_000),
  });
}

export async function parseCrmEmailResponse(response: Response): Promise<ParsedCrmEmailResponse> {
  const contentType = response.headers.get("content-type") ?? "";
  const rawBody = await response.text();
  if (!contentType.toLowerCase().includes("application/json")) {
    throw contractError(
      response,
      rawBody,
      `CRM email endpoint returned non-JSON content (HTTP ${response.status}, ${contentType || "missing Content-Type"}). Reconcile CRM state before any retry.`,
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    throw contractError(
      response,
      rawBody,
      `CRM email endpoint returned malformed JSON (HTTP ${response.status}). Reconcile CRM state before any retry.`,
    );
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw contractError(response, rawBody, "CRM email endpoint returned an invalid JSON envelope.");
  }
  const payload = parsed as CrmEmailApiPayload;
  if (typeof payload.success !== "boolean") {
    throw contractError(response, rawBody, "CRM email endpoint response is missing a boolean success field.");
  }
  if (payload.success) {
    if (!response.ok || !payload.inquiryId || !payload.resendEmailId) {
      throw contractError(response, rawBody, "CRM email endpoint returned an incomplete or inconsistent success response.");
    }
  } else if (response.ok || !payload.error) {
    throw contractError(response, rawBody, "CRM email endpoint returned an incomplete or inconsistent error response.");
  }

  return {
    payload,
    status: response.status,
    contentType,
    requestId:
      payload.requestId ??
      response.headers.get("x-haode-request-id") ??
      response.headers.get("x-vercel-id") ??
      "",
  };
}
