import Image from "next/image";
import Link from "next/link";
import type { MobileLightTower } from "@/lib/mobile-light-towers";

export default function LightTowerCard({
  tower,
}: {
  tower: MobileLightTower;
}) {
  const detailHref = `/products/mobile-light-towers/${tower.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden border border-navy-900/10 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-900/10 md:flex-row">
      <Link
        href={detailHref}
        className="focus-ring relative h-72 bg-[#f4f6f8] md:h-auto md:w-2/5"
        aria-label={`View ${tower.title}`}
      >
        <Image
          src={tower.image}
          alt={tower.imageAlt}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02] sm:p-5"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-2xl font-700 uppercase text-navy-900">
          <Link href={detailHref} className="focus-ring hover:text-orange-500">
            {tower.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-steel-600">
          {tower.shortDescription}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-navy-900/10 pt-4 text-xs">
          <div>
            <dt className="font-bold uppercase tracking-wide text-steel-500">Power Source</dt>
            <dd className="mt-1 font-mono text-navy-900">{tower.powerSource}</dd>
          </div>
          <div>
            <dt className="font-bold uppercase tracking-wide text-steel-500">Mast Height</dt>
            <dd className="mt-1 font-mono text-navy-900">{tower.mastHeight}</dd>
          </div>
          <div>
            <dt className="font-bold uppercase tracking-wide text-steel-500">Lighting</dt>
            <dd className="mt-1 font-mono text-navy-900">{tower.lighting}</dd>
          </div>
          <div>
            <dt className="font-bold uppercase tracking-wide text-steel-500">Runtime</dt>
            <dd className="mt-1 font-mono text-orange-600">{tower.runtime}</dd>
          </div>
        </dl>

        <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-steel-600 sm:grid-cols-2">
          {tower.cardFeatures.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="text-orange-500" aria-hidden>✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={detailHref} className="btn-dark">
            View Model
          </Link>
          <Link
            href={`/contact?product=${encodeURIComponent(tower.name)}`}
            className="focus-ring inline-flex min-h-11 items-center justify-center px-3 text-sm font-bold uppercase tracking-wide text-orange-500 hover:text-orange-600"
          >
            Request Quote <span aria-hidden className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
