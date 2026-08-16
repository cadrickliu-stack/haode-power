import { ensureHaodeCrmSchema } from "@/lib/lark-schema";
import { buildAndCreateOutboundLead } from "@/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (process.env.VERCEL_ENV !== "preview") {
    return Response.json({ success: false, error: "Not available." }, { status: 404 });
  }
  const body = (await request.json().catch(() => null)) as { confirm?: unknown } | null;
  if (body?.confirm !== "CREATE_HAODE_CRM_SCHEMA") {
    return Response.json({ success: false, error: "Confirmation is required." }, { status: 400 });
  }
  try {
    const testOutboundLead = body && "createTestOutbound" in body && body.createTestOutbound === true
      ? await buildAndCreateOutboundLead({
          company: "Haode Power CRM Test",
          country: "China",
          fullName: "CRM Test Contact",
          jobTitle: "Test Record",
          email: "sales@haodepower.com",
          website: "https://www.haodepower.com",
          product: "BMN4000",
          priority: "C - Low Priority",
          researchSummary: "Preview-only outbound CRM integration test; not a sales prospect.",
          researchSources: "https://www.haodepower.com",
          emailSubject: "Preview CRM draft test — do not send",
          emailDraft: "This is a preview-only CRM draft test. It must not be sent.",
          status: "Researching",
        })
      : null;
    return Response.json({
      success: true,
      result: await ensureHaodeCrmSchema(),
      testOutboundLead,
      configuration: {
        crmAdminApiKey: Boolean(process.env.CRM_ADMIN_API_KEY),
        resendApiKey: Boolean(process.env.RESEND_API_KEY),
      },
    });
  } catch (error) {
    console.error("Unable to bootstrap Lark CRM schema", error);
    return Response.json({ success: false, error: "Lark CRM schema setup failed." }, { status: 502 });
  }
}
