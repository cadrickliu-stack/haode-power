import Image from "next/image";
import Link from "next/link";
import type { Generator } from "@/lib/data";

export default function GeneratorCard({ gen }: { gen: Generator }) {
  return (
    <div className="group flex flex-col overflow-hidden border border-navy-900/10 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-900/10">
      <div className="relative h-52 overflow-hidden bg-navy-900">
        <Image
          src={gen.image}
          alt={`${gen.model} ${gen.kva} diesel generator set`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-0 top-0 bg-orange-500 px-4 py-1.5 font-mono text-sm font-600 text-white">
          {gen.kva}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-700 uppercase text-navy-900">{gen.model}</h3>
        <p className="mt-1 text-sm text-steel-600">{gen.useCase}</p>

        <dl className="mt-4 flex-1 space-y-2 border-t border-navy-900/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-steel-500">Prime Power</dt>
            <dd className="font-mono font-600 text-navy-900">{gen.kw}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-steel-500">Engine</dt>
            <dd className="font-mono font-600 text-navy-900">{gen.engine}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-steel-500">Fuel Tank</dt>
            <dd className="font-mono font-600 text-navy-900">{gen.fuelTankL}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-steel-500">Runtime</dt>
            <dd className="font-mono font-600 text-navy-900">{gen.runtimeHrs}</dd>
          </div>
        </dl>

        <Link
          href={`/contact?product=${encodeURIComponent(`Diesel Generator ${gen.kva}`)}`}
          className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-orange-500 hover:text-orange-600"
        >
          Request Quote
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
