import type { LightTowerSpecificationSection } from "@/lib/mobile-light-towers";

function SpecificationList({
  section,
}: {
  section: LightTowerSpecificationSection;
}) {
  return (
    <dl className="divide-y divide-navy-900/10">
      {section.items.map((item) => (
        <div
          key={`${section.title}-${item.label}`}
          className="grid min-w-0 grid-cols-1 gap-1 py-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-4"
        >
          <dt className="text-xs font-bold uppercase tracking-wide text-steel-500">
            {item.label}
          </dt>
          <dd className="min-w-0 break-words font-mono text-sm font-600 text-navy-900 sm:text-right">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function LightTowerSpecifications({
  sections,
}: {
  sections: LightTowerSpecificationSection[];
}) {
  return (
    <>
      <div className="hidden grid-cols-1 gap-6 md:grid lg:grid-cols-2">
        {sections.map((section) => (
          <section
            key={section.title}
            className="min-w-0 border border-navy-900/10 bg-white p-6"
          >
            <h3 className="border-b-2 border-orange-500 pb-3 font-display text-2xl font-700 uppercase text-navy-900">
              {section.title}
            </h3>
            <SpecificationList section={section} />
          </section>
        ))}
      </div>

      <div className="space-y-3 md:hidden">
        {sections.map((section, index) => (
          <details
            key={section.title}
            open={index === 0}
            className="group min-w-0 border border-navy-900/10 bg-white"
          >
            <summary className="focus-ring flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 marker:content-none">
              <span className="min-w-0 font-display text-lg font-700 uppercase text-navy-900">
                {section.title}
              </span>
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center bg-navy-900 text-xl text-white transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="min-w-0 border-t border-navy-900/10 bg-paper px-4 py-2">
              <SpecificationList section={section} />
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
