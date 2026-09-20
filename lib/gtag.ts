/**
 * Google Analytics 4 (gtag.js) helpers.
 *
 * The Measurement ID is read from NEXT_PUBLIC_GA_ID so it can be swapped
 * per-environment without touching code, falling back to the id provided
 * at setup time so analytics work out of the box.
 */

import { readCookieChoice } from "@/lib/cookie-consent";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-E01X2RP8J3";

type AnalyticsValue = string | number | boolean;

const SAFE_EVENT_PARAMETERS = new Set([
  "link_text",
  "link_url",
  "page_path",
  "product",
  "product_category",
  "source_page",
]);

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Sends a custom event to GA4 (e.g. form submissions, quote requests). */
export function event(
  name: string,
  params: Record<string, AnalyticsValue> = {}
) {
  if (typeof window === "undefined" || !window.gtag || readCookieChoice() !== "accepted") return;
  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([key]) => SAFE_EVENT_PARAMETERS.has(key)),
  );
  window.gtag("event", name, {
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_title: document.title,
    ...safeParams,
    send_to: GA_MEASUREMENT_ID,
  });
}
