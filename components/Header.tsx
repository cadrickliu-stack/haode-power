"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-lg shadow-navy-950/10 backdrop-blur"
          : "bg-white"
      }`}
    >
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600" />
      <div className="container-wide flex items-center justify-between py-4">
        <Link href="/" className="focus-ring flex shrink-0 items-center focus-visible:ring-offset-white" aria-label="Haode Power home">
          <Image
            src="/images/brand/hd-logo.png"
            alt="HD logo"
            width={2079}
            height={756}
            priority
            className="h-11 w-auto object-contain sm:h-12"
            sizes="(max-width: 640px) 120px, 132px"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring relative px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:ring-offset-white ${
                  active ? "text-orange-600" : "text-navy-900/75 hover:text-orange-600"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-orange-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="focus-ring flex items-center gap-2 text-sm font-semibold text-navy-900/75 transition-colors hover:text-orange-600 focus-visible:ring-offset-white"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current text-orange-500">
              <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
            </svg>
            {site.phone}
          </a>
          <Link href="/contact" className="btn-primary">
            Request Quote
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="focus-ring flex h-10 w-10 flex-col items-center justify-center gap-1.5 focus-visible:ring-offset-white lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-navy-900 transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span className={`h-0.5 w-6 bg-navy-900 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-navy-900 transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-navy-900/10 bg-white shadow-lg transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[480px]" : "max-h-0"
        }`}
      >
        <nav className="container-wide flex flex-col gap-1 pb-6">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring border-b border-navy-900/10 py-3 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:ring-offset-white ${
                  active ? "text-orange-600" : "text-navy-900/80 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn-primary mt-4 w-full">
            Request Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
