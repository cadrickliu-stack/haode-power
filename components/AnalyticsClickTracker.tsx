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

export default function AnalyticsClickTracker() {
  useEffect(() => {
    function trackClick(clickEvent: MouseEvent) {
      const target = clickEvent.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link) return;

      const href = link.href;
      const pagePath = `${window.location.pathname}${window.location.search}`;

      if (href.startsWith("tel:")) {
        event("contact_click", { contact_type: "phone", page_path: pagePath });
        return;
      }

      if (href.startsWith("mailto:")) {
        event("contact_click", { contact_type: "email", page_path: pagePath });
        return;
      }

      if (href.includes("wa.me/") || href.includes("whatsapp.com/")) {
        event("whatsapp_click", { page_path: pagePath });
        return;
      }

      const label = link.textContent
        ?.trim()
        .replace(/\s+/g, " ")
        .replace(/[→›»]+$/u, "")
        .trim()
        .toLowerCase();
      if (label && quoteLabels.has(label)) {
        const product = getProductFromLink(link);
        event("request_quote_click", {
          page_path: pagePath,
          ...(product ? { product } : {}),
        });
      }
    }

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  return null;
}
