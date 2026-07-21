/**
 * Google Analytics 4 (gtag.js) helpers.
 *
 * The Measurement ID is read from NEXT_PUBLIC_GA_ID so it can be swapped
 * per-environment without touching code, falling back to the id provided
 * at setup time so analytics work out of the box.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-E01X2RP8J3";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Sends a page_view event to GA4. Called on every client-side route change. */
export function pageview(url: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: url,
    send_to: GA_MEASUREMENT_ID,
  });
}

/** Sends a custom event to GA4 (e.g. form submissions, quote requests). */
export function event(
  name: string,
  params: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
