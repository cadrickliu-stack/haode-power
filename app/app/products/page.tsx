import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import GeneratorCard from "@/components/GeneratorCard";
import LightTowerCard from "@/components/LightTowerCard";
import PageHero from "@/components/PageHero";
import { generators, lightTowers, dieselGeneratorHero } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products | Diesel Generators & Mobile Light Towers",
  description:
    "Browse Haode Power's full product range: diesel generator sets from 20kVA to 1000kVA, and solar, diesel, and hybrid mobile light towers.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Full Product Range"
        title="Products"
        description="Diesel generator sets and mobile light towers engineered for mining, construction, oil & gas, and rental operations."
        image={dieselGeneratorHero.image}
        imageAlt="Diesel generator and mobile light tower product range"
      />

      <section id="generators" className="scroll-mt-20 bg-white py-24">
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="20kVA – 1000kVA"
                title="Diesel Generators"
                description="Six standard capacities covering everything from workshop backup to mining-grade prime power."
              />
              <Link href="/products/diesel-generators" className="btn-dark">
                Full Specifications
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {generators.map((gen, i) => (
              <Reveal key={gen.model} delay={(i % 3) * 100}>
                <GeneratorCard gen={gen} />
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
                eyebrow="Solar / Diesel / Hybrid"
                title="Mobile Light Towers"
                description="Choose fuel-free solar, heavy-duty diesel, or fuel-saving hybrid to match your site's runtime and noise requirements."
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
