import { Link } from "@/i18n/navigation";

export default function Hero() {
  const locale = useLocale();
  return localizeNode((
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F3FC] to-[#B8D9F2]">
      <div className="absolute inset-0">
        {/* Pre-optimized art direction: each viewport downloads only its matching WebP. */}
        <picture className="block h-full w-full">
          <source
            media="(max-width: 767px)"
            srcSet="/images/real/home/cummins-diesel-generator-series-hero-mobile.webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/real/home/cummins-diesel-generator-series-hero-desktop.webp"
            alt="Cummins diesel generator series in a production facility"
            width={1920}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-[0.85]"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(232,243,252,0.97)_0%,rgba(232,243,252,0.91)_45%,rgba(184,217,242,0.6)_100%)] md:bg-[linear-gradient(90deg,#E8F3FC_0%,rgba(232,243,252,0.97)_30%,rgba(232,243,252,0.86)_52%,rgba(184,217,242,0.24)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#B8D9F2]/40 via-transparent to-transparent" />
      </div>

      <div className="container-wide relative z-10 flex min-h-[640px] flex-col justify-center py-28 lg:py-36">
        <div className="max-w-3xl animate-fadeUp">
          <div className="eyebrow !text-[#A9440D] before:bg-orange-500">
            Diesel Generators &amp; Mobile Light Towers
          </div>
          <h1 className="mt-5 font-display text-5xl font-800 uppercase leading-[0.98] tracking-tight text-[#173A60] sm:text-6xl lg:text-7xl">
            Reliable Power Solutions
            <span className="block text-[#B94B10]">for Mining &amp; Construction</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3E566E]">
            Professional diesel generators and mobile light towers built for
            demanding environments — coordinated with experienced manufacturing
            partners and prepared for worldwide delivery.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Request Quote
            </Link>
            <Link href="/products" className="btn-secondary !border-[#173A60]/40 !bg-white/70 !text-[#173A60] hover:!border-[#173A60] hover:!bg-white">
              View Products
            </Link>
          </div>
        </div>

        <div className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-[#173A60]/20 pt-8 sm:grid-cols-4">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "60+", label: "Export Countries" },
            { value: "8", label: "Published Brands" },
            { value: "24/7", label: "Technical Support" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-3xl font-600 text-[#A9440D]">{stat.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#3E566E]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ), locale);
}

import { useLocale } from "next-intl";

import { localizeNode } from "@/i18n/text";
