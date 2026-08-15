import { randomUUID } from "node:crypto";
import { createLarkInquiry } from "@/lib/lark";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type InquiryInput = {
  name?: unknown;
  company?: unknown;
  country?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  product?: unknown;
  quantity?: unknown;
  message?: unknown;
  sourcePageUrl?: unknown;
};

class ValidationError extends Error {}

function readText(value: unknown, field: string, maxLength: number, required = true) {
  if (typeof value !== "string") {
    if (!required && value == null) return "";
    throw new ValidationError(`${field} is required.`);
  }

  const text = value.trim();
  if (required && !text) throw new ValidationError(`${field} is required.`);
  if (text.length > maxLength) throw new ValidationError(`${field} is too long.`);
  return text;
}

function readQuantity(value: unknown) {
  const quantity = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 1_000_000) {
    throw new ValidationError("Please enter a valid quantity.");
  }
  return quantity;
}

function getSourceDetails(sourcePageUrl: string) {
  try {
    const url = new URL(sourcePageUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
    return { sourcePage: url.pathname || "/", sourceUrl: url.toString() };
  } catch {
    return { sourcePage: "Website inquiry form", sourceUrl: "Not provided" };
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ success: false, error: "Request is too large." }, { status: 413 });
  }

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return Response.json({ success: false, error: "Request is too large." }, { status: 413 });
    }

    const input = JSON.parse(rawBody) as InquiryInput;
    const fullName = readText(input.name, "Full name", 120);
    const company = readText(input.company, "Company", 160);
    const country = readText(input.country, "Country", 100);
    const email = readText(input.email, "Email", 254).toLowerCase();
    const whatsapp = readText(input.whatsapp, "WhatsApp", 60, false);
    const product = readText(input.product, "Product", 160);
    const quantity = readQuantity(input.quantity);
    const message = readText(input.message, "Message", 5_000);
    const sourcePageUrl = readText(input.sourcePageUrl, "Source page URL", 1_000, false);

    if (!EMAIL_PATTERN.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const now = new Date();
    const inquiryId = `HP-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`;
    const { sourcePage, sourceUrl } = getSourceDetails(sourcePageUrl);

    await createLarkInquiry({
      inquiryId,
      submittedAt: now.getTime(),
      fullName,
      company,
      country,
      email,
      whatsapp,
      product,
      quantity,
      message,
      sourcePage,
      sourceUrl,
    });

    return Response.json({ success: true, inquiryId }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ success: false, error: "Invalid request." }, { status: 400 });
    }

    if (error instanceof ValidationError) {
      return Response.json({ success: false, error: error.message }, { status: 400 });
    }

    console.error("Unable to save website inquiry to Lark CRM", error);
    return Response.json(
      {
        success: false,
        error: "We could not submit your inquiry. Please try again or contact us directly.",
      },
      { status: 502 },
    );
  }
}
