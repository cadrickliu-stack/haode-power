import Link from "next/link";
import { site } from "@/lib/data";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="border-b border-navy-900/10 bg-white">
        <ol className="container-wide flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 py-4 text-xs font-bold uppercase tracking-wide text-steel-500">
          {items.map((item, index) => {
            const current = index === items.length - 1;
            return (
              <li key={item.href} className="flex min-w-0 items-center gap-x-2">
                {index > 0 && <span aria-hidden>/</span>}
                {current ? (
                  <span className="break-words text-navy-900" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="focus-ring hover:text-orange-500">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
