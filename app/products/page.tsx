import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import DieselBrandCard from "@/components/DieselBrandCard";
import LightTowerCard from "@/components/LightTowerCard";
import PageHero from "@/components/PageHero";
import { lightTowers, dieselGeneratorCategory } from "@/lib/data";
import { dieselGeneratorBrands } from "@/lib/diesel-generator-brands";

export const metadata: Metadata = {
  title: "Products | Diesel Generators & Mobile Light Towers",
  description:
    "Browse Haode Power diesel generator series by engine brand and five current mobile light tower models.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
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
                title="Diesel Generators"
                description="Select generator sets by engine brand. Cummins is the first published series; additional brand pages will follow after technical confirmation."
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
                description="Explore BMA4000, BMN4000, BMNVH1600, 4HVP1600M, and the 4TNVE600 solar light tower."
              />
              <Link href="/products/mobile-light-towers" className="btn-dark">
                Full Specifications
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 space-y-8">
            {lightTowers.map((tower, i) => (
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
