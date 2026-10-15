import type { Metadata } from "next";
import { site } from "@/lib/data";
import { localizedPath, text } from "./text";
import { getMobileLightTower } from "@/lib/mobile-light-towers";

export function languageAlternates(path: string) {
  return Object.fromEntries(["en", "ru", "es", "x-default"].map(locale => [locale, site.url + localizedPath(path, locale === "x-default" ? "en" : locale)]));
}

export function localizeMetadata(base: Metadata, locale: string): Metadata {
  const raw = String(base.alternates?.canonical || "/");
  const path = raw.startsWith("http") ? new URL(raw).pathname : raw;
  const url = site.url + localizedPath(path, locale);
  let title = typeof base.title === "string" ? text(base.title, locale) : base.title && "absolute" in base.title ? {absolute: text(base.title.absolute, locale)} : base.title;
  let description = base.description ? text(base.description, locale) : undefined;
  const tower = path.startsWith("/products/mobile-light-towers/") ? getMobileLightTower(path.split("/").pop()!) : undefined;
  if (tower && locale !== "en") {
    title = text(tower.title, locale);
    description = text(tower.shortDescription, locale);
  }
  const socialTitle = typeof title === "string" ? title : title && "absolute" in title ? title.absolute : undefined;
  return { ...base, metadataBase: new URL(site.url), title, description, alternates: {canonical: url, languages: languageAlternates(path)},
    openGraph: locale === "en" ? {...base.openGraph, url} : {...base.openGraph, title: socialTitle, description, url, locale: locale === "ru" ? "ru_RU" : "es_ES"},
    twitter: {card: "summary_large_image", ...base.twitter, ...(locale === "en" ? {} : {title: socialTitle, description})},
  };
}
