import type { GeneratorSeriesGroup } from "@/lib/diesel-generator-brands";

function formatOutput(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

export default function GeneratorSpecificationTable({
  groups,
}: {
  groups: GeneratorSeriesGroup[];
}) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.name} aria-labelledby={`${group.name.replace(/\s+/g, "-").toLowerCase()}-heading`}>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <h3
              id={`${group.name.replace(/\s+/g, "-").toLowerCase()}-heading`}
              className="font-display text-2xl font-700 uppercase text-navy-900 sm:text-3xl"
            >
              {group.name}
            </h3>
            <span className="font-mono text-xs font-600 uppercase tracking-wide text-steel-500">
              {group.models.length} engine/output combinations
            </span>
          </div>

          <div className="hidden overflow-hidden border border-navy-900/10 md:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                50Hz output reference for {group.name}
              </caption>
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th scope="col" className="px-5 py-4 font-display font-700 uppercase tracking-wide">
                    Engine Model
                  </th>
                  <th scope="col" className="px-5 py-4 font-display font-700 uppercase tracking-wide">
                    Output kW
                  </th>
                  <th scope="col" className="px-5 py-4 font-display font-700 uppercase tracking-wide">
                    Output kVA
                  </th>
                  <th scope="col" className="px-5 py-4 font-display font-700 uppercase tracking-wide">
                    Cylinders
                  </th>
                  <th scope="col" className="px-5 py-4 font-display font-700 uppercase tracking-wide">
                    Bore × Stroke (mm)
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.models.map((model, index) => (
                  <tr
                    key={`${model.engineModel}-${model.outputKw}-${index}`}
                    className="spec-row border-t border-navy-900/10"
                  >
                    <th scope="row" className="px-5 py-4 font-mono font-600 text-navy-900">
                      {model.engineModel}
                    </th>
                    <td className="px-5 py-4 font-mono text-steel-600">
                      {formatOutput(model.outputKw)}
                    </td>
                    <td className="px-5 py-4 font-mono font-600 text-orange-600">
                      {formatOutput(model.outputKva)}
                    </td>
                    <td className="px-5 py-4 font-mono text-steel-600">{model.cylinders}</td>
                    <td className="px-5 py-4 font-mono text-steel-600">{model.boreStrokeMm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {group.models.map((model, index) => (
              <details
                key={`${model.engineModel}-${model.outputKw}-${index}`}
                className="group border border-navy-900/10 bg-white"
              >
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none">
                  <span>
                    <span className="block font-mono font-600 text-navy-900">
                      {model.engineModel}
                    </span>
                    <span className="mt-1 block text-xs text-steel-500">
                      {formatOutput(model.outputKw)} kW / {formatOutput(model.outputKva)} kVA
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center bg-navy-900 text-lg text-white transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-navy-900/10 bg-paper px-4 py-4 text-sm">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-steel-500">Output</dt>
                    <dd className="mt-1 font-mono text-navy-900">
                      {formatOutput(model.outputKw)} kW
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-steel-500">Output</dt>
                    <dd className="mt-1 font-mono text-orange-600">
                      {formatOutput(model.outputKva)} kVA
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-steel-500">Cylinders</dt>
                    <dd className="mt-1 font-mono text-navy-900">{model.cylinders}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-steel-500">Bore × Stroke</dt>
                    <dd className="mt-1 font-mono text-navy-900">{model.boreStrokeMm} mm</dd>
                  </div>
                </dl>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
