import { ensureHaodeCrmSchema } from "@/lib/lark-schema";

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
    return Response.json({
      success: true,
      result: await ensureHaodeCrmSchema(),
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
