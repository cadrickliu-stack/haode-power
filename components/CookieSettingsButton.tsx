"use client";

import { OPEN_COOKIE_SETTINGS } from "@/lib/cookie-consent";

export default function CookieSettingsButton() {
  return (
    <button type="button" className="focus-ring underline underline-offset-4 hover:text-orange-400"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}>
      Cookie Settings
    </button>
  );
}

