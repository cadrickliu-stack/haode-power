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
          ? "bg-navy-900/95 shadow-lg shadow-navy-950/20 backdrop-blur"
          : "bg-navy-900"
      }`}
    >
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600" />
      <div className="container-wide flex items-center justify-between py-4">
        <Link href="/" className="focus-ring flex shrink-0 items-center" aria-label="Haode Power home">
          <Image
            src="/images/brand/hd-logo.png"
            alt="HD logo"
            width={2079}
            height={756}
            priority
            className="h-10 w-auto object-contain sm:h-11"
            sizes="(max-width: 640px) 110px, 122px"
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
                className={`focus-ring relative px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-orange-400" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-orange-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="text-sm font-semibold text-white/80 hover:text-white"
          >
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
          className="focus-ring flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden bg-navy-900 transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[480px]" : "max-h-0"
        }`}
      >
        <nav className="container-wide flex flex-col gap-1 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring border-b border-white/10 py-3 text-sm font-semibold uppercase tracking-wide text-white/85 hover:text-orange-400"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mt-4 w-full">
            Request Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
