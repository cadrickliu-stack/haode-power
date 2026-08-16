import { POST as createOutboundLead } from "@/app/api/crm/outbound-leads/route";
import { POST as sendOutboundEmail } from "@/app/api/crm/send-email/route";
import { fieldText } from "@/lib/crm";
import {
  findLeadByInquiryId,
  getSalesActivitiesTableId,
  getWebsiteInquiriesTableId,
  listLarkRecords,
  updateLarkRecord,
} from "@/lib/lark";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEST_RECIPIENT = "sales@haodepower.com";
const ONE_TIME_TRIGGER = "7a3f4be2d09c46c48f6627ee17a8b4b1";

function adminRequest(path: string, body: Record<string, unknown>) {
  const key = process.env.CRM_ADMIN_API_KEY;
  if (!key) throw new Error("CRM_ADMIN_API_KEY is not configured in Preview.");
  return new Request(`https://preview-test.local${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function responseJson(response: Response) {
  return (await response.json()) as Record<string, unknown>;
}

function dateValue(record: Awaited<ReturnType<typeof findLeadByInquiryId>>, field: string) {
  if (!record) return 0;
  const value = record.fields[field];
  return typeof value === "number" ? value : Number(value || 0);
}

async function createTestLead(label: string) {
  const suffix = `${Date.now()}-${label}`;
  const domainSuffix = `${Date.now()}-${label.toLowerCase().replaceAll(" ", "-")}`;
  const body = {
    company: `Haode Power ${label} Test ${suffix}`,
    country: "China",
    fullName: "CRM Test Recipient",
    jobTitle: "Test Contact",
    email: TEST_RECIPIENT,
    website: "https://www.haodepower.com",
    companyDomain: `crm-${domainSuffix}.example.test`,
    product: "BMN4000",
    priority: "C - Low Priority",
    status: "Ready to Contact",
    researchSummary: "Preview-only CRM workflow test. This is not a real sales lead.",
    researchSources: "https://www.haodepower.com",
    emailSubject: `[TEST] Haode Power CRM outbound workflow ${suffix}`,
    emailDraft:
      "This is a controlled Preview test of the Haode Power outbound email workflow. It was sent only to the Haode Power sales mailbox and is not a sales message to a real prospect. No reply or follow-up is required.",
  };
  const response = await createOutboundLead(
    adminRequest("/api/crm/outbound-leads", body),
  );
  const result = await responseJson(response);
  if (response.status !== 201 || result.success !== true || typeof result.inquiryId !== "string") {
    throw new Error(
      `Unable to create ${label} test lead (HTTP ${response.status}): ${String(result.error ?? "unknown error")}`,
    );
  }
  return result.inquiryId;
}

export async function POST(request: Request) {
  if (process.env.VERCEL_ENV !== "preview") {
    return Response.json({ success: false, error: "Not found." }, { status: 404 });
  }

  if (request.headers.get("x-preview-test-trigger") !== ONE_TIME_TRIGGER) {
    return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }
  if (!process.env.CRM_ADMIN_API_KEY) {
    return Response.json(
      { success: false, error: "CRM_ADMIN_API_KEY is not configured in Preview." },
      { status: 503 },
    );
  }
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { success: false, error: "RESEND_API_KEY is not configured in Preview." },
      { status: 503 },
    );
  }

  try {
    const sentLeadId = await createTestLead("Outbound Email");
    const nextFollowUp = Date.now() + 7 * 24 * 60 * 60 * 1_000;
    const sendResponse = await sendOutboundEmail(
      adminRequest("/api/crm/send-email", {
        inquiryId: sentLeadId,
        confirmed: true,
        nextFollowUp: new Date(nextFollowUp).toISOString(),
      }),
    );
    const sendResult = await responseJson(sendResponse);
    if (!sendResponse.ok || sendResult.success !== true) {
      throw new Error(`Outbound email test failed (HTTP ${sendResponse.status}).`);
    }

    const updatedLead = await findLeadByInquiryId(sentLeadId);
    if (!updatedLead) throw new Error("Sent test lead is missing from Lark.");
    const resendEmailId = fieldText(updatedLead, "Resend Email ID");
    const activities = await listLarkRecords(await getSalesActivitiesTableId());
    const activity = activities.find(
      (record) =>
        fieldText(record, "Related Lead ID") === sentLeadId &&
        fieldText(record, "Resend Email ID") === resendEmailId,
    );

    const blockedLeadId = await createTestLead("Do Not Contact");
    const blockedLead = await findLeadByInquiryId(blockedLeadId);
    if (!blockedLead) throw new Error("Do Not Contact test lead is missing from Lark.");
    await updateLarkRecord(getWebsiteInquiriesTableId(), blockedLead.record_id, {
      "Do Not Contact Reason": "Preview-only suppression test",
    });
    const blockedResponse = await sendOutboundEmail(
      adminRequest("/api/crm/send-email", {
        inquiryId: blockedLeadId,
        confirmed: true,
        nextFollowUp: new Date(nextFollowUp).toISOString(),
      }),
    );
    const blockedResult = await responseJson(blockedResponse);
    await updateLarkRecord(getWebsiteInquiriesTableId(), blockedLead.record_id, {
      Status: "Do Not Contact",
    });

    const checks = {
      protectedEndpoint: true,
      emailSent: sendResult.resendEmailId === resendEmailId && Boolean(resendEmailId),
      status: fieldText(updatedLead, "Status") === "Contacted",
      emailStatus: fieldText(updatedLead, "Email Status") === "Sent",
      resendEmailId: Boolean(resendEmailId),
      emailSentAt: dateValue(updatedLead, "Email Sent At") > 0,
      lastContact: dateValue(updatedLead, "Last Contact") > 0,
      nextFollowUp: dateValue(updatedLead, "Next Follow-up") > Date.now(),
      activity:
        Boolean(activity) &&
        fieldText(activity!, "Activity Type") === "Email" &&
        fieldText(activity!, "Direction") === "Outbound" &&
        fieldText(activity!, "Activity Status") === "Sent",
      doNotContact:
        blockedResponse.status === 400 &&
        String(blockedResult.error ?? "").includes("Do Not Contact"),
    };

    return Response.json({
      success: Object.values(checks).every(Boolean),
      sentLeadId,
      blockedLeadId,
      recipient: TEST_RECIPIENT,
      checks,
    });
  } catch (error) {
    console.error("Preview CRM outbound test failed", error);
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Test failed." },
      { status: 500 },
    );
  }
}
