import "server-only";

import { timingSafeEqual } from "node:crypto";

export function authorizeCrmAdmin(request: Request) {
  const expected = process.env.CRM_ADMIN_API_KEY;
  if (!expected) {
    return { ok: false as const, response: Response.json({ error: "CRM admin access is not configured." }, { status: 503 }) };
  }

  const header = request.headers.get("authorization") ?? "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
  const expectedBytes = Buffer.from(expected);
  const suppliedBytes = Buffer.from(supplied);
  const valid =
    expectedBytes.length === suppliedBytes.length && timingSafeEqual(expectedBytes, suppliedBytes);

  if (!valid) {
    return { ok: false as const, response: Response.json({ error: "Unauthorized." }, { status: 401 }) };
  }
  return { ok: true as const };
}
