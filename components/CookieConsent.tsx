"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { OPEN_COOKIE_SETTINGS, readCookieChoice, saveCookieChoice, updateCookieConsent, type CookieChoice } from "@/lib/cookie-consent";

export default function CookieConsent({ analyticsEnabled }: { analyticsEnabled: boolean }) {
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState<CookieChoice | null>(null);
  const [tagEnabled, setTagEnabled] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const focusOnOpen = useRef(false);
  const currentChoice = useRef<CookieChoice | null>(null);

  useEffect(() => {
    function restore() {
      const stored = readCookieChoice();
      currentChoice.current = stored;
      updateCookieConsent(stored);
      setChoice(stored);
      setVisible(stored === null);
      if (stored === "accepted") setTagEnabled(true);
    }
    function sync() {
      if (readCookieChoice() !== currentChoice.current) restore();
    }
    function open() {
      opener.current = document.activeElement as HTMLElement | null;
      focusOnOpen.current = true;
      setVisible(true);
    }
    restore();
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", sync);
    const timer = window.setInterval(sync, 60_000);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", sync);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (visible && focusOnOpen.current) {
      panel.current?.focus();
      focusOnOpen.current = false;
    }
  }, [visible]);

  function close() {
    setVisible(false);
    opener.current?.focus({ preventScroll: true });
  }

  function choose(next: CookieChoice) {
    saveCookieChoice(next);
    currentChoice.current = next;
    setChoice(next);
    // Never remount/reconfigure the tag on consent changes or SPA navigation.
    if (next === "accepted") setTagEnabled(true);
    close();
  }

  return (
    <>
      {analyticsEnabled && tagEnabled && <GoogleAnalytics />}
      {visible && (
        <section ref={panel} tabIndex={-1} role="region" aria-labelledby="cookie-title"
          onKeyDown={(event) => { if (event.key === "Escape" && choice) close(); }}
          className="fixed inset-x-3 bottom-3 z-[60] max-h-[70dvh] overflow-y-auto rounded-sm border border-navy-900/15 bg-white p-5 text-navy-900 shadow-xl sm:inset-x-6 sm:p-6 lg:left-auto lg:w-[640px]">
          <div className="flex items-start justify-between gap-4">
            <h2 id="cookie-title" className="font-display text-2xl font-700">We value your privacy</h2>
            {choice && <button type="button" onClick={close} className="focus-ring text-sm underline">Close</button>}
          </div>
          <p className="mt-3 text-sm leading-6 text-steel-600">We use necessary cookies to keep our website working and analytics cookies to understand how visitors use our website and improve our services. You can accept analytics cookies or continue with non-essential cookies disabled.</p>
          <p className="mt-2 text-sm leading-6 text-steel-600">Necessary storage stays enabled. Advertising storage and personalization stay disabled.</p>
          <Link href="/privacy-policy" className="focus-ring mt-3 inline-block text-sm underline decoration-orange-500 underline-offset-4">Privacy Policy</Link>
          <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
            <button type="button" onClick={() => choose("accepted")} className="focus-ring min-h-11 border border-navy-900 bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800">Accept All</button>
            <button type="button" onClick={() => choose("rejected")} className="focus-ring min-h-11 border border-navy-900 bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-50">Reject Non-Essential</button>
          </div>
        </section>
      )}
    </>
  );
}

