import React from "react";
import { Metadata } from "next";
import GeneratorBrandCard from "@/components/GeneratorBrandCard";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import { GENERATOR_BRANDS_DATA } from "@/lib/generator-brands-data";

export const metadata: Metadata = {
  title: "Diesel Generator Brands Database | Haode Power",
  description:
    "Explore industrial diesel generator sets by brand at Haode Power. Verified Cummins, Perkins, Weichai, Yuchai, Shangchai, and SDEC generator models.",
  keywords: [
    "diesel generator manufacturer China",
    "Cummins diesel generator supplier",
    "Perkins generator supplier",
    "Weichai diesel generator manufacturer",
    "industrial diesel generator supplier",
  ],
};

export default function GeneratorBrandsListPage() {
  const brandsList = Object.values(GENERATOR_BRANDS_DATA);

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        title="Industrial Diesel Generator Brand Database"
        subtitle="Haode Power manufactures heavy-duty diesel generator sets and mobile light towers powered by global leading engine manufacturers."
      />

      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Engine Brand Directory
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Choose an engine brand below to view models, power capacity, and technical specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandsList.map((brand) => (
            <GeneratorBrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Industrial Diesel Generator Supplier in China
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4 text-sm sm:text-base">
            <p>
              Haode Power is an established <strong>diesel generator manufacturer China</strong> delivering robust energy systems to international clients. Our main products cover heavy-duty diesel generator sets and high-performance mobile light towers.
            </p>
            <p>
              Whether you require a premier <strong>Cummins diesel generator supplier</strong>, a quiet <strong>Perkins generator supplier</strong>, or efficient domestic engine power from a <strong>Weichai diesel generator manufacturer</strong>, Haode Power delivers complete custom manufacturing and factory-direct quality.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">
              Which engine brands are supplied by Haode Power?
            </h3>
            <p className="text-sm text-slate-600">
              We specialize in 6 primary engine platforms: Cummins, Perkins, Weichai, Yuchai, Shangchai, and SDEC.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">
              Does Haode Power manufacture mobile light towers?
            </h3>
            <p className="text-sm text-slate-600">
              Yes, alongside stationary diesel generator sets, Haode Power manufactures mobile light towers for mining, emergency response, and infrastructure illumination.
            </p>
          </div>
        </div>
      </section>

      {/* Reusing Inquiry Form Component */}
      <section className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <InquiryForm />
      </section>
    </main>
  );
}