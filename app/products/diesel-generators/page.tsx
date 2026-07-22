import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import GeneratorCard from "@/components/GeneratorCard";
import { generators, site, dieselGeneratorHero } from "@/lib/data";

export const metadata: Metadata = {
  title: "Diesel Generator Sets 20kVA–1000kVA",
  description:
    "Haode Power diesel generator sets from 20kVA to 1000kVA — Cummins and Perkins powered, full-load tested, silent and open-frame options for mining, construction and industrial use.",
  alternates: { canonical: "/products/diesel-generators" },
};

export default function DieselGeneratorsPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: generators.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${site.name} ${g.model} Diesel Generator ${g.kva}`,
        description: `${g.kva} diesel generator set powered by ${g.engine}. Ideal for ${g.useCase.toLowerCase()}.`,
        brand: { "@type": "Brand", name: site.name },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <PageHero
        eyebrow="Prime & Standby Power"
        title="Diesel Generator Sets"
        description="Six standard capacities from 20kVA to 1000kVA, built around Cummins and Perkins engines, with silent canopy and open-frame configurations available on every model."
        image={dieselGeneratorHero.image}
        imageAlt={dieselGeneratorHero.alt}
      />

      <section className="border-b border-navy-900/10 bg-white py-16">
        <div className="container-wide grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { label: "Capacity Range", value: "20–1000 kVA" },
            { label: "Engine Brands", value: "Cummins / Perkins" },
            { label: "Standard Warranty", value: "12 Months" },
            { label: "Certification", value: "ISO / CE" },
          ].map((f) => (
            <div key={f.label} className="border-l-2 border-orange-500 pl-4">
              <div className="font-mono text-2xl font-600 text-navy-900">{f.value}</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-steel-500">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Standard Models"
              title="Choose Your Capacity"
              description="Every model is available in open-frame, silent canopy, and trailer-mounted configurations. Custom voltage and frequency (50Hz/60Hz) on request."
            />
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

      <section className="bg-white py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading eyebrow="Full Specification Sheet" title="Compare Models" />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 overflow-x-auto border border-navy-900/10">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Model</th>
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Rated Power</th>
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Prime Power (kW)</th>
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Engine</th>
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Fuel Tank</th>
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Runtime</th>
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Phase</th>
                  </tr>
                </thead>
                <tbody>
                  {generators.map((g) => (
                    <tr key={g.model} className="spec-row border-t border-navy-900/10">
                      <td className="px-5 py-4 font-mono font-600 text-navy-900">{g.model}</td>
                      <td className="px-5 py-4 font-mono text-orange-600">{g.kva}</td>
                      <td className="px-5 py-4 font-mono text-steel-600">{g.kw}</td>
                      <td className="px-5 py-4 text-steel-600">{g.engine}</td>
                      <td className="px-5 py-4 font-mono text-steel-600">{g.fuelTankL}</td>
                      <td className="px-5 py-4 font-mono text-steel-600">{g.runtimeHrs}</td>
                      <td className="px-5 py-4 text-steel-600">{g.phase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Standard Features"
              title="What's Included"
            />
            <ul className="mt-6 space-y-3 text-sm text-steel-600">
              {[
                "Brushless self-excited alternator",
                "Digital control panel with auto-start (AMF/ATS ready)",
                "Deep-sea / Smartgen control panel options",
                "Anti-vibration mounts and base fuel tank",
                "Sound-attenuated canopy (silent models)",
                "Emergency stop and low oil / high temp shutdown",
                "Battery charger and starter battery included",
                "Full factory load-bank test report",
              ].map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-0.5 text-orange-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="Optional Upgrades" title="Configure Your Unit" />
            <ul className="mt-6 space-y-3 text-sm text-steel-600">
              {[
                "Trailer-mounted / containerized packages",
                "Remote monitoring & IoT telematics",
                "Automatic mains failure (AMF) synchronizing panels",
                "Weatherproof / tropicalized canopy coating",
                "Custom paint color and OEM branding decals",
                "Extended fuel tank (24–72 hr runtime)",
                "Parallel operation & load-sharing systems",
                "Spare parts kits for 2-year operation",
              ].map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-0.5 text-orange-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-center text-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight sm:text-4xl">
            Get Pricing for Your Required Capacity
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Send us your load requirements and destination port for a
            detailed FOB/CIF quotation within 24 hours.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Request Quote
          </Link>
        </div>
      </section>
    </>
  );
}
