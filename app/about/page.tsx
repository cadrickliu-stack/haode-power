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
  { value: "30,000 m²", label: "Factory Floor Area" },
  { value: "200+", label: "Production Staff" },
  { value: "5,000", label: "Units / Year Capacity" },
  { value: "60+", label: "Export Countries" },
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
        title="Engineering Power Equipment Since Day One"
        description="A vertically integrated manufacturer of diesel generator sets and mobile light towers, built to keep mining, construction, and infrastructure projects running."
        image="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1800&auto=format&fit=crop"
      />

      {/* Company Introduction */}
      <section className="bg-white py-24">
        <div className="container-wide grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="eyebrow">Company Introduction</div>
            <h2 className="mt-3 font-display text-4xl font-700 uppercase leading-[1.05] tracking-tight text-navy-900 sm:text-5xl">
              A Single Accountable Source for Power Equipment
            </h2>
            <p className="mt-5 text-steel-600">
              Haode Power was founded to close the gap between generic
              generator trading companies and buyers who need equipment
              engineered for real job-site conditions. Every diesel generator
              set and mobile light tower we ship is designed, assembled, and
              tested in our own facility — not sourced piecemeal from
              subcontractors.
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
                src="https://images.unsplash.com/photo-1581093458791-9d42e3cd3f83?q=80&w=1200&auto=format&fit=crop"
                alt="Haode Power factory production floor"
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
              title="In-House Assembly, Start to Finish"
              description="From steel fabrication to final commissioning, our production process is designed for consistent, exportable quality at volume."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Fabrication",
                text: "Steel base frames, fuel tanks, and canopies laser-cut and welded in-house.",
              },
              {
                step: "02",
                title: "Assembly",
                text: "Engine, alternator, and control panel integration on dedicated assembly lines.",
              },
              {
                step: "03",
                title: "Testing",
                text: "Full-load bank testing, vibration checks, and burn-in runs before packing.",
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
                  src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop"
                  alt="Factory exterior and warehouse"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581093196277-9f6e9b96cc1e?q=80&w=800&auto=format&fit=crop"
                  alt="Generator sets ready for shipment"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
                  alt="Engineers inspecting generator components"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <div className="eyebrow">Factory Information</div>
            <h2 className="mt-3 font-display text-4xl font-700 uppercase leading-[1.05] tracking-tight text-navy-900 sm:text-5xl">
              30,000m² Production Facility
            </h2>
            <p className="mt-5 text-steel-600">
              Located in Changzhou City, Jiangsu Province — one of China&apos;s
              major power equipment manufacturing hubs — our facility houses
              fabrication, assembly, testing, and warehousing under one roof,
              with direct rail and port access for export shipments.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-steel-600">
              <li className="flex gap-3"><span className="mt-0.5 text-orange-500">✓</span><span>Dedicated engine test cells with load banks up to 1000kVA</span></li>
              <li className="flex gap-3"><span className="mt-0.5 text-orange-500">✓</span><span>In-house powder-coating and canopy fabrication line</span></li>
              <li className="flex gap-3"><span className="mt-0.5 text-orange-500">✓</span><span>Climate-controlled warehousing for finished-goods inventory</span></li>
              <li className="flex gap-3"><span className="mt-0.5 text-orange-500">✓</span><span>1 hour from Qingdao Port for container loading</span></li>
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
              title="Tested Before It Ever Leaves the Factory"
              description="Every unit is verified against international standards before shipment — not sample-checked, every unit."
              light
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Incoming Inspection", text: "Engines, alternators, and control panels verified against spec on arrival." },
              { title: "In-Process Checks", text: "Welding, wiring, and torque checks at each assembly stage." },
              { title: "Full-Load Testing", text: "Every unit run at 100% and 110% load for a minimum of 2 hours." },
              { title: "Pre-Shipment Report", text: "Test data, photos, and inspection report issued with every order." },
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
