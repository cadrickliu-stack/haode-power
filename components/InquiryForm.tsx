"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const productOptions = [
  "Diesel Generator 20kVA",
  "Diesel Generator 50kVA",
  "Diesel Generator 100kVA",
  "Diesel Generator 200kVA",
  "Diesel Generator 500kVA",
  "Diesel Generator 1000kVA",
  "Solar Light Tower",
  "Diesel Light Tower",
  "Hybrid Light Tower",
  "OEM / ODM Project",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

function InquiryFormInner({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get("product") || "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // Replace with your API route / CRM / email webhook endpoint.
      await new Promise((resolve) => setTimeout(resolve, 900));
      console.log("Inquiry submitted:", data);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-steel-500 transition-colors focus:border-orange-500 focus-ring";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 border border-orange-500/30 bg-orange-500/5 px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-2xl text-white">✓</div>
        <h3 className="font-display text-2xl font-700 uppercase text-navy-900">Inquiry Received</h3>
        <p className="max-w-sm text-sm text-steel-600">
          Thank you for contacting Haode Power. Our export sales team will
          respond within 24 hours with a tailored quotation.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="focus-ring mt-2 text-sm font-bold uppercase tracking-wide text-orange-500 hover:text-orange-600"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-steel-600">
          Full Name *
        </label>
        <input id="name" name="name" required className={inputClass} placeholder="John Smith" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="company" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-steel-600">
          Company *
        </label>
        <input id="company" name="company" required className={inputClass} placeholder="Your company name" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="country" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-steel-600">
          Country *
        </label>
        <input id="country" name="country" required className={inputClass} placeholder="Your country" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-steel-600">
          Email *
        </label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="whatsapp" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-steel-600">
          WhatsApp Number
        </label>
        <input id="whatsapp" name="whatsapp" className={inputClass} placeholder="+1 234 567 8900" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="product" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-steel-600">
          Product Interest *
        </label>
        <select id="product" name="product" required className={inputClass} defaultValue={prefillProduct}>
          <option value="" disabled>
            Select a product
          </option>
          {productOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-steel-600">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 3 : 5}
          className={inputClass}
          placeholder="Tell us about your power requirements: application, site location, required capacity, quantity..."
        />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
          {status === "submitting" ? "Sending..." : "Submit Inquiry"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">
            Something went wrong. Please try again or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}

export default function InquiryForm({ compact = false }: { compact?: boolean }) {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse bg-navy-900/5" />}>
      <InquiryFormInner compact={compact} />
    </Suspense>
  );
}
