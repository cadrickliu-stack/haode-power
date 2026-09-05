import assert from "node:assert/strict";
import test from "node:test";
// Node 24's native type-stripping test runner requires the explicit .ts extension.
// @ts-expect-error The production compiler uses noEmit; this import is executed directly by Node in this test.
import { CrmEmailResponseContractError, crmEmailJsonResponse, parseCrmEmailResponse } from "../lib/crm-email-response.ts";

test("server response has a stable JSON contract and no-store headers", async () => {
  const response = crmEmailJsonResponse(
    { success: true, inquiryId: "KE-20260901-999", resendEmailId: "resend-test-id" },
    200,
    "request-test-id",
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "application/json; charset=utf-8");
  assert.equal(response.headers.get("cache-control"), "no-store, no-cache, must-revalidate");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-haode-request-id"), "request-test-id");
  assert.deepEqual(await response.json(), {
    success: true,
    inquiryId: "KE-20260901-999",
    resendEmailId: "resend-test-id",
    requestId: "request-test-id",
  });
});

test("client parser accepts a complete success response", async () => {
  const parsed = await parseCrmEmailResponse(
    crmEmailJsonResponse(
      { success: true, inquiryId: "KE-20260901-999", resendEmailId: "resend-test-id" },
      200,
      "request-test-id",
    ),
  );

  assert.equal(parsed.payload.success, true);
  assert.equal(parsed.payload.resendEmailId, "resend-test-id");
  assert.equal(parsed.requestId, "request-test-id");
});

test("client parser accepts a structured application error", async () => {
  const parsed = await parseCrmEmailResponse(
    crmEmailJsonResponse({ success: false, error: "Blocked by preflight." }, 400, "request-test-id"),
  );

  assert.equal(parsed.status, 400);
  assert.equal(parsed.payload.success, false);
  assert.equal(parsed.payload.error, "Blocked by preflight.");
});

test("client parser preserves diagnostics for a non-JSON gateway response", async () => {
  const response = new Response("FUNCTION_INVOCATION_FAILED", {
    status: 502,
    headers: { "Content-Type": "text/plain", "X-Vercel-Id": "sin1::iad1::test" },
  });

  await assert.rejects(
    () => parseCrmEmailResponse(response),
    (error: unknown) => {
      assert.ok(error instanceof CrmEmailResponseContractError);
      assert.equal(error.status, 502);
      assert.equal(error.contentType, "text/plain");
      assert.equal(error.requestId, "sin1::iad1::test");
      assert.equal(error.bodyPreview, "FUNCTION_INVOCATION_FAILED");
      assert.equal(error.requiresReconciliation, true);
      return true;
    },
  );
});

test("client parser preserves diagnostics for malformed JSON", async () => {
  const response = new Response('{"success":true', {
    status: 502,
    headers: { "Content-Type": "application/json" },
  });

  await assert.rejects(
    () => parseCrmEmailResponse(response),
    (error: unknown) => {
      assert.ok(error instanceof CrmEmailResponseContractError);
      assert.match(error.message, /malformed JSON/);
      assert.equal(error.bodyPreview, '{"success":true');
      return true;
    },
  );
});

test("client parser rejects an incomplete success envelope", async () => {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  await assert.rejects(() => parseCrmEmailResponse(response), /incomplete or inconsistent success response/);
});
