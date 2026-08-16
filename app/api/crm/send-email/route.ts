import { randomUUID } from "node:crypto";
import { authorizeCrmAdmin } from "@/lib/crm-admin";
import { CrmValidationError, fieldText, normalizeEmail } from "@/lib/crm";
import {
  createSalesActivity,
  findLeadByInquiryId,
  listLarkRecords,
  markOutboundEmailSent,
} from "@/lib/lark";
import { sendOutboundEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isDoNotContact(record: Awaited<ReturnType<typeof findLeadByInquiryId>>) {
  return Boolean(
    record &&
      (fieldText(record, "Status") === "Do Not Contact" ||
        fieldText(record, "Do Not Contact Reason")),
  );
}

export async function POST(request: Request) {
  const auth = authorizeCrmAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const inquiryId = typeof body.inquiryId === "string" ? body.inquiryId.trim() : "";
    if (!/^OB-\d{8}-[A-Z0-9]{6}$/.test(inquiryId)) {
      throw new CrmValidationError("A valid outbound lead ID is required.");
    }
    if (body.confirmed !== true) {
      throw new CrmValidationError("Explicit email confirmation is required.");
    }

    const nextFollowUp = new Date(String(body.nextFollowUp ?? "")).getTime();
    if (!Number.isFinite(nextFollowUp) || nextFollowUp <= Date.now()) {
      throw new CrmValidationError("Next Follow-up must be a valid future date.");
    }

    const lead = await findLeadByInquiryId(inquiryId);
    if (!lead) throw new CrmValidationError("Outbound lead was not found.");
    if (fieldText(lead, "Lead Source") !== "Outbound Email") {
      throw new CrmValidationError("Only Outbound Email leads can use this endpoint.");
    }
    if (fieldText(lead, "Status") !== "Ready to Contact") {
      throw new CrmValidationError("Lead must be Ready to Contact before sending.");
    }
    if (isDoNotContact(lead)) {
      throw new CrmValidationError("This lead is marked Do Not Contact.");
    }
    if (fieldText(lead, "Email Status") === "Sent" || fieldText(lead, "Resend Email ID")) {
      throw new CrmValidationError("The initial outbound email has already been sent.");
    }

    const email = normalizeEmail(fieldText(lead, "Email"));
    const subject = fieldText(lead, "Email Subject");
    const draft = fieldText(lead, "Email Draft");
    if (!EMAIL_PATTERN.test(email) || !subject || !draft) {
      throw new CrmValidationError("A reliable Email, Email Subject, and Email Draft are required.");
    }

    const matchingSuppression = (await listLarkRecords()).find(
      (record) =>
        record.record_id !== lead.record_id &&
        normalizeEmail(fieldText(record, "Email")) === email &&
        isDoNotContact(record),
    );
    if (matchingSuppression) {
      throw new CrmValidationError("A matching CRM contact is marked Do Not Contact.");
    }

    const resendEmailId = await sendOutboundEmail({
      to: email,
      subject,
      body: draft,
      inquiryId,
    });
    const sentAt = Date.now();
    await markOutboundEmailSent(lead.record_id, resendEmailId, sentAt, nextFollowUp);
    await createSalesActivity({
      activityId: `ACT-${new Date(sentAt).toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 6).toUpperCase()}`,
      relatedLeadId: inquiryId,
      activityType: "Email",
      direction: "Outbound",
      subject,
      activityStatus: "Sent",
      contactedAt: sentAt,
      resendEmailId,
      notes: "Initial personalized outbound email sent after explicit approval.",
      nextAction: `Follow up on ${new Date(nextFollowUp).toISOString().slice(0, 10)}`,
    });

    return Response.json({ success: true, inquiryId, resendEmailId });
  } catch (error) {
    if (error instanceof CrmValidationError) {
      return Response.json({ success: false, error: error.message }, { status: 400 });
    }
    if (error instanceof SyntaxError) {
      return Response.json({ success: false, error: "Invalid request." }, { status: 400 });
    }
    console.error("Unable to send approved outbound email", error);
    return Response.json(
      { success: false, error: "The email or CRM update failed. Please review the server logs." },
      { status: 502 },
    );
  }
}
