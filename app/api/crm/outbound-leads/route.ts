import { authorizeCrmAdmin } from "@/lib/crm-admin";
import {
  buildAndCreateOutboundLead,
  CrmValidationError,
  updateOutboundLead,
} from "@/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 30_000;

async function readBody(request: Request) {
  const body = await request.text();
  if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) {
    throw new CrmValidationError("Request is too large.");
  }
  const parsed = JSON.parse(body) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new CrmValidationError("Request body must be an object.");
  }
  return parsed as Record<string, unknown>;
}

function errorResponse(error: unknown) {
  if (error instanceof CrmValidationError) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
  if (error instanceof SyntaxError) {
    return Response.json({ success: false, error: "Invalid request." }, { status: 400 });
  }
  console.error("Unable to update outbound CRM lead", error);
  return Response.json({ success: false, error: "CRM operation failed." }, { status: 502 });
}

export async function POST(request: Request) {
  const auth = authorizeCrmAdmin(request);
  if (!auth.ok) return auth.response;
  try {
    const result = await buildAndCreateOutboundLead(await readBody(request));
    return Response.json({ success: true, ...result }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request) {
  const auth = authorizeCrmAdmin(request);
  if (!auth.ok) return auth.response;
  try {
    const body = await readBody(request);
    const inquiryId = typeof body.inquiryId === "string" ? body.inquiryId.trim() : "";
    if (!inquiryId) throw new CrmValidationError("Inquiry ID is required.");
    const result = await updateOutboundLead(inquiryId, body);
    return Response.json({ success: true, ...result });
  } catch (error) {
    return errorResponse(error);
  }
}
