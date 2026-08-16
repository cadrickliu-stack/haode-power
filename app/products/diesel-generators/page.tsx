import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import DieselBrandCard from "@/components/DieselBrandCard";
import { dieselGeneratorCategory, site } from "@/lib/data";
import {
  dieselGeneratorBrands,
  plannedDieselGeneratorBrands,
} from "@/lib/diesel-generator-brands";

export const metadata: Metadata = {
  title: "Diesel Generator Sets by Engine Brand",
  description:
    "Explore Haode Power diesel generator sets by engine brand, including Cummins, Perkins, Volvo, MTU, Doosan, Weichai, Yuchai, and SDEC series with model specifications.",
  alternates: { canonical: "/products/diesel-generators" },
};

export default function DieselGeneratorsPage() {
  const seriesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Diesel Generator Series by Engine Brand",
    itemListElement: dieselGeneratorBrands.map((brand, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: brand.title,
      url: `${site.url}/products/diesel-generators/${brand.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }}
      />

      <PageHero
        eyebrow="Engine Brand Series"
        title="Diesel Generator Sets"
        description="Choose a diesel generator series by engine brand for industrial, mining, construction, rental, and standby power applications. Each page presents model-specific technical references."
        image={dieselGeneratorCategory.image}
        imageAlt={dieselGeneratorCategory.alt}
      />

      <section className="border-b border-navy-900/10 bg-white py-16">
        <div className="container-wide grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { label: "Published Series", value: "8 Brands" },
            { label: "Frequency Reference", value: "50Hz" },
            { label: "Order Configuration", value: "Project Specific" },
          ].map((fact) => (
            <div key={fact.label} className="border-l-2 border-orange-500 pl-4">
              <div className="font-mono text-xl font-600 text-navy-900 sm:text-2xl">
                {fact.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-steel-500">
                {fact.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Published Brand Series"
              title="Diesel Generator Series by Engine Brand"
              description="Compare Cummins, Perkins, Volvo, MTU, Doosan, Weichai, Yuchai, and SDEC diesel generator models. Final generator set configuration is confirmed during quotation."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {dieselGeneratorBrands.map((brand, index) => (
              <Reveal key={brand.slug} delay={index * 100}>
                <DieselBrandCard brand={brand} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Planned Series"
              title="Technical Data Pending"
              description="Mitsubishi remains visible in the brand range, but its detail page will be published only after reliable model parameters are provided."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {plannedDieselGeneratorBrands.map((brand) => (
                <span
                  key={brand}
                  className="border border-navy-900/15 bg-paper px-4 py-3 font-display text-lg font-700 uppercase text-navy-900"
                >
                  {brand}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border-l-4 border-orange-500 bg-navy-900 p-8 text-white">
              <div className="eyebrow before:bg-orange-500">Data Policy</div>
              <h2 className="mt-3 font-display text-3xl font-700 uppercase">
                Verified Before Published
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Power range, frequency, generator set model, dimensions,
                weight, and configuration can change by engine and enclosure.
                Unconfirmed values are not published as product specifications.
              </p>
              <Link href="/contact?product=Diesel%20Generator%20Series" className="btn-primary mt-7">
                Request a Quote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
