import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LightTowerSpecifications from "@/components/LightTowerSpecifications";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/data";
import {
  getMobileLightTower,
  mobileLightTowers,
} from "@/lib/mobile-light-towers";

type LightTowerPageProps = {
  params: Promise<{ model: string }>;
};

export function generateStaticParams() {
  return mobileLightTowers.map((tower) => ({ model: tower.slug }));
}

export async function generateMetadata({
  params,
}: LightTowerPageProps): Promise<Metadata> {
  const { model: slug } = await params;
  const tower = getMobileLightTower(slug);

  if (!tower) {
    return { title: "Mobile Light Tower" };
  }

  const canonical = `/products/mobile-light-towers/${tower.slug}`;
  const seoLabel = tower.model === "4HVP1600M"
    ? "Heavy Duty Mining Light Tower"
    : tower.powerSource === "Solar + Battery"
      ? "Solar LED Mobile Light Tower"
      : "Diesel Mobile Light Tower";

  return {
    title: `${tower.model} ${seoLabel}`,
    description: `${tower.model} ${seoLabel.toLowerCase()} with ${tower.mastHeight} mast, ${tower.lighting}, and model-specific specifications for construction and industrial site lighting.`,
    alternates: { canonical },
    openGraph: {
      title: `${tower.title} | ${site.name}`,
      description: tower.shortDescription,
      url: canonical,
      type: "website",
      images: [{ url: tower.image, alt: tower.imageAlt }],
    },
  };
}

export default async function MobileLightTowerPage({
  params,
}: LightTowerPageProps) {
  const { model: slug } = await params;
  const tower = getMobileLightTower(slug);

  if (!tower) notFound();

  const detailUrl = `${site.url}/products/mobile-light-towers/${tower.slug}`;
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
        name: "Mobile Light Towers",
        item: `${site.url}/products/mobile-light-towers`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tower.model,
        item: detailUrl,
      },
    ],
  };
  const quoteHref = `/contact?product=${encodeURIComponent(tower.name)}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="border-b border-navy-900/10 bg-white">
        <ol className="container-wide flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 py-4 text-xs font-bold uppercase tracking-wide text-steel-500">
          <li>
            <Link href="/products" className="focus-ring hover:text-orange-500">Products</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/products/mobile-light-towers" className="focus-ring hover:text-orange-500">
              Mobile Light Towers
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-navy-900" aria-current="page">{tower.model}</li>
        </ol>
      </nav>

      <section className="overflow-hidden bg-navy-950 py-12 text-white sm:py-16 lg:py-20">
        <div className="container-wide grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] min-w-0 overflow-hidden bg-white sm:aspect-[16/11]">
              <Image
                src={tower.image}
                alt={tower.imageAlt}
                fill
                priority
                className="object-contain p-3 sm:p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="eyebrow before:bg-orange-500">Mobile Light Tower</div>
            <h1 className="mt-4 break-words font-display text-4xl font-700 uppercase leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {tower.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {tower.shortDescription}
            </p>
            <dl className="mt-8 grid min-w-0 grid-cols-2 gap-4">
              {tower.highlights.map((item) => (
                <div key={item.label} className="min-w-0 border-l-2 border-orange-500 pl-3 sm:pl-4">
                  <dt className="text-[10px] font-bold uppercase tracking-wide text-white/55 sm:text-xs">
                    {item.label}
                  </dt>
                  <dd className="mt-1 break-words font-mono text-sm font-600 text-white sm:text-base">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={quoteHref} className="btn-primary min-h-12">
                Request a Quote
              </Link>
              <Link href="/products/mobile-light-towers" className="btn-secondary min-h-12">
                View All Models
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-wide grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow="Product Overview" title={tower.model} />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base leading-8 text-steel-600 sm:text-lg">
              {tower.description}
            </p>
            <Link href={quoteHref} className="focus-ring mt-6 inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-wide text-orange-500 hover:text-orange-600">
              Discuss This Model <span aria-hidden className="ml-2">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="min-w-0 bg-paper py-20 sm:py-24">
        <div className="container-wide min-w-0">
          <Reveal>
            <SectionHeading
              eyebrow="Confirmed Product Data"
              title="Technical Specifications"
              description="Only confirmed model data is published. Dimensions are listed without assigning an unconfirmed transport or operating condition."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 min-w-0">
              <LightTowerSpecifications sections={tower.specificationSections} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Recommended Applications"
              title="Site Lighting Applications"
              description="Application suitability is assessed against the required lighting area, runtime, towing conditions, and site environment."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tower.applications.map((application, index) => (
              <Reveal key={application} delay={index * 70}>
                <div className="h-full border-l-4 border-orange-500 bg-paper p-5 font-display text-lg font-700 uppercase text-navy-900">
                  {application}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-center text-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight sm:text-4xl">
            Request a {tower.model} Quotation
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            Send your required quantity, destination, site conditions, and preferred lighting configuration for technical confirmation and quotation.
          </p>
          <Link href={quoteHref} className="btn-primary mt-8 min-h-12">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
