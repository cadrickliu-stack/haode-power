import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import LightTowerCard from "@/components/LightTowerCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site, lightTowerHero } from "@/lib/data";
import { mobileLightTowers } from "@/lib/mobile-light-towers";

const baseMetadata: Metadata = {
  title: "Mobile Light Towers | Diesel, LED & Solar Models",
  description:
    "Explore diesel, LED, heavy-duty mining, and solar mobile light towers for construction, rental, roadwork, and industrial site lighting.",
  alternates: { canonical: "/products/mobile-light-towers" },
  openGraph: {
    title: "Mobile Light Towers | Diesel, LED & Solar Models",
    description: "Compare five towable mobile lighting tower models for construction, mining support, roadwork and rental use.",
    url: "/products/mobile-light-towers",
    images: [{ url: lightTowerHero.image, alt: lightTowerHero.alt }],
  },
};

// Keep this English-only SEO update separate from the existing translated copy.
const englishTitle = "Mobile Light Tower Manufacturer | Diesel & Solar | HAODE";
const englishDescription = "Explore HAODE POWER diesel and solar mobile light towers for mining, construction and roadwork. Compare LED lighting, mast options and models. Request a quote.";

export default async function LightTowersPage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: mobileLightTowers.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: text(t.title, locale),
      url: `${site.url}${localizedPath(`/products/mobile-light-towers/${t.slug}`, locale)}`,
    })),
  };

  return localizeNode((
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Mobile Light Towers", href: "/products/mobile-light-towers" },
        ]}
      />

      <PageHero
        eyebrow="Job Site Illumination"
        title={locale === "en" ? "Mobile Light Towers for Mining & Construction" : "Mobile Light Towers"}
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

      {locale !== "en" && <section className="bg-paper py-24">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Selection Guide"
              title="Choose a Mobile Lighting Tower for the Site"
              description="The useful comparison is not only lamp power. Mast operation, runtime, towing layout and available power source also affect day-to-day use."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-sm leading-relaxed text-steel-600">
              <div className="border-l-4 border-orange-500 bg-white p-6">
                <h2 className="font-display text-xl font-700 uppercase text-navy-900">Diesel Light Towers</h2>
                <p className="mt-2">BMA4000, BMN4000, BMNVH1600 and 4HVP1600M use diesel power and offer confirmed metal-halide or LED configurations. Compare mast height, lifting method, tank capacity and runtime on each model page.</p>
              </div>
              <div className="border-l-4 border-orange-500 bg-white p-6">
                <h2 className="font-display text-xl font-700 uppercase text-navy-900">Solar LED Light Tower</h2>
                <p className="mt-2">The 4TNVE600 combines monocrystalline solar panels, GEL batteries and four LED lamps for sites where solar-and-battery operation fits the lighting plan.</p>
              </div>
              <div className="border-l-4 border-orange-500 bg-white p-6">
                <h2 className="font-display text-xl font-700 uppercase text-navy-900">Mining & Heavy-Duty Mast Operation</h2>
                <p className="mt-2">For projects prioritizing mast control, the 4HVP1600M provides a confirmed hydraulic eight-section mast with electric light tilt. Final suitability still depends on the site and towing conditions.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>}

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

      {locale === "en" && (
        <>
        <section className="bg-paper py-24">
          <div className="container-wide grid gap-6 lg:grid-cols-2">
            <div className="border-l-4 border-orange-500 bg-white p-6 text-sm leading-relaxed text-steel-600">
              <h2 className="font-display text-xl font-700 uppercase text-navy-900">Mobile Lighting Towers for Mining</h2>
              <p className="mt-2">For projects prioritizing mast control, the 4HVP1600M provides a confirmed hydraulic eight-section mast with electric light tilt. Final suitability still depends on the site and towing conditions.</p>
              <p className="mt-3">For mine work areas and access routes, assess ground conditions and relocation frequency. Check the <Link href="/products/mobile-light-towers/4hvp1600m" className="focus-ring font-semibold text-orange-600 underline underline-offset-4">4HVP1600M mast and trailer details</Link> against site requirements; mast features alone do not establish approval for a particular mine environment.</p>
            </div>
            <div className="border-l-4 border-orange-500 bg-white p-6 text-sm leading-relaxed text-steel-600">
              <h2 className="font-display text-xl font-700 uppercase text-navy-900">Mobile Light Towers for Construction and Roadwork</h2>
              <p className="mt-2">Construction and roadwork lighting plans need to account for changing work zones, equipment movement and nearby traffic. Compare the <Link href="/products/mobile-light-towers/bma4000" className="focus-ring font-semibold text-orange-600 underline underline-offset-4">BMA4000</Link>, <Link href="/products/mobile-light-towers/bmn4000" className="focus-ring font-semibold text-orange-600 underline underline-offset-4">BMN4000</Link> and <Link href="/products/mobile-light-towers/bmnvh1600" className="focus-ring font-semibold text-orange-600 underline underline-offset-4">BMNVH1600</Link> for your work schedule.</p>
              <p className="mt-3">Plan tower placement, glare control and access for refuelling before deployment. Confirm local towing rules and project lighting requirements rather than assuming one configuration suits every road or building site.</p>
            </div>
          </div>
        </section>
        <section className="bg-white py-24">
          <div className="container-wide">
            <SectionHeading eyebrow="Selection Guide" title="How to Choose the Right Mobile Light Tower" description="The useful comparison is not only lamp power. Mast operation, runtime, towing layout and available power source also affect day-to-day use." />
            <div className="mt-10 grid gap-6 text-sm leading-relaxed text-steel-600 lg:grid-cols-2">
              <div className="border-l-4 border-orange-500 bg-paper p-6">
                <h2 className="font-display text-xl font-700 uppercase text-navy-900">Diesel Mobile Light Towers</h2>
                <p className="mt-2">BMA4000, BMN4000, BMNVH1600 and 4HVP1600M use diesel power and offer confirmed metal-halide or LED configurations. Compare mast height, lifting method, tank capacity and runtime on each model page.</p>
                <p className="mt-3">Diesel operation can suit sites without a permanent electrical supply where fuel and maintenance access are available. Match the selected configuration to the shift length and how often the tower needs to move.</p>
              </div>
              <div className="border-l-4 border-orange-500 bg-paper p-6">
                <h2 className="font-display text-xl font-700 uppercase text-navy-900">Solar LED Mobile Lighting Towers</h2>
                <p className="mt-2">The 4TNVE600 combines monocrystalline solar panels, GEL batteries and four LED lamps for sites where solar-and-battery operation fits the lighting plan.</p>
                <p className="mt-3">Assess local sunlight, seasonal weather and required nightly operating hours. Published runtime is a model reference, not a guarantee for every location. Review the <Link href="/products/mobile-light-towers/4tnve600" className="focus-ring font-semibold text-orange-600 underline underline-offset-4">4TNVE600 solar and battery specifications</Link> before choosing this power source.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-paper py-24">
          <div className="container-wide">
            <SectionHeading eyebrow="Buyer Checklist" title="Prepare Your Mobile Light Tower Enquiry" description="Once you have shortlisted a model, gather these details for a clear specification review and quotation." />
            <ol className="mt-10 grid gap-6 text-sm leading-relaxed text-steel-600 md:grid-cols-2">
              {[
                ["Model and quantity", "List your shortlisted model, preferred lighting configuration and number of units. If you are still comparing models, identify the options you would like quoted."],
                ["Project brief", "Provide the work-area layout, required illumination, operating schedule and any site restrictions so the proposed configuration can be reviewed."],
                ["Delivery destination", "Specify the destination country and delivery location or port, together with any transport or documentation requirements."],
                ["Quotation review", "Ask for the offered configuration and commercial terms in writing. Confirm any outstanding technical questions before placing an order."],
              ].map(([heading, description], index) => (
                <li key={heading} className="border-l-4 border-orange-500 bg-white p-6">
                  <h3 className="font-display text-xl font-700 uppercase text-navy-900">{index + 1}. {heading}</h3>
                  <p className="mt-2">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        </>
      )}

      <section className="bg-navy-900 py-16 text-center text-white">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight sm:text-4xl">
            {locale === "en" ? "Request a Mobile Light Tower Quotation" : "Not Sure Which Model Fits Your Site?"}
          </h2>
          {locale === "en" && <p className="mt-4 font-semibold">Not Sure Which Model Fits Your Site?</p>}
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Tell us your runtime needs, noise restrictions, and fuel access —
            we&apos;ll recommend the right configuration.
          </p>
          {locale === "en" && <p className="mx-auto mt-4 max-w-2xl text-white/70">Send your preferred model or application, quantity, destination and required lighting schedule. Include any mast, transport or power-source requirements so our team can discuss a suitable configuration and prepare a project-specific quotation.</p>}
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Talk to Our Team
          </Link>
          {locale === "en" && (
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="focus-ring mx-3 mt-4 inline-flex min-h-12 items-center justify-center border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">
              Discuss Your Project on WhatsApp
            </a>
          )}
        </div>
      </section>
    </>
  ), locale);
}



import { localizeNode, text, localizedPath } from "@/i18n/text";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = localizeMetadata(baseMetadata, locale);
  if (locale !== "en") return metadata;
  return {
    ...metadata,
    title: { absolute: englishTitle },
    description: englishDescription,
    openGraph: { ...metadata.openGraph, title: englishTitle, description: englishDescription },
    twitter: { ...metadata.twitter, title: englishTitle, description: englishDescription },
  };
}

import { localizeMetadata } from "@/i18n/metadata";

import { setRequestLocale } from "next-intl/server";
