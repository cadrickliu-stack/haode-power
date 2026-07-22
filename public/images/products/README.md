# Product Photography — File Guide

This folder holds every real product photo used across the site. Replace
each placeholder below with the actual photo using the **exact same
filename** — no code changes are needed when you do.

All paths are relative to `public/images/products/`.

## Folder Structure

```
images/products/
├── diesel-generators/
│   ├── hero-diesel-generator-mining.jpg      1800×1000  Category page banner
│   ├── category-diesel-generators.jpg        1800×1000  Homepage category tile
│   ├── 20kva-diesel-generator.jpg            1200×900   Product card
│   ├── 50kva-diesel-generator.jpg            1200×900   Product card
│   ├── 100kva-diesel-generator.jpg           1200×900   Product card
│   ├── 200kva-diesel-generator.jpg           1200×900   Product card
│   ├── 500kva-diesel-generator.jpg           1200×900   Product card
│   └── 1000kva-diesel-generator.jpg          1200×900   Product card
└── mobile-light-towers/
    ├── hero-light-tower-construction.jpg     1800×1000  Category page banner
    ├── category-mobile-light-towers.jpg      1800×1000  Homepage category tile
    ├── solar-light-tower.jpg                 1200×900   Product card
    ├── diesel-light-tower.jpg                1200×900   Product card
    └── hybrid-light-tower.jpg                1200×900   Product card
```

## Photo Guidelines (B2B Industrial Standard)

- **Format:** JPG, sRGB color profile, quality 85–90%
- **Orientation:** Landscape (4:3 for product cards, 16:9 for hero banners)
- **Background:** Clean job-site or studio background — avoid clutter that
  competes with the equipment
- **Framing:** Show the full unit with enough context to read scale (a
  person or vehicle in frame for large gensets helps convey size)
- **Consistency:** Shoot all generator models from a similar angle so the
  product grid reads as one coherent lineup
- **File size:** Keep under 400KB per image after compression (use
  [Squoosh](https://squoosh.app) or `sharp-cli`) — Next.js will still
  serve optimized `webp`/`avif` automatically via `next/image`

## Where Alt Text Lives

SEO alt text is **not** stored as a filename or in this folder — it's
defined per-image in `lib/data.ts` (`alt` field on each `Generator` and
`LightTower`, plus the `dieselGeneratorHero`, `dieselGeneratorCategory`,
`lightTowerHero`, and `lightTowerCategory` exports). Update the copy
there if you want to refine the wording; you do not need to touch any
component.

Current alt text already follows SEO best practice, e.g.:

- "Diesel generator set for mining application"
- "500kVA diesel generator for mining application and oil and gas fields"
- "Mobile light tower for construction site"
- "LED lighting tower for mining operations and night-shift construction"

## Adding a New Product

1. Drop the photo into the relevant subfolder here.
2. Add an entry to the `generators` or `lightTowers` array in
   `lib/data.ts`, including the `image` path (`/images/products/...`)
   and a descriptive, keyword-rich `alt` string.
3. The product automatically appears on the Home, Products, and
   category pages — no other code changes required.

## Current Status

Every file listed above currently contains a **branded placeholder**
(navy/orange, labeled with the model name) generated so the site never
shows a broken image. Swap them out with real photography whenever it's
ready — filenames must match exactly.
