import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import LightTowerCard from "@/components/LightTowerCard";
import { site, lightTowerHero } from "@/lib/data";
import { mobileLightTowers } from "@/lib/mobile-light-towers";

export const metadata: Metadata = {
  title: "Mobile Light Towers | Diesel, LED & Solar Models",
  description:
    "Explore diesel, LED, heavy-duty mining, and solar mobile light towers for construction, rental, roadwork, and industrial site lighting.",
  alternates: { canonical: "/products/mobile-light-towers" },
};

export default function LightTowersPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: mobileLightTowers.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.title,
      url: `${site.url}/products/mobile-light-towers/${t.slug}`,
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
        description="Mobile lighting towers for construction, mining, rental, roadwork, and industrial sites, including diesel light tower, LED, hydraulic-mast, and solar-powered options."
        image={lightTowerHero.image}
        imageAlt={lightTowerHero.alt}
      />

      <section className="border-b border-navy-900/10 bg-white py-16">
        <div className="container-wide grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { label: "Product Range", value: "5 Models" },
            { label: "Solar Model", value: "4TNVE600" },
            { label: "Specifications", value: "Model Specific" },
            { label: "Configuration", value: "Sales Support" },
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
              eyebrow="Current Product Range"
              title="Diesel, LED & Solar Mobile Lighting Towers"
              description="Review five mobile light tower models, from compact diesel light towers to a heavy-duty hydraulic mining light tower and a solar LED light tower."
            />
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

      <section className="bg-white py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Product Overview"
              title="Compare Models"
              description="Compare confirmed power source, mast height, lighting, runtime, and weight across the five current models."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 hidden overflow-hidden border border-navy-900/10 lg:block">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-4 py-4 font-display text-sm font-700 uppercase tracking-wide">Model</th>
                    <th className="px-4 py-4 font-display text-sm font-700 uppercase tracking-wide">Power Source</th>
                    <th className="px-4 py-4 font-display text-sm font-700 uppercase tracking-wide">Mast Height</th>
                    <th className="w-1/4 px-4 py-4 font-display text-sm font-700 uppercase tracking-wide">Lighting</th>
                    <th className="px-4 py-4 font-display text-sm font-700 uppercase tracking-wide">Runtime</th>
                    <th className="px-4 py-4 font-display text-sm font-700 uppercase tracking-wide">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {mobileLightTowers.map((t) => (
                    <tr key={t.slug} className="spec-row border-t border-navy-900/10">
                      <td className="px-4 py-4 font-mono font-600 text-navy-900">
                        <Link href={`/products/mobile-light-towers/${t.slug}`} className="focus-ring hover:text-orange-500">
                          {t.model}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-steel-600">{t.powerSource}</td>
                      <td className="px-4 py-4 font-mono text-steel-600">{t.mastHeight}</td>
                      <td className="break-words px-4 py-4 text-steel-600">{t.lighting}</td>
                      <td className="px-4 py-4 font-mono text-orange-600">{t.runtime}</td>
                      <td className="px-4 py-4 font-mono text-steel-600">{t.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {mobileLightTowers.map((tower) => (
                <article key={tower.slug} className="min-w-0 border border-navy-900/10 bg-paper p-5">
                  <h3 className="font-display text-xl font-700 uppercase text-navy-900">
                    <Link href={`/products/mobile-light-towers/${tower.slug}`} className="focus-ring hover:text-orange-500">
                      {tower.model}
                    </Link>
                  </h3>
                  <dl className="mt-4 grid min-w-0 grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    {[
                      { label: "Power Source", value: tower.powerSource },
                      { label: "Mast Height", value: tower.mastHeight },
                      { label: "Lighting", value: tower.lighting },
                      { label: "Runtime", value: tower.runtime },
                      { label: "Weight", value: tower.weight },
                    ].map((item) => (
                      <div key={item.label} className="min-w-0">
                        <dt className="text-[10px] font-bold uppercase tracking-wide text-steel-500">{item.label}</dt>
                        <dd className="mt-1 break-words font-mono text-navy-900">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link href={`/products/mobile-light-towers/${tower.slug}`} className="focus-ring mt-5 inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-wide text-orange-500">
                    View Details <span aria-hidden className="ml-2">→</span>
                  </Link>
                </article>
              ))}
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
