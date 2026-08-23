import Image from "next/image";
import Link from "next/link";
import type { DieselGeneratorBrand } from "@/lib/diesel-generator-brands";

export default function DieselBrandCard({
  brand,
}: {
  brand: DieselGeneratorBrand;
}) {
  return (
    <article className="group overflow-hidden border border-navy-900/10 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-900/10">
      <Link
        href={`/products/diesel-generators/${brand.slug}`}
        className="focus-ring block"
        aria-label={`View ${brand.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
          <Image
            src={brand.image}
            alt={brand.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 bg-orange-500 px-4 py-2 font-display text-sm font-700 uppercase tracking-wide text-white">
            Available Series
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <div className="eyebrow">Engine Brand</div>
          <h3 className="mt-3 font-display text-3xl font-700 uppercase text-navy-900">
            {brand.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-steel-600">
            {brand.shortDescription}
          </p>
          <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-navy-900/10 pt-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-steel-500">
                Power Reference
              </dt>
              <dd className="mt-1 font-mono font-600 text-navy-900">
                {brand.powerRange}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-steel-500">
                Frequency
              </dt>
              <dd className="mt-1 font-mono font-600 text-navy-900">
                {brand.frequencySummary}
              </dd>
            </div>
          </dl>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange-500">
            View Series <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
