import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import LightTowerCard from "@/components/LightTowerCard";
import { lightTowers, site, lightTowerHero } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mobile Light Towers | Solar, Diesel & Hybrid",
  description:
    "Haode Power mobile light towers — solar, diesel, and hybrid models with 9m pneumatic masts for mining, construction, and emergency response lighting.",
  alternates: { canonical: "/products/mobile-light-towers" },
};

export default function LightTowersPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: lightTowers.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${site.name} ${t.name}`,
        description: t.description,
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
        eyebrow="Job Site Illumination"
        title="Mobile Light Towers"
        description="Towable, mast-mounted lighting systems built for night-shift construction, mining, and emergency response — powered by solar, diesel, or hybrid systems."
        image={lightTowerHero.image}
        imageAlt={lightTowerHero.alt}
      />

      <section className="border-b border-navy-900/10 bg-white py-16">
        <div className="container-wide grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { label: "Mast Height", value: "9 Meters" },
            { label: "Coverage Area", value: "5,000 m²" },
            { label: "Light Output", value: "Up to 4,000W" },
            { label: "Configurations", value: "Solar / Diesel / Hybrid" },
          ].map((f) => (
            <div key={f.label} className="border-l-2 border-orange-500 pl-4">
              <div className="font-mono text-xl font-600 text-navy-900 sm:text-2xl">{f.value}</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-steel-500">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Three Ways to Power Your Site"
              title="Solar, Diesel & Hybrid Models"
              description="Match your light tower to your site's fuel access, noise restrictions, and runtime requirements."
            />
          </Reveal>
          <div className="mt-12 space-y-8">
            {lightTowers.map((tower, i) => (
              <Reveal key={tower.slug} delay={i * 100}>
                <LightTowerCard tower={tower} />
                <ul className="mt-4 grid grid-cols-1 gap-2 border border-t-0 border-navy-900/10 bg-white p-6 sm:grid-cols-2">
                  {tower.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-steel-600">
                      <span className="mt-0.5 text-orange-500">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
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
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Power Source</th>
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Mast Height</th>
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Lighting</th>
                    <th className="px-5 py-4 font-display text-sm font-700 uppercase tracking-wide">Runtime</th>
                  </tr>
                </thead>
                <tbody>
                  {lightTowers.map((t) => (
                    <tr key={t.slug} className="spec-row border-t border-navy-900/10">
                      <td className="px-5 py-4 font-mono font-600 text-navy-900">{t.name}</td>
                      <td className="px-5 py-4 text-steel-600">{t.power}</td>
                      <td className="px-5 py-4 font-mono text-steel-600">{t.mastHeight}</td>
                      <td className="px-5 py-4 text-steel-600">{t.lighting}</td>
                      <td className="px-5 py-4 font-mono text-orange-600">{t.runtime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-center text-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight sm:text-4xl">
            Not Sure Which Model Fits Your Site?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Tell us your runtime needs, noise restrictions, and fuel access —
            we&apos;ll recommend the right configuration.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Talk to Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
