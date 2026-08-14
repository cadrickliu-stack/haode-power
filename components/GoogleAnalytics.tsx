import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

/**
 * Loads the official Google gtag.js library site-wide.
 *
 * - `strategy="afterInteractive"` loads GA after the page becomes
 *   interactive, so it never blocks First Contentful Paint / LCP — good
 *   for SEO and Core Web Vitals.
 * - `send_page_view: false` disables gtag's own automatic pageview so we
 *   don't double-count; <AnalyticsPageView> (see components) sends a
 *   single page_view on first load and on every client-side navigation,
 *   which is required for App Router SPA route changes to be tracked.
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
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}
