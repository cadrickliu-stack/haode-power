import "server-only";

import { randomUUID } from "node:crypto";
import {
  createOutboundLead,
  findLeadByInquiryId,
  listLarkRecords,
  updateOutboundLeadRecord,
  type LarkRecord,
  type OutboundLeadRecord,
  type OutboundLeadUpdate,
} from "@/lib/lark";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRIORITIES = ["A - High Priority", "B - Relevant", "C - Low Priority"] as const;
const EDITABLE_STATUSES = ["Researching", "Ready to Contact"] as const;

export class CrmValidationError extends Error {}

function text(value: unknown, field: string, maxLength: number, required = false) {
  if (value == null && !required) return "";
  if (typeof value !== "string") throw new CrmValidationError(`${field} must be text.`);
  const result = value.trim();
  if (required && !result) throw new CrmValidationError(`${field} is required.`);
  if (result.length > maxLength) throw new CrmValidationError(`${field} is too long.`);
  return result;
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizeWhatsApp(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizeCompany(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function normalizeDomain(value: string) {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    throw new CrmValidationError("Website or Company Domain is invalid.");
  }
}

export function fieldText(record: LarkRecord, name: string) {
  const value = record.fields[name];
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  if (value && typeof value === "object" && "text" in value) {
    return String((value as { text?: unknown }).text ?? "").trim();
  }
  return "";
}

function findDuplicate(
  records: LarkRecord[],
  candidate: { email: string; domain: string; whatsapp: string; company: string; country: string },
) {
  return records.find((record) => {
    const recordEmail = normalizeEmail(fieldText(record, "Email"));
    const recordDomain = fieldText(record, "Company Domain").toLowerCase();
    const recordWhatsApp = normalizeWhatsApp(fieldText(record, "WhatsApp"));
    const recordCompany = normalizeCompany(fieldText(record, "Company"));
    const recordCountry = fieldText(record, "Country").toLowerCase();
    return Boolean(
      (candidate.email && recordEmail === candidate.email) ||
        (candidate.domain && recordDomain === candidate.domain) ||
        (candidate.whatsapp && recordWhatsApp === candidate.whatsapp) ||
        (candidate.company &&
          candidate.country &&
          recordCompany === candidate.company &&
          recordCountry === candidate.country),
    );
  });
}

export async function buildAndCreateOutboundLead(input: Record<string, unknown>) {
  const now = new Date();
  const company = text(input.company, "Company", 160, true);
  const country = text(input.country, "Country", 100, true);
  const fullName = text(input.fullName, "Full Name", 120);
  const jobTitle = text(input.jobTitle, "Job Title", 120);
  const rawEmail = text(input.email, "Email", 254);
  const email = rawEmail ? normalizeEmail(rawEmail) : "";
  if (email && !EMAIL_PATTERN.test(email)) throw new CrmValidationError("Email is invalid.");

  const whatsapp = text(input.whatsapp, "WhatsApp", 60);
  const website = text(input.website, "Website", 1_000);
  const suppliedDomain = text(input.companyDomain, "Company Domain", 253);
  const companyDomain = suppliedDomain
    ? normalizeDomain(suppliedDomain)
    : website
      ? normalizeDomain(website)
      : "";
  const product = text(input.product, "Product", 160, true);
  const researchSummary = text(input.researchSummary, "Research Summary", 5_000, true);
  const researchSources = text(input.researchSources, "Research Sources", 5_000, true);
  const emailSubject = text(input.emailSubject, "Email Subject", 200);
  const emailDraft = text(input.emailDraft, "Email Draft", 10_000);

  const priority = text(input.priority, "Priority", 50, true) as OutboundLeadRecord["priority"];
  if (!PRIORITIES.includes(priority)) throw new CrmValidationError("Priority is invalid.");
  const requestedStatus = text(input.status, "Status", 50) || "Researching";
  if (!EDITABLE_STATUSES.includes(requestedStatus as (typeof EDITABLE_STATUSES)[number])) {
    throw new CrmValidationError("Status must be Researching or Ready to Contact.");
  }
  const status = requestedStatus as OutboundLeadRecord["status"];
  if (status === "Ready to Contact" && (!email || !emailSubject || !emailDraft)) {
    throw new CrmValidationError(
      "Ready to Contact requires a reliable Email, Email Subject, and Email Draft.",
    );
  }

  const duplicate = findDuplicate(await listLarkRecords(), {
    email,
    domain: companyDomain,
    whatsapp: normalizeWhatsApp(whatsapp),
    company: normalizeCompany(company),
    country: country.toLowerCase(),
  });
  const relatedLeadId = duplicate ? fieldText(duplicate, "Inquiry ID") : "";
  const inquiryId = `OB-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 6).toUpperCase()}`;

  await createOutboundLead({
    inquiryId,
    submittedAt: now.getTime(),
    status,
    fullName,
    company,
    country,
    jobTitle,
    email,
    whatsapp,
    website,
    companyDomain,
    product,
    priority,
    researchSummary,
    researchSources,
    duplicateStatus: duplicate ? "Possible Duplicate" : "Unique",
    relatedLeadId,
    emailSubject,
    emailDraft,
  });

  return {
    inquiryId,
    duplicateStatus: duplicate ? "Possible Duplicate" : "Unique",
    relatedLeadId: relatedLeadId || undefined,
  };
}

export async function updateOutboundLead(inquiryId: string, input: Record<string, unknown>) {
  if (!/^OB-\d{8}-[A-Z0-9]{6}$/.test(inquiryId)) {
    throw new CrmValidationError("Outbound lead ID is invalid.");
  }
  const record = await findLeadByInquiryId(inquiryId);
  if (!record) throw new CrmValidationError("Outbound lead was not found.");

  const update: OutboundLeadUpdate = {};
  if (input.status !== undefined) {
    const status = text(input.status, "Status", 50, true);
    if (!EDITABLE_STATUSES.includes(status as (typeof EDITABLE_STATUSES)[number])) {
      throw new CrmValidationError("Status must be Researching or Ready to Contact.");
    }
    update.status = status as OutboundLeadUpdate["status"];
  }
  if (input.fullName !== undefined) update.fullName = text(input.fullName, "Full Name", 120);
  if (input.jobTitle !== undefined) update.jobTitle = text(input.jobTitle, "Job Title", 120);
  if (input.email !== undefined) {
    const email = normalizeEmail(text(input.email, "Email", 254));
    if (email && !EMAIL_PATTERN.test(email)) throw new CrmValidationError("Email is invalid.");
    update.email = email;
  }
  if (input.whatsapp !== undefined) update.whatsapp = text(input.whatsapp, "WhatsApp", 60);
  if (input.website !== undefined) update.website = text(input.website, "Website", 1_000);
  if (input.companyDomain !== undefined) {
    const domain = text(input.companyDomain, "Company Domain", 253);
    update.companyDomain = domain ? normalizeDomain(domain) : "";
  }
  if (input.product !== undefined) update.product = text(input.product, "Product", 160, true);
  if (input.priority !== undefined) {
    const priority = text(input.priority, "Priority", 50, true) as OutboundLeadRecord["priority"];
    if (!PRIORITIES.includes(priority)) throw new CrmValidationError("Priority is invalid.");
    update.priority = priority;
  }
  if (input.researchSummary !== undefined) {
    update.researchSummary = text(input.researchSummary, "Research Summary", 5_000, true);
  }
  if (input.researchSources !== undefined) {
    update.researchSources = text(input.researchSources, "Research Sources", 5_000, true);
  }
  if (input.emailSubject !== undefined) {
    update.emailSubject = text(input.emailSubject, "Email Subject", 200);
  }
  if (input.emailDraft !== undefined) update.emailDraft = text(input.emailDraft, "Email Draft", 10_000);

  const finalStatus = update.status ?? fieldText(record, "Status");
  const finalEmail = update.email ?? normalizeEmail(fieldText(record, "Email"));
  const finalSubject = update.emailSubject ?? fieldText(record, "Email Subject");
  const finalDraft = update.emailDraft ?? fieldText(record, "Email Draft");
  if (finalStatus === "Ready to Contact" && (!finalEmail || !finalSubject || !finalDraft)) {
    throw new CrmValidationError(
      "Ready to Contact requires a reliable Email, Email Subject, and Email Draft.",
    );
  }

  await updateOutboundLeadRecord(record.record_id, update);
  return { inquiryId };
}
