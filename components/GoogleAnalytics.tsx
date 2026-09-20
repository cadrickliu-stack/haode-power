"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

/**
 * Loads the existing Google tag once, after analytics consent is granted.
 *
 * - `strategy="afterInteractive"` loads GA after the page becomes
 *   interactive, so it never blocks First Contentful Paint / LCP — good
 *   for SEO and Core Web Vitals.
 * - GA4's built-in page-view measurement handles both the initial page load
 *   and App Router history changes. Keeping one page-view mechanism avoids
 *   double-counting client-side navigations.
 */
export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { allow_google_signals: false, allow_ad_personalization_signals: false });
        `}
      </Script>
    </>
  );
}
