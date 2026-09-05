import { createHash, randomUUID } from "node:crypto";
import { authorizeCrmAdmin } from "@/lib/crm-admin";
import { crmEmailJsonResponse, type CrmEmailApiPayload } from "@/lib/crm-email-response";
import {
  CrmValidationError,
  fieldText,
  normalizeCompany,
  normalizeDomain,
  normalizeEmail,
} from "@/lib/crm";
import {
  createSalesActivity,
  findLeadByInquiryId,
  listLarkRecords,
  markOutboundEmailFailed,
  markOutboundEmailPending,
  markOutboundEmailSent,
} from "@/lib/lark";
import { sendOutboundEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OUTBOUND_LEAD_ID_PATTERN = /^(?:OB-\d{8}-[A-Z0-9]{6}|KE-\d{8}-\d{3})$/;
const KENYA_LEAD_ID_PATTERN = /^KE-\d{8}-\d{3}$/;
const INITIAL_EMAIL_CAMPAIGN = "Initial Outbound Email";
const BLOCKING_EMAIL_STATUSES = new Set([
  "Pending",
  "Sent",
  "Failed",
  "Delivered",
  "Bounced",
  "Complained",
]);

function fieldIsTruthy(record: NonNullable<Awaited<ReturnType<typeof findLeadByInquiryId>>>, name: string) {
  const value = record.fields[name];
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (Array.isArray(value)) return value.length > 0;
  return ["true", "yes", "1", "unsubscribed", "invalid"].includes(fieldText(record, name).toLowerCase());
}

function isDoNotContact(record: Awaited<ReturnType<typeof findLeadByInquiryId>>) {
  return Boolean(
    record &&
      (fieldText(record, "Status") === "Do Not Contact" ||
        fieldText(record, "Do Not Contact Reason") ||
        fieldIsTruthy(record, "Do Not Contact") ||
        fieldIsTruthy(record, "Unsubscribed") ||
        ["Bounced", "Complained"].includes(fieldText(record, "Email Status"))),
  );
}

function companyIdentity(record: NonNullable<Awaited<ReturnType<typeof findLeadByInquiryId>>>) {
  const company = normalizeCompany(fieldText(record, "Company"));
  const rawDomain = fieldText(record, "Company Domain") || fieldText(record, "Website");
  let domain = "";
  if (rawDomain) {
    try {
      domain = normalizeDomain(rawDomain);
    } catch {
      domain = "";
    }
  }
  return { company, domain, country: fieldText(record, "Country").toLowerCase() };
}

function sameCompany(
  left: NonNullable<Awaited<ReturnType<typeof findLeadByInquiryId>>>,
  right: NonNullable<Awaited<ReturnType<typeof findLeadByInquiryId>>>,
) {
  const a = companyIdentity(left);
  const b = companyIdentity(right);
  if (!a.country || a.country !== b.country) return false;
  return Boolean((a.domain && a.domain === b.domain) || (a.company && a.company === b.company));
}

function hasInitialEmailAttempt(record: NonNullable<Awaited<ReturnType<typeof findLeadByInquiryId>>>) {
  return Boolean(
    BLOCKING_EMAIL_STATUSES.has(fieldText(record, "Email Status")) ||
      fieldText(record, "Resend Email ID") ||
      fieldText(record, "Email Campaign") === INITIAL_EMAIL_CAMPAIGN,
  );
}

function recordEmails(record: NonNullable<Awaited<ReturnType<typeof findLeadByInquiryId>>>) {
  return ["Procurement Email", "Contact 1 Email", "Email"]
    .map((field) => normalizeEmail(fieldText(record, field)))
    .filter(Boolean);
}

function resendIdempotencyKey(record: NonNullable<Awaited<ReturnType<typeof findLeadByInquiryId>>>) {
  const identity = companyIdentity(record);
  const stableIdentity = identity.domain || `${identity.country}:${identity.company}`;
  const digest = createHash("sha256").update(stableIdentity).digest("hex").slice(0, 32);
  return `haode-initial-outbound-${digest}`;
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const requestId = request.headers.get("x-vercel-id") || randomUUID();
  const respond = (payload: CrmEmailApiPayload, status: number) => {
    console.log(
      JSON.stringify({
        level: "info",
        event: "crm-send-email-response",
        requestId,
        inquiryId: payload.inquiryId,
        status,
        success: payload.success,
        durationMs: Date.now() - startedAt,
      }),
    );
    return crmEmailJsonResponse(payload, status, requestId);
  };
  const auth = authorizeCrmAdmin(request);
  if (!auth.ok) {
    const authPayload = (await auth.response.json()) as { error?: string };
    return respond(
      { success: false, error: authPayload.error || "CRM admin authorization failed." },
      auth.response.status,
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const inquiryId = typeof body.inquiryId === "string" ? body.inquiryId.trim() : "";
    if (!OUTBOUND_LEAD_ID_PATTERN.test(inquiryId)) {
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
    if (KENYA_LEAD_ID_PATTERN.test(inquiryId)) {
      if (fieldText(lead, "Country") !== "Kenya" || fieldText(lead, "Priority") !== "A - High Priority") {
        throw new CrmValidationError("Kenya outreach is limited to verified A-priority Kenya leads.");
      }
      if (
        !fieldText(lead, "Contact Source URL") ||
        !fieldText(lead, "Last Verified Date") ||
        fieldText(lead, "Duplicate Status") !== "Unique"
      ) {
        throw new CrmValidationError(
          "Kenya leads require a current contact source, verification date, and Unique duplicate status.",
        );
      }
    }
    if (fieldText(lead, "Status") !== "Ready to Contact") {
      throw new CrmValidationError("Lead must be Ready to Contact before sending.");
    }
    if (isDoNotContact(lead)) {
      throw new CrmValidationError("This lead is marked Do Not Contact.");
    }
    if (hasInitialEmailAttempt(lead)) {
      throw new CrmValidationError("The initial outbound email has already been attempted.");
    }

    const email = normalizeEmail(
      fieldText(lead, "Procurement Email") ||
        fieldText(lead, "Contact 1 Email") ||
        fieldText(lead, "Email"),
    );
    const subject = fieldText(lead, "Email Subject");
    const draft = fieldText(lead, "Email Draft");
    if (!EMAIL_PATTERN.test(email) || !subject || !draft) {
      throw new CrmValidationError("A reliable Email, Email Subject, and Email Draft are required.");
    }

    const records = await listLarkRecords();
    const matchingSuppression = records.find(
      (record) =>
        record.record_id !== lead.record_id &&
        recordEmails(record).includes(email) &&
        isDoNotContact(record),
    );
    if (matchingSuppression) {
      throw new CrmValidationError("A matching CRM contact is marked Do Not Contact.");
    }

    const companyRecords = records
      .filter(
        (record) =>
          fieldText(record, "Lead Source") === "Outbound Email" &&
          (record.record_id === lead.record_id || sameCompany(record, lead)),
      )
      .sort((a, b) => a.record_id.localeCompare(b.record_id));
    if (companyRecords[0]?.record_id !== lead.record_id) {
      throw new CrmValidationError("A canonical CRM record already exists for this company.");
    }
    if (companyRecords.some((record) => record.record_id !== lead.record_id && hasInitialEmailAttempt(record))) {
      throw new CrmValidationError("This company has already received or attempted this outreach round.");
    }

    const attemptedAt = Date.now();
    await markOutboundEmailPending(
      lead.record_id,
      email,
      subject,
      INITIAL_EMAIL_CAMPAIGN,
      attemptedAt,
    );
    console.log(
      JSON.stringify({ level: "info", event: "crm-send-email-pending", requestId, inquiryId, durationMs: Date.now() - startedAt }),
    );

    let resendEmailId: string;
    try {
      resendEmailId = await sendOutboundEmail({
        to: email,
        subject,
        body: draft,
        inquiryId,
        idempotencyKey: resendIdempotencyKey(lead),
      });
      console.log(
        JSON.stringify({ level: "info", event: "crm-send-email-accepted", requestId, inquiryId, durationMs: Date.now() - startedAt }),
      );
    } catch (sendError) {
      const failureReason =
        sendError instanceof Error ? sendError.message.slice(0, 1_000) : "Unknown Resend failure.";
      const failureWriteResults = await Promise.allSettled([
        markOutboundEmailFailed(
          lead.record_id,
          email,
          subject,
          INITIAL_EMAIL_CAMPAIGN,
          attemptedAt,
          failureReason,
        ),
        createSalesActivity({
          activityId: `ACT-${new Date(attemptedAt).toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 6).toUpperCase()}`,
          relatedLeadId: inquiryId,
          activityType: "Email",
          direction: "Outbound",
          subject,
          activityStatus: "Failed",
          contactedAt: attemptedAt,
          notes: `Initial outbound email failed without automatic retry: ${failureReason}`,
          nextAction: "Review the failure and manually reset the lead before any retry.",
        }),
      ]);
      if (failureWriteResults.some((result) => result.status === "rejected")) {
        console.error("Email failed and one or more CRM failure writes also failed", failureWriteResults);
      }
      console.error("Resend rejected approved outbound email", sendError);
      return respond(
        { success: false, inquiryId, error: "The email failed and was not automatically retried." },
        502,
      );
    }

    const sentAt = Date.now();
    const crmResults = await Promise.allSettled([
      markOutboundEmailSent(
        lead.record_id,
        resendEmailId,
        sentAt,
        nextFollowUp,
        email,
        subject,
        INITIAL_EMAIL_CAMPAIGN,
      ),
      createSalesActivity({
        activityId: `ACT-${new Date(sentAt).toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 6).toUpperCase()}`,
        relatedLeadId: inquiryId,
        activityType: "Email",
        direction: "Outbound",
        subject,
        activityStatus: "Sent",
        contactedAt: sentAt,
        resendEmailId,
        notes: `Initial personalized outbound email sent to ${email} after explicit approval.`,
        nextAction: `Follow up on ${new Date(nextFollowUp).toISOString().slice(0, 10)}`,
      }),
    ]);
    if (crmResults.some((result) => result.status === "rejected")) {
      console.error("Email sent but one or more CRM writes failed", crmResults);
      return respond(
        {
          success: false,
          inquiryId,
          resendEmailId,
          error: "Email sent, but CRM recording requires reconciliation. Do not resend.",
        },
        502,
      );
    }

    console.log(
      JSON.stringify({ level: "info", event: "crm-send-email-recorded", requestId, inquiryId, durationMs: Date.now() - startedAt }),
    );
    return respond({ success: true, inquiryId, resendEmailId }, 200);
  } catch (error) {
    if (error instanceof CrmValidationError) {
      return respond({ success: false, error: error.message }, 400);
    }
    if (error instanceof SyntaxError) {
      return respond({ success: false, error: "Invalid request." }, 400);
    }
    console.error("Unable to send approved outbound email", error);
    return respond(
      { success: false, error: "The email or CRM update failed. Please review the server logs." },
      502,
    );
  }
}
