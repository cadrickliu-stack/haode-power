import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { dieselGeneratorBrands } from "@/lib/diesel-generator-brands";
import { mobileLightTowers } from "@/lib/mobile-light-towers";
import { languageAlternates } from "@/i18n/metadata";
import { localizedPath } from "@/i18n/text";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-23T00:00:00.000Z");
  const routes = [
    "",
    "/products",
    "/products/diesel-generators",
    "/products/mobile-light-towers",
    "/about",
    "/contact",
    "/privacy-policy",
    ...dieselGeneratorBrands.map(
      (brand) => `/products/diesel-generators/${brand.slug}`,
    ),
    ...mobileLightTowers.map(
      (tower) => `/products/mobile-light-towers/${tower.slug}`,
    ),
  ];

  return ["en", "ru", "es"].flatMap((locale) => routes.map((route) => ({
    url: `${site.url}${localizedPath(route || "/", locale)}`,
    alternates: {languages: languageAlternates(route || "/")},
    lastModified: locale !== "en" ? new Date("2026-10-15T00:00:00.000Z") : route === "/privacy-policy" ? new Date("2026-09-21T00:00:00.000Z") : lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/products") ? 0.9 : 0.7,
  })));
}
