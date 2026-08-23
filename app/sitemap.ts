import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { dieselGeneratorBrands } from "@/lib/diesel-generator-brands";
import { mobileLightTowers } from "@/lib/mobile-light-towers";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-23T00:00:00.000Z");
  const routes = [
    "",
    "/products",
    "/products/diesel-generators",
    "/products/mobile-light-towers",
    "/about",
    "/contact",
    ...dieselGeneratorBrands.map(
      (brand) => `/products/diesel-generators/${brand.slug}`,
    ),
    ...mobileLightTowers.map(
      (tower) => `/products/mobile-light-towers/${tower.slug}`,
    ),
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/products") ? 0.9 : 0.7,
  }));
}
