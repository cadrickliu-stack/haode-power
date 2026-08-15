import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import GeneratorSpecificationTable from "@/components/GeneratorSpecificationTable";
import {
  dieselGeneratorBrands,
  getDieselGeneratorBrand,
} from "@/lib/diesel-generator-brands";
import { site } from "@/lib/data";

type BrandPageProps = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return dieselGeneratorBrands.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getDieselGeneratorBrand(slug);

  if (!brand) {
    return { title: "Diesel Generator Series" };
  }

  return {
    title: brand.title,
    description: brand.shortDescription,
    alternates: {
      canonical: `/products/diesel-generators/${brand.slug}`,
    },
    openGraph: {
      title: `${brand.title} | ${site.name}`,
      description: brand.shortDescription,
      images: [{ url: brand.image, alt: brand.imageAlt }],
    },
  };
}

export default async function DieselGeneratorBrandPage({ params }: BrandPageProps) {
  const { brand: slug } = await params;
  const brand = getDieselGeneratorBrand(slug);

  if (!brand) notFound();

  const modelCount = brand.seriesGroups.reduce(
    (total, group) => total + group.models.length,
    0,
  );
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: `${site.url}/products`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Diesel Generators",
        item: `${site.url}/products/diesel-generators`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brand.name,
        item: `${site.url}/products/diesel-generators/${brand.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="Diesel Generator Series"
        title={brand.title}
        description={brand.shortDescription}
        image={brand.image}
        imageAlt={brand.imageAlt}
      />

      <section className="bg-white py-24">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
              <Image
                src={brand.image}
                alt={brand.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="eyebrow">Series Overview</div>
            <h2 className="mt-3 font-display text-4xl font-700 uppercase leading-tight text-navy-900">
              {brand.name} Engine Range
            </h2>
            <p className="mt-5 leading-relaxed text-steel-600">{brand.description}</p>
            <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                { label: "Power Reference", value: brand.powerRange },
                { label: "Frequency", value: brand.frequencySummary },
                { label: "Published Combinations", value: `${modelCount} references` },
                { label: "Configuration", value: brand.configurations },
              ].map((fact) => (
                <div key={fact.label} className="border-l-2 border-orange-500 pl-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-steel-500">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-mono font-600 text-navy-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <Link
              href={`/contact?product=${encodeURIComponent(brand.title)}`}
              className="btn-primary mt-8"
            >
              Request a Quote
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Supplied Technical Reference"
              title="Generator Set Specifications"
              description="Each product record and series grouping below follows the supplied parameter table for this engine brand. The source Detail / Click column is intentionally omitted."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 border-l-4 border-orange-500 bg-white p-5 text-sm leading-relaxed text-steel-600">
              Values are reproduced as supplied without calculation,
              conversion, or reinterpretation. Final order configuration and
              any 60Hz requirements are confirmed during quotation.
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <GeneratorSpecificationTable groups={brand.seriesGroups} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Order Configuration"
              title="Configuration Confirmed Per Project"
              description="Each brand page includes the required configuration sections, but unverified equipment is not listed as standard or optional."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Reveal delay={80}>
              <div className="h-full border border-navy-900/10 bg-paper p-8">
                <h3 className="font-display text-2xl font-700 uppercase text-navy-900">
                  Standard Configuration
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-600">
                  The confirmed standard configuration list has not yet been
                  provided. It will be published after the engine, alternator,
                  controller, base frame, fuel system, and protection scope are
                  verified.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full border border-navy-900/10 bg-paper p-8">
                <h3 className="font-display text-2xl font-700 uppercase text-navy-900">
                  Optional Configuration
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-steel-600">
                  Open, silent, containerized, ATS, extended fuel tank, and
                  other order options will be listed only after their available
                  model ranges are confirmed.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-center text-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight sm:text-4xl">
            Confirm Your {brand.name} Generator Requirement
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            Send the required output, frequency, voltage, configuration,
            quantity, and destination. The final model and technical scope are
            confirmed before quotation.
          </p>
          <Link
            href={`/contact?product=${encodeURIComponent(brand.title)}`}
            className="btn-primary mt-8"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
