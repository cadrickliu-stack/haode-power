import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import DieselBrandCard from "@/components/DieselBrandCard";
import LightTowerCard from "@/components/LightTowerCard";
import InquiryForm from "@/components/InquiryForm";
import { advantages, dieselGeneratorCategory, industries, lightTowerCategory, site } from "@/lib/data";
import { dieselGeneratorBrands } from "@/lib/diesel-generator-brands";
import { mobileLightTowers } from "@/lib/mobile-light-towers";
import styles from "./home.module.css";

const baseMetadata: Metadata = {
  title: "Diesel Generator & Mobile Light Tower Manufacturer",
  description:
    "Haode Power supplies diesel generator sets and mobile light towers for mining, construction, rental, and industrial projects, with model-specific product information and quotation support.",
  alternates: { canonical: "/" },
};

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizeNode((
    <>
      <Hero />

      {/* Company Advantages */}
      <section className={`${styles.section} border-b border-navy-900/10 bg-white py-16`}>
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="text-center lg:text-left">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center bg-[#E8F3FC] font-display text-lg font-700 text-orange-600 lg:mx-0 [clip-path:polygon(15%_0,100%_0,85%_100%,0_100%)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-lg font-700 uppercase leading-tight text-navy-900">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-steel-600">{a.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className={`${styles.section} bg-[#F3F8FD] py-24`}>
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Our Product Range"
              title="Diesel Generator Sets & Mobile Light Towers"
              description="Explore diesel generator sets by engine brand and mobile lighting tower models for mining, construction, rental, and industrial site operations."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Reveal delay={80}>
              <Link href="/products/diesel-generators" className="group relative block h-[420px] overflow-hidden border border-navy-900/10 bg-white">
                <Image
                  src={dieselGeneratorCategory.image}
                  alt={dieselGeneratorCategory.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className={`absolute inset-0 ${styles.imageScrim}`} />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="eyebrow before:bg-orange-500">Multi-Brand Series</div>
                  <h3 className="mt-2 font-display text-3xl font-700 uppercase text-[#173A60]">
                    Diesel Generators
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-[#3E566E]">
                    Diesel generator sets by established engine brand for mining, construction, and industrial power applications.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange-600">
                    Explore Range <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={160}>
              <Link href="/products/mobile-light-towers" className="group relative block h-[420px] overflow-hidden border border-navy-900/10 bg-white">
                <Image
                  src={lightTowerCategory.image}
                  alt={lightTowerCategory.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className={`absolute inset-0 ${styles.imageScrim}`} />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="eyebrow before:bg-orange-500">Five Mobile Lighting Models</div>
                  <h3 className="mt-2 font-display text-3xl font-700 uppercase text-[#173A60]">
                    Mobile Light Towers
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-[#3E566E]">
                    Towable lighting systems for night shifts, emergency response, and remote sites.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange-600">
                    Explore Range <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured diesel generator brand series */}
      <section className={`${styles.section} bg-white py-24`}>
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Diesel Generator Sets"
                title="Engine Brand Series"
                description="Start with four key engine brand series, then view the complete published range and its confirmed 50Hz references."
              />
              <Link href="/products/diesel-generators" className="btn-dark">
                View All Engine Brands
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {dieselGeneratorBrands.slice(0, 4).map((brand, i) => (
              <Reveal key={brand.slug} delay={i * 100}>
                <DieselBrandCard brand={brand} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className={`${styles.section} bg-[#E8F3FC] py-24`}>
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Industries Served"
              title="Power for Every Site Condition"
              description="From dust and vibration on mine sites to grid-critical uptime for infrastructure projects."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 90}>
                <div className="group relative h-72 overflow-hidden border border-navy-900/10 bg-white">
                  <Image
                    src={ind.image}
                    alt={`${ind.name} industry power solutions`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className={`absolute inset-0 ${styles.industryScrim}`} />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-xl font-700 uppercase text-[#173A60]">{ind.name}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#3E566E]">{ind.description}</p>
                  </div>
                  <div className="absolute left-0 top-0 h-1 w-10 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Light Towers */}
      <section className={`${styles.section} bg-[#F3F8FD] py-24`}>
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Mobile Light Towers"
                title="Mobile Lighting Models"
                description="Explore five towable lighting models with confirmed model specifications, including the 4TNVE600 solar light tower."
              />
              <Link href="/products/mobile-light-towers" className="btn-dark">
                View All Light Towers
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

      {/* Why Choose Haode Power */}
      <section className={`${styles.section} relative overflow-hidden bg-[#E8F3FC] py-24`}>
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/real/home/diesel-generator-production-line.webp"
            alt="Diesel generator production line at a manufacturing facility"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="container-wide relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="eyebrow before:bg-orange-500">Why Choose Haode Power</div>
            <h2 className="mt-3 font-display text-4xl font-700 uppercase leading-[1.05] tracking-tight sm:text-5xl">
              Engineering Trusted on
              <span className="text-orange-600"> Six Continents</span>
            </h2>
            <p className="mt-5 max-w-lg text-[#3E566E]">
              Haode Power coordinates engine selection, generator assembly,
              quality control, and delivery with experienced manufacturing
              partners — giving buyers one accountable contact from technical
              confirmation through shipment.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                { value: "100%", label: "Full-Load Tested" },
                { value: "15–30", label: "Days Lead Time" },
                { value: "60+", label: "Countries Served" },
                { value: "24/7", label: "After-Sales Support" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-orange-500 pl-4">
                  <div className="font-mono text-2xl font-600 text-orange-600">{s.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#3E566E]">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 h-56 overflow-hidden">
                <Image
                  src="/images/real/home/diesel-generator-assembly.webp"
                  alt="Diesel generator assembly at a manufacturing facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/images/real/home/generator-quality-control-testing.webp"
                  alt="Generator quality control and testing room"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/images/real/home/diesel-generators-ready-for-shipment.webp"
                  alt="Diesel generator sets ready for shipment"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Customer Inquiry Section */}
      <section className={`${styles.section} bg-white py-24`}>
        <div className="container-wide grid grid-cols-1 gap-16 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="eyebrow">Get In Touch</div>
            <h2 className="mt-3 font-display text-4xl font-700 uppercase leading-[1.05] tracking-tight text-navy-900">
              Request a Quotation
            </h2>
            <p className="mt-4 text-steel-600">
              Tell us your application, required capacity, and destination
              port. Our export team responds with technical specs and
              pricing within 24 hours.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-0.5 text-orange-500">✓</span>
                <span className="text-steel-600">Free technical consultation on generator sizing</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-orange-500">✓</span>
                <span className="text-steel-600">FOB / CIF pricing for any destination port</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-orange-500">✓</span>
                <span className="text-steel-600">OEM branding and custom configuration available</span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-3">
            <div className="border border-navy-900/10 bg-[#F3F8FD] p-8">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Information Banner */}
      <section className={`${styles.section} border-t border-navy-900/10 bg-[#E8F3FC] py-16`}>
        <div className="container-wide grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-orange-600">Call Us</div>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="focus-ring mt-2 block font-display text-2xl font-700 text-[#173A60] hover:text-orange-600">
              {site.phone}
            </a>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-orange-600">Email Us</div>
            <a href={`mailto:${site.email}`} className="focus-ring mt-2 block font-display text-2xl font-700 text-[#173A60] hover:text-orange-600">
              {site.email}
            </a>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-orange-600">Factory Address</div>
            <p className="mt-2 font-display text-xl font-700 text-[#3E566E]">{site.address}</p>
          </div>
        </div>
      </section>
    </>
  ), locale);
}



import { localizeNode } from "@/i18n/text";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  return localizeMetadata(baseMetadata, (await params).locale);
}

import { localizeMetadata } from "@/i18n/metadata";

import { setRequestLocale } from "next-intl/server";
