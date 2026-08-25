"use client";

import { useEffect } from "react";
import { event } from "@/lib/gtag";

const quoteLabels = new Set([
  "request quote",
  "request a quote",
  "request a quotation",
]);

function getProductFromLink(link: HTMLAnchorElement) {
  try {
    return new URL(link.href).searchParams.get("product") || undefined;
  } catch {
    return undefined;
  }
}

function getLinkText(link: HTMLAnchorElement) {
  return (
    link.getAttribute("aria-label") ||
    link.textContent?.trim().replace(/\s+/g, " ") ||
    undefined
  )?.slice(0, 100);
}

function commonLinkParams(
  link: HTMLAnchorElement,
  safeLinkUrl: string,
  safeLinkText?: string,
) {
  const linkText = safeLinkText || getLinkText(link);
  return {
    link_url: safeLinkUrl,
    ...(linkText ? { link_text: linkText } : {}),
  };
}

export default function AnalyticsClickTracker() {
  useEffect(() => {
    function trackClick(clickEvent: MouseEvent) {
      const target = clickEvent.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link) return;

      const href = link.href;
      const pagePath = window.location.pathname;

      if (href.startsWith("tel:")) {
        event("phone_click", {
          ...commonLinkParams(link, "tel:", "Phone"),
          source_page: window.location.pathname,
        });
        return;
      }

      if (href.startsWith("mailto:")) {
        event("email_click", {
          ...commonLinkParams(link, "mailto:", "Email"),
          source_page: window.location.pathname,
        });
        return;
      }

      if (href.includes("wa.me/") || href.includes("whatsapp.com/")) {
        event("whatsapp_click", {
          ...commonLinkParams(link, "https://wa.me/", "WhatsApp"),
          source_page: window.location.pathname,
        });
        return;
      }

      const linkText = getLinkText(link);
      const label = linkText
        ? linkText
        .replace(/\s+/g, " ")
        .replace(/[→›»]+$/u, "")
        .trim()
        .toLowerCase()
        : undefined;
      if (label && quoteLabels.has(label)) {
        const product = getProductFromLink(link);
        event("request_quote_click", {
          page_path: pagePath,
          ...commonLinkParams(link, link.href),
          source_page: window.location.pathname,
          ...(product ? { product } : {}),
        });
      }
    }

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  return null;
}
