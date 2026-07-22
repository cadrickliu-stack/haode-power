import Image from "next/image";
import Link from "next/link";
import type { LightTower } from "@/lib/data";

export default function LightTowerCard({ tower }: { tower: LightTower }) {
  return (
    <div className="group flex flex-col overflow-hidden border border-navy-900/10 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-900/10 md:flex-row">
      <div className="relative h-56 md:h-auto md:w-2/5">
        <Image
          src={tower.image}
          alt={tower.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-2xl font-700 uppercase text-navy-900">{tower.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-steel-600">{tower.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-navy-900/10 pt-4 text-xs">
          <div>
            <div className="font-bold uppercase tracking-wide text-steel-500">Power Source</div>
            <div className="mt-1 font-mono text-navy-900">{tower.power}</div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wide text-steel-500">Mast Height</div>
            <div className="mt-1 font-mono text-navy-900">{tower.mastHeight}</div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wide text-steel-500">Lighting</div>
            <div className="mt-1 font-mono text-navy-900">{tower.lighting}</div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wide text-steel-500">Runtime</div>
            <div className="mt-1 font-mono text-navy-900">{tower.runtime}</div>
          </div>
        </div>

        <Link
          href={`/contact?product=${encodeURIComponent(tower.name)}`}
          className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange-500 hover:text-orange-600"
        >
          Request Quote
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
