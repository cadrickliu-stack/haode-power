import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
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
            className="h-full w-full object-cover opacity-30"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
      </div>

      <div className="container-wide relative z-10 flex min-h-[640px] flex-col justify-center py-28 lg:py-36">
        <div className="max-w-3xl animate-fadeUp">
          <div className="eyebrow before:bg-orange-500">
            Diesel Generators &amp; Mobile Light Towers
          </div>
          <h1 className="mt-5 font-display text-5xl font-800 uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Reliable Power Solutions
            <span className="block text-orange-400">for Mining &amp; Construction</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Professional diesel generators and mobile light towers built for
            demanding environments — coordinated with experienced manufacturing
            partners and prepared for worldwide delivery.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Request Quote
            </Link>
            <Link href="/products" className="btn-secondary">
              View Products
            </Link>
          </div>
        </div>

        <div className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "60+", label: "Export Countries" },
            { value: "20–1000", label: "kVA Range" },
            { value: "24/7", label: "Technical Support" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-3xl font-600 text-orange-400">{stat.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
