import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2000&auto=format&fit=crop"
          alt="Diesel generator set operating on a mining site at dusk"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
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
            demanding environments — engineered in-house, tested at full load,
            and exported worldwide.
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
