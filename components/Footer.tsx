import Link from "next/link";
import { site, navLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-wide grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-orange-500 font-display text-lg font-800 text-white [clip-path:polygon(15%_0,100%_0,85%_100%,0_100%)]">
              H
            </span>
            <span className="font-display text-xl font-700 tracking-wide text-white">
              HAODE <span className="text-orange-400">POWER</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Manufacturer of diesel generator sets and mobile light towers,
            engineered for mining, construction, oil &amp; gas, and rental
            fleets — exporting worldwide since day one.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { label: "LinkedIn", href: site.socials.linkedin },
              { label: "Facebook", href: site.socials.facebook },
              { label: "YouTube", href: site.socials.youtube },
              { label: "WhatsApp", href: site.socials.whatsapp },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="focus-ring flex h-9 w-9 items-center justify-center border border-white/15 text-xs font-bold uppercase text-white/70 transition-colors hover:border-orange-400 hover:text-orange-400"
              >
                {s.label.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-700 uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="focus-ring transition-colors hover:text-orange-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-700 uppercase tracking-wide text-white">
            Products
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/products/diesel-generators" className="focus-ring hover:text-orange-400">Diesel Generators 20–1000kVA</Link></li>
            <li><Link href="/products/mobile-light-towers" className="focus-ring hover:text-orange-400">Solar Light Towers</Link></li>
            <li><Link href="/products/mobile-light-towers" className="focus-ring hover:text-orange-400">Diesel Light Towers</Link></li>
            <li><Link href="/products/mobile-light-towers" className="focus-ring hover:text-orange-400">Hybrid Light Towers</Link></li>
            <li><Link href="/products" className="focus-ring hover:text-orange-400">View All Products</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-700 uppercase tracking-wide text-white">
            Contact Info
          </h3>
          <ul className="space-y-3 text-sm">
            <li>{site.address}</li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="focus-ring hover:text-orange-400">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="focus-ring hover:text-orange-400">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="focus-ring hover:text-orange-400">
                WhatsApp: {site.whatsapp}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p>{site.domain} — Exporting Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
