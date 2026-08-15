import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Haode Power's manufacturing capability, factory, quality control process, and global export markets for diesel generators and light towers.",
  alternates: { canonical: "/about" },
};

const capabilities = [
  { value: "Multi-Brand", label: "Engine Options" },
  { value: "Production", label: "Partner Facilities" },
  { value: "Quality", label: "Testing Support" },
  { value: "Worldwide", label: "Delivery Support" },
];

const marketRegions = [
  { region: "Africa", detail: "Nigeria, Kenya, South Africa, Ghana, Tanzania" },
  { region: "Middle East", detail: "UAE, Saudi Arabia, Iraq, Qatar, Oman" },
  { region: "Southeast Asia", detail: "Philippines, Indonesia, Vietnam, Malaysia" },
  { region: "Latin America", detail: "Peru, Chile, Colombia, Mexico" },
  { region: "Central Asia", detail: "Kazakhstan, Uzbekistan, Mongolia" },
  { region: "Oceania", detail: "Papua New Guinea, Fiji" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Haode Power"
        title="Coordinating Reliable Power Solutions"
        description="Diesel generator sets and mobile light towers supplied through experienced manufacturing partners for mining, construction, and infrastructure applications."
        image="/images/real/about/generator-metal-processing-workshop.webp"
        imageAlt="Metal processing workshop at a manufacturing partner facility"
      />

      {/* Company Introduction */}
      <section className="bg-white py-24">
        <div className="container-wide grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="eyebrow">Company Introduction</div>
            <h2 className="mt-3 font-display text-4xl font-700 uppercase leading-[1.05] tracking-tight text-navy-900 sm:text-5xl">
              One Accountable Contact for Power Equipment
            </h2>
            <p className="mt-5 text-steel-600">
              Haode Power supports buyers who need equipment selected and
              configured for real job-site conditions. We coordinate product
              selection, assembly requirements, quality checks, and delivery
              with experienced manufacturing partners.
            </p>
            <p className="mt-4 text-steel-600">
              Today, our equipment operates on mine sites, construction
              projects, oil and gas fields, and government infrastructure
              programs across more than 60 countries, supported by a
              dedicated export sales and after-sales technical team.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {capabilities.map((c) => (
                <div key={c.label} className="border-l-2 border-orange-500 pl-3">
                  <div className="font-mono text-xl font-600 text-navy-900">{c.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-steel-500">{c.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative h-[420px] overflow-hidden">
              <Image
                src="/images/real/home/diesel-generator-assembly.webp"
                alt="Diesel generator assembly at a manufacturing facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Manufacturing Capability */}
      <section className="bg-paper py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Manufacturing Capability"
              title="Coordinated Production, Start to Finish"
              description="From steel fabrication to final inspection, production is coordinated with manufacturing partners for consistent export-ready equipment."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Fabrication",
                text: "Steel base frames, fuel tanks, and canopies fabricated to the agreed project specification.",
              },
              {
                step: "02",
                title: "Assembly",
                text: "Engine, alternator, and control panel integration coordinated on production lines.",
              },
              {
                step: "03",
                title: "Testing",
                text: "Testing and inspection arranged according to the confirmed order requirements.",
              },
              {
                step: "04",
                title: "Export Packing",
                text: "Container-optimized crating with moisture protection for ocean freight.",
              },
            ].map((s) => (
              <Reveal key={s.step} delay={parseInt(s.step) * 80}>
                <div className="h-full border border-navy-900/10 bg-white p-6">
                  <div className="font-mono text-3xl font-600 text-orange-500">{s.step}</div>
                  <h3 className="mt-3 font-display text-xl font-700 uppercase text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Information */}
      <section className="bg-white py-24">
        <div className="container-wide grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 h-52 overflow-hidden">
                <Image
                  src="/images/real/about/generator-frame-metal-fabrication.webp"
                  alt="Generator frame metal fabrication at a manufacturing partner facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/images/real/about/generator-spare-parts-warehouse.webp"
                  alt="Generator spare parts warehouse inventory"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="/images/real/about/generator-quality-control-room.webp"
                  alt="Generator quality control and inspection room"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <div className="eyebrow">Manufacturing Partners</div>
            <h2 className="mt-3 font-display text-4xl font-700 uppercase leading-[1.05] tracking-tight text-navy-900 sm:text-5xl">
              Production &amp; Assembly Capability
            </h2>
            <p className="mt-5 text-steel-600">
              Haode Power works with experienced manufacturing partners to
              coordinate fabrication, assembly, testing, warehousing, and
              export preparation according to each confirmed order.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-steel-600">
              <li className="flex gap-3"><span className="mt-0.5 text-orange-500">✓</span><span>Multi-brand engine and alternator configuration support</span></li>
              <li className="flex gap-3"><span className="mt-0.5 text-orange-500">✓</span><span>Fabrication and assembly coordinated to order requirements</span></li>
              <li className="flex gap-3"><span className="mt-0.5 text-orange-500">✓</span><span>Quality control and testing documentation support</span></li>
              <li className="flex gap-3"><span className="mt-0.5 text-orange-500">✓</span><span>Export packing and delivery coordination</span></li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Quality Control */}
      <section className="bg-navy-900 py-24 text-white">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Quality Control"
              title="Quality Checks Before Shipment"
              description="Inspection and testing requirements are confirmed with each order and coordinated before shipment."
              light
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Component Check", text: "Key engines, alternators, and control components checked against the confirmed specification." },
              { title: "Assembly Inspection", text: "Assembly details reviewed during the coordinated production process." },
              { title: "Load Testing", text: "Load testing arranged according to the technical and order requirements." },
              { title: "Pre-Shipment Review", text: "Available test data, photos, and inspection records reviewed before shipment." },
            ].map((q, i) => (
              <Reveal key={q.title} delay={i * 90}>
                <div className="border border-white/10 bg-white/5 p-6">
                  <div className="mb-3 h-1 w-10 bg-orange-500" />
                  <h3 className="font-display text-lg font-700 uppercase text-white">{q.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{q.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Export Markets */}
      <section className="bg-paper py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Export Markets"
              title="Serving Buyers on Six Continents"
              description="Our equipment is deployed across mining, construction, and infrastructure projects worldwide."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketRegions.map((m, i) => (
              <Reveal key={m.region} delay={i * 80}>
                <div className="border border-navy-900/10 bg-white p-6">
                  <h3 className="font-display text-xl font-700 uppercase text-navy-900">{m.region}</h3>
                  <p className="mt-2 text-sm text-steel-600">{m.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-center">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight text-navy-900 sm:text-4xl">
            Ready to Work With Haode Power?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-steel-600">
            Reach out for a factory catalogue, price list, or a call with our
            export sales team.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
