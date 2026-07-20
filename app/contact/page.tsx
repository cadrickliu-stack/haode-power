import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Haode Power for a diesel generator or mobile light tower quotation. Our export sales team responds within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Request a Quotation"
        description="Tell us about your project and we'll respond with technical specifications and FOB/CIF pricing within 24 hours."
        image="https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=1800&auto=format&fit=crop"
      />

      <section className="bg-white py-24">
        <div className="container-wide grid grid-cols-1 gap-16 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="eyebrow">Get In Touch</div>
            <h2 className="mt-3 font-display text-3xl font-700 uppercase leading-[1.05] tracking-tight text-navy-900 sm:text-4xl">
              Talk to Our Export Team
            </h2>
            <p className="mt-4 text-steel-600">
              Whether you need a single standby generator or a fleet of
              rental-ready light towers, our team can help you specify the
              right equipment for your site conditions and budget.
            </p>

            <div className="mt-8 space-y-6 border-t border-navy-900/10 pt-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-orange-500">Phone / WhatsApp</div>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="focus-ring mt-1 block font-display text-xl font-700 text-navy-900 hover:text-orange-500">
                  {site.phone}
                </a>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-orange-500">Email</div>
                <a href={`mailto:${site.email}`} className="focus-ring mt-1 block font-display text-xl font-700 text-navy-900 hover:text-orange-500">
                  {site.email}
                </a>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-orange-500">Factory Address</div>
                <p className="mt-1 text-navy-900">{site.address}</p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-orange-500">Business Hours</div>
                <p className="mt-1 text-navy-900">Mon – Sat, 8:00 – 18:00 (GMT+8)</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-3">
            <div className="border border-navy-900/10 bg-paper p-8">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="h-[420px] w-full overflow-hidden border-t border-navy-900/10">
        <iframe
          title="Haode Power factory location map"
          className="h-full w-full grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Weifang%20City%2C%20Shandong%2C%20China&output=embed"
        />
      </section>
    </>
  );
}
