import Link from "next/link";
import Image from "next/image";
import { site, navLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-wide grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="focus-ring mb-4 inline-flex items-center" aria-label="Haode Power home">
            <Image
              src="/images/brand/hd-logo.png"
              alt="HD logo"
              width={2079}
              height={756}
              className="h-12 w-auto object-contain"
              sizes="132px"
            />
          </Link>
          <p className="text-sm leading-relaxed">
            Manufacturer of diesel generator sets and mobile light towers,
            engineered for mining, construction, oil &amp; gas, and rental
            fleets — exporting worldwide since day one.
          </p>
          <div className="mt-6">
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Haode Power on WhatsApp"
              className="focus-ring inline-flex h-9 items-center justify-center border border-white/15 px-3 text-xs font-bold uppercase text-white/70 transition-colors hover:border-orange-400 hover:text-orange-400"
            >
              WhatsApp
            </a>
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
            <li><Link href="/products/diesel-generators" className="focus-ring hover:text-orange-400">Diesel Generator Brand Series</Link></li>
            <li><Link href="/products/diesel-generators/cummins" className="focus-ring hover:text-orange-400">Cummins Generator Series</Link></li>
            <li><Link href="/products/mobile-light-towers" className="focus-ring hover:text-orange-400">Mobile Light Tower Models</Link></li>
              <li><Link href="/products/mobile-light-towers/4tnve600" className="focus-ring hover:text-orange-400">4TNVE600 Solar Light Tower</Link></li>
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
              <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="focus-ring hover:text-orange-400">
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
