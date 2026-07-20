# Haode Power — Corporate Website

Production-ready B2B website for **Haode Power**, a diesel generator set
and mobile light tower manufacturer, built with Next.js 15 (App Router),
TypeScript, and Tailwind CSS.

## Stack

- Next.js 15 (App Router, React Server Components)
- TypeScript
- Tailwind CSS
- next/image + next/font (Google Fonts: Barlow Condensed, Inter, IBM Plex Mono)
- next/og for dynamic Open Graph image generation
- SEO: per-page metadata, JSON-LD structured data, sitemap.xml, robots.txt

## Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
app/
  layout.tsx              Root layout, fonts, global metadata, Organization schema
  page.tsx                Home page
  globals.css             Tailwind layer + design tokens
  sitemap.ts               Dynamic sitemap.xml
  robots.ts                Dynamic robots.txt
  opengraph-image.tsx      Dynamic OG image
  not-found.tsx            Custom 404
  loading.tsx              Route-level loading state
  products/
    page.tsx               Products overview
    diesel-generators/page.tsx
    mobile-light-towers/page.tsx
  about/page.tsx
  contact/page.tsx
components/
  Header.tsx, Footer.tsx, Hero.tsx, PageHero.tsx
  SectionHeading.tsx, Reveal.tsx
  GeneratorCard.tsx, LightTowerCard.tsx
  InquiryForm.tsx
lib/
  data.ts                  Site content & product data
```

## Content Editing

All copy, product specs, and contact details live in `lib/data.ts` —
edit that file to update company info, generator/light tower specs,
industries, and advantages without touching component code.

## Wiring the Contact Form

`components/InquiryForm.tsx` currently logs submissions to the console
and simulates a network request. To connect it to a real backend:

1. Create an API route, e.g. `app/api/inquiry/route.ts`, that forwards
   submissions to your CRM, email service, or database.
2. Replace the `setTimeout` in `handleSubmit` with a `fetch('/api/inquiry', ...)` call.

## Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repository in the Vercel dashboard, or run:
   ```bash
   npm i -g vercel
   vercel
   ```
3. No environment variables are required for the base site.

## SEO Checklist Included

- Unique `<title>` / meta description per page
- Open Graph + Twitter card metadata
- Organization + Product (ItemList) JSON-LD structured data
- `/sitemap.xml` and `/robots.txt` generated at build/request time
- Semantic headings, descriptive `alt` text on all images
- Fully responsive, keyboard-accessible focus states
