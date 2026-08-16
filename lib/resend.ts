import "server-only";

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM = "Cadrick Liu | Haode Power <sales@haodepower.com>";
const REPLY_TO = "sales@haodepower.com";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textToHtml(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`)
    .join("");
}

export async function sendOutboundEmail(input: {
  to: string;
  subject: string;
  body: string;
  inquiryId: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `haode-initial-outbound-${input.inquiryId}`,
    },
    body: JSON.stringify({
      from: FROM,
      to: [input.to],
      reply_to: REPLY_TO,
      subject: input.subject,
      text: input.body,
      html: textToHtml(input.body),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  const result = (await response.json().catch(() => null)) as
    | { id?: string; message?: string; error?: { message?: string } }
    | null;
  if (!response.ok || !result?.id) {
    throw new Error(`Resend rejected the email (${response.status}): ${result?.message || result?.error?.message || "unknown error"}.`);
  }
  return result.id;
}
