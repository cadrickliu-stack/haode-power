"use client";

import { OPEN_COOKIE_SETTINGS } from "@/lib/cookie-consent";

export default function CookieSettingsButton() {
  const locale = useLocale();
  return localizeNode((
    <button type="button" className="focus-ring underline underline-offset-4 hover:text-orange-400"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}>
      Cookie Settings
    </button>
  ), locale);
}


import { useLocale } from "next-intl";

import { localizeNode } from "@/i18n/text";
