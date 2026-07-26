import React from "react";
import Link from "next/link";
import { GeneratorBrand } from "@/lib/generator-brands-data";

interface GeneratorBrandCardProps {
  brand: GeneratorBrand;
}

export default function GeneratorBrandCard({ brand }: GeneratorBrandCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">{brand.name}</h2>
          <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
            {brand.models.length} Models
          </span>
        </div>

        <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {brand.companyIntroduction}
        </p>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Power Range
          </span>
          <span className="text-sm font-semibold text-amber-600">
            {brand.powerRange}
          </span>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Target Application Fields
          </span>
          <ul className="text-xs text-slate-600 space-y-1">
            {brand.applicationFields.slice(0, 3).map((field, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                <span>{field}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
        <Link
          href={`/generator-brands/${brand.slug}`}
          className="w-full inline-flex items-center justify-center text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg px-4 py-2 transition-colors"
        >
          View Models & Specifications →
        </Link>
      </div>
    </div>
  );
}