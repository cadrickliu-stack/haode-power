import React from "react";
import { GeneratorModel } from "@/lib/generator-brands-data";

interface GeneratorSpecificationTableProps {
  models: GeneratorModel[];
  brandName: string;
}

export default function GeneratorSpecificationTable({
  models,
  brandName,
}: GeneratorSpecificationTableProps) {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden my-8">
      <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-lg font-bold">
          {brandName} Specification Matrix
        </h3>
        <span className="text-xs text-slate-300">
          Showing {models.length} Model Configurations
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse min-w-[900px]">
          <thead className="bg-slate-100 text-slate-900 uppercase font-bold text-xs tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Model</th>
              <th className="py-3.5 px-4">Rated Power</th>
              <th className="py-3.5 px-4">Standby Power</th>
              <th className="py-3.5 px-4">Engine Model</th>
              <th className="py-3.5 px-4">Alternator</th>
              <th className="py-3.5 px-4">Controller</th>
              <th className="py-3.5 px-4">Freq / Volt</th>
              <th className="py-3.5 px-4">Fuel Cons.</th>
              <th className="py-3.5 px-4">Cooling</th>
              <th className="py-3.5 px-4">Dimension (mm)</th>
              <th className="py-3.5 px-4">Weight (kg)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {models.map((item, index) => (
              <tr
                key={item.model}
                className={index % 2 === 0 ? "bg-white hover:bg-amber-50/50" : "bg-slate-50/50 hover:bg-amber-50/50"}
              >
                <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                  {item.model}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {item.ratedPowerKw} kW / {item.ratedPowerKva} kVA
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {item.standbyPowerKw} kW / {item.standbyPowerKva} kVA
                </td>
                <td className="py-3 px-4 font-medium text-slate-800 whitespace-nowrap">
                  {item.engineModel}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">{item.alternator}</td>
                <td className="py-3 px-4 whitespace-nowrap">{item.controller}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {item.frequency} / {item.voltage}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {item.fuelConsumption}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {item.coolingSystem}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">{item.dimension}</td>
                <td className="py-3 px-4 whitespace-nowrap font-medium">
                  {item.weight}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
        * Specifications subject to custom enclosure, soundproofing, ATS, or trailer options engineered by Haode Power.
      </div>
    </div>
  );
}