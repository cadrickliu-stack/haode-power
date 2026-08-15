import type {
  GeneratorSeriesGroup,
  GeneratorSpecificationColumn,
} from "@/lib/diesel-generator-brands";

function columnHeading(column: GeneratorSpecificationColumn) {
  return column.unit ? `${column.label} (${column.unit})` : column.label;
}

export default function GeneratorSpecificationTable({
  groups,
}: {
  groups: GeneratorSeriesGroup[];
}) {
  return (
    <div className="space-y-12">
      {groups.map((group) => {
        const headingId = `${group.name.replace(/\s+/g, "-").toLowerCase()}-heading`;

        return (
          <section key={group.name} aria-labelledby={headingId}>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <h3
                id={headingId}
                className="font-display text-2xl font-700 uppercase text-navy-900 sm:text-3xl"
              >
                {group.name}
              </h3>
              <span className="font-mono text-xs font-600 uppercase tracking-wide text-steel-500">
                {group.models.length} product records
              </span>
            </div>

            <div className="hidden max-w-full overflow-x-auto border border-navy-900/10 md:block">
              <table className="min-w-max border-collapse text-left text-sm">
                <caption className="sr-only">
                  Supplied technical specification records for {group.name}
                </caption>
                <thead>
                  <tr className="bg-navy-900 text-white">
                    {group.columns.map((column) => (
                      <th
                        key={column.key}
                        scope="col"
                        className="whitespace-nowrap px-4 py-4 font-display font-700 uppercase tracking-wide"
                      >
                        {columnHeading(column)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {group.models.map((model, index) => (
                    <tr
                      key={`${model.type}-${model.engineModel}-${index}`}
                      className="spec-row border-t border-navy-900/10"
                    >
                      {group.columns.map((column, columnIndex) => {
                        const value = model[column.key] ?? "";
                        const Cell = columnIndex === 0 ? "th" : "td";
                        return (
                          <Cell
                            key={column.key}
                            {...(columnIndex === 0 ? { scope: "row" as const } : {})}
                            className={`whitespace-nowrap px-4 py-3 font-mono ${
                              column.key === "outputKva"
                                ? "font-600 text-orange-600"
                                : columnIndex === 0 || column.key === "engineModel"
                                  ? "font-600 text-navy-900"
                                  : "text-steel-600"
                            }`}
                          >
                            {value}
                          </Cell>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {group.models.map((model, index) => (
                <details
                  key={`${model.type}-${model.engineModel}-${index}`}
                  className="group border border-navy-900/10 bg-white"
                >
                  <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none">
                    <span className="min-w-0">
                      <span className="block break-words font-mono font-600 text-navy-900">
                        {model.type}
                      </span>
                      <span className="mt-1 block break-words text-xs text-steel-500">
                        {model.engineModel} · {model.outputKw} kW / {model.outputKva} kVA
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center bg-navy-900 text-lg text-white transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dl className="grid grid-cols-1 gap-3 border-t border-navy-900/10 bg-paper px-4 py-4 text-sm min-[420px]:grid-cols-2">
                    {group.columns.map((column) => (
                      <div key={column.key} className="min-w-0">
                        <dt className="text-xs font-bold uppercase tracking-wide text-steel-500">
                          {columnHeading(column)}
                        </dt>
                        <dd className="mt-1 break-words font-mono text-navy-900">
                          {model[column.key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </details>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
