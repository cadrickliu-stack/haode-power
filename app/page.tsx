import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import GeneratorCard from "@/components/GeneratorCard";
import LightTowerCard from "@/components/LightTowerCard";
import InquiryForm from "@/components/InquiryForm";
import { advantages, generators, industries, lightTowers, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Diesel Generators & Mobile Light Towers Manufacturer",
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featuredGenerators = [generators[1], generators[3], generators[4]];

  return (
    <>
      <Hero />

      {/* Company Advantages */}
      <section className="border-b border-navy-900/10 bg-white py-16">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="text-center lg:text-left">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center bg-navy-900 font-display text-lg font-700 text-orange-400 lg:mx-0 [clip-path:polygon(15%_0,100%_0,85%_100%,0_100%)]">
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
      <section className="bg-paper py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Our Product Range"
              title="Built for Continuous, Demanding Duty"
              description="Two core product lines, engineered together: prime and standby power generation, and mobile lighting for round-the-clock operations."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Reveal delay={80}>
              <Link href="/products/diesel-generators" className="group relative block h-[420px] overflow-hidden bg-navy-900">
                <Image
                  src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1400&auto=format&fit=crop"
                  alt="Diesel generator set on job site"
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="eyebrow before:bg-orange-500">20kVA – 1000kVA</div>
                  <h3 className="mt-2 font-display text-3xl font-700 uppercase text-white">
                    Diesel Generators
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-white/70">
                    Prime and standby generator sets for mining, construction, and industrial facilities.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange-400">
                    Explore Range <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={160}>
              <Link href="/products/mobile-light-towers" className="group relative block h-[420px] overflow-hidden bg-navy-900">
                <Image
                  src="https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1400&auto=format&fit=crop"
                  alt="Mobile light tower illuminating a night construction site"
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="eyebrow before:bg-orange-500">Solar / Diesel / Hybrid</div>
                  <h3 className="mt-2 font-display text-3xl font-700 uppercase text-white">
                    Mobile Light Towers
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-white/70">
                    Towable lighting systems for night shifts, emergency response, and remote sites.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange-400">
                    Explore Range <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Generators strip */}
      <section className="bg-white py-24">
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Diesel Generator Sets"
                title="Popular Models"
                description="A sample of our range — full lineup spans 20kVA to 1000kVA."
              />
              <Link href="/products/diesel-generators" className="btn-dark">
                View All Generators
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGenerators.map((gen, i) => (
              <Reveal key={gen.model} delay={i * 100}>
                <GeneratorCard gen={gen} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="bg-navy-900 py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Industries Served"
              title="Power for Every Site Condition"
              description="From dust and vibration on mine sites to grid-critical uptime for infrastructure projects."
              light
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 90}>
                <div className="group relative h-72 overflow-hidden">
                  <Image
                    src={ind.image}
                    alt={`${ind.name} industry power solutions`}
                    fill
                    className="object-cover opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-xl font-700 uppercase text-white">{ind.name}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70">{ind.description}</p>
                  </div>
                  <div className="absolute left-0 top-0 h-1 w-10 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Light Towers */}
      <section className="bg-paper py-24">
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Mobile Light Towers"
                title="Solar, Diesel & Hybrid"
                description="Choose the power source that fits your site — or let hybrid technology decide automatically."
              />
              <Link href="/products/mobile-light-towers" className="btn-dark">
                View All Light Towers
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

      {/* Why Choose Haode Power */}
      <section className="relative overflow-hidden bg-navy-900 py-24 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1800&auto=format&fit=crop"
            alt="Generator factory production line"
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
              <span className="text-orange-400"> Six Continents</span>
            </h2>
            <p className="mt-5 max-w-lg text-white/70">
              Haode Power combines in-house engine assembly, canopy
              fabrication, and full-load testing under one roof — giving
              buyers a single accountable source for equipment that has to
              start every time, in every climate.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                { value: "100%", label: "Full-Load Tested" },
                { value: "15–30", label: "Days Lead Time" },
                { value: "60+", label: "Countries Served" },
                { value: "24/7", label: "After-Sales Support" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-orange-500 pl-4">
                  <div className="font-mono text-2xl font-600 text-orange-400">{s.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1200&auto=format&fit=crop"
                  alt="Generator assembly line"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
                  alt="Quality testing of generator sets"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative h-40 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1518709414768-a88981a4515d?q=80&w=800&auto=format&fit=crop"
                  alt="Generator container packing for export"
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
      <section className="bg-white py-24">
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
            <div className="border border-navy-900/10 bg-paper p-8">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Information Banner */}
      <section className="bg-navy-950 py-16 text-white">
        <div className="container-wide grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-orange-400">Call Us</div>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="focus-ring mt-2 block font-display text-2xl font-700 text-white hover:text-orange-400">
              {site.phone}
            </a>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-orange-400">Email Us</div>
            <a href={`mailto:${site.email}`} className="focus-ring mt-2 block font-display text-2xl font-700 text-white hover:text-orange-400">
              {site.email}
            </a>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-orange-400">Factory Address</div>
            <p className="mt-2 font-display text-xl font-700 text-white">{site.address}</p>
          </div>
        </div>
      </section>
    </>
  );
}
