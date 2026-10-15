"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { localizedPath } from "@/i18n/text";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  return <label className="flex shrink-0 items-center gap-2 text-xs text-navy-900">
    <span aria-hidden="true">◎</span>
    <span className="sr-only">English / Русский / Español</span>
    <select aria-label="Language / Язык / Idioma" value={locale}
      className="focus-ring max-w-[105px] border border-navy-900/20 bg-white px-2 py-2 text-sm"
      onChange={event => {
        // A language change is a new localized document; retain product query and fragment.
        window.location.assign(localizedPath(pathname, event.target.value) + window.location.search + window.location.hash);
      }}>
      <option value="en">English</option><option value="ru">Русский</option><option value="es">Español</option>
    </select>
  </label>;
}
