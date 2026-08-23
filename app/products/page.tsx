import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import DieselBrandCard from "@/components/DieselBrandCard";
import LightTowerCard from "@/components/LightTowerCard";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import { dieselGeneratorCategory } from "@/lib/data";
import { dieselGeneratorBrands } from "@/lib/diesel-generator-brands";
import { mobileLightTowers } from "@/lib/mobile-light-towers";

export const metadata: Metadata = {
  title: "Products | Diesel Generators & Mobile Light Towers",
  description:
    "Browse diesel generator sets by engine brand and mobile light towers for mining, construction, rental, and industrial applications.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Diesel Generators & Mobile Light Towers | Haode Power",
    description: "Compare Haode Power diesel generator series and five mobile light tower models.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }]} />
      <PageHero
        eyebrow="Full Product Range"
        title="Products"
        description="Diesel generator sets and mobile light towers engineered for mining, construction, oil & gas, and rental operations."
        image={dieselGeneratorCategory.image}
        imageAlt="Diesel generator and mobile light tower product range"
      />

      <section id="generators" className="scroll-mt-20 bg-white py-24">
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Engine Brand Series"
                title="Diesel Generator Sets"
                description="Explore eight diesel generator series by engine brand. Each brand page connects the supplied generator set type to its engine model and technical reference data."
              />
              <Link href="/products/diesel-generators" className="btn-dark">
                Full Specifications
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 max-w-3xl">
            {dieselGeneratorBrands.map((brand, i) => (
              <Reveal key={brand.slug} delay={i * 100}>
                <DieselBrandCard brand={brand} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="light-towers" className="scroll-mt-20 bg-paper py-24">
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Five Product Models"
                title="Mobile Light Towers"
                description="Compare diesel, LED and solar mobile lighting towers for night construction, roads, mining support and rental fleets."
              />
              <Link href="/products/mobile-light-towers" className="btn-dark">
                Full Specifications
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 space-y-8">
            {mobileLightTowers.map((tower, i) => (
              <Reveal key={tower.slug} delay={i * 100}>
                <LightTowerCard tower={tower} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-center text-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight sm:text-4xl">
            Need a Custom Configuration?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            OEM branding, custom canopy colors, control panel upgrades, and
            containerized packages are available on request.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Request Quote
          </Link>
        </div>
      </section>
    </>
  );
}
