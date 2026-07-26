import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import GeneratorSpecificationTable from "@/components/GeneratorSpecificationTable";
import InquiryForm from "@/components/InquiryForm";
import { GENERATOR_BRANDS_DATA } from "@/lib/generator-brands-data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(GENERATOR_BRANDS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = GENERATOR_BRANDS_DATA[slug];

  if (!brand) {
    return {
      title: "Brand Not Found | Haode Power",
    };
  }

  return {
    title: brand.metaTitle,
    description: brand.metaDescription,
    keywords: brand.keywords,
  };
}

export default async function GeneratorBrandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = GENERATOR_BRANDS_DATA[slug];

  if (!brand) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="Generator Engine Brand"
        title={brand.name}
        description={brand.powerRange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Brand Overview */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
            {brand.name} Power Systems by Haode Power
          </h1>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            {brand.companyIntroduction}
          </p>
        </section>

        {/* Engine Features & Application Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Engine Features */}
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-5 bg-amber-500 rounded-sm inline-block"></span>
              Engine Features
            </h2>
            <ul className="space-y-3">
              {brand.engineFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Application Fields */}
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-5 bg-slate-800 rounded-sm inline-block"></span>
              Application Fields
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {brand.applicationFields.map((field, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>{field}</span>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Compatible Generator Applications:
            </h3>
            <ul className="text-xs text-slate-600 space-y-1">
              {brand.compatibleGeneratorApplications.map((app, idx) => (
                <li key={idx}>• {app}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Specifications Table */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            {brand.name} Specification Models
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Technical specifications for rated power, engine model, alternator options, dimensions, and weights.
          </p>
          <GeneratorSpecificationTable
            models={brand.models}
            brandName={brand.name}
          />
        </section>

        {/* FAQ Section */}
        {brand.faqs.length > 0 && (
          <section className="mt-12 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions - {brand.name}
            </h2>
            <div className="space-y-4">
              {brand.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                >
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reusing Inquiry Form Component */}
        <InquiryForm />
      </div>
    </main>
  );
}