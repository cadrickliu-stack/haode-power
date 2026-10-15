# HAODE Power localization

## Routing and rendering

Next.js 15.5.28 App Router + next-intl 4.14.9. Public routes use English without a prefix, `/ru` and `/es`. `middleware.ts` rewrites unprefixed requests internally to `[locale]=en`; `/en/...` redirects to the existing unprefixed URL. Language detection and language cookies are disabled: the URL is authoritative, with no IP/browser-language redirects.

All 20 published routes share their existing page implementations, statically generated in all three locales (60 public URLs). The header selector preserves pathname, product query and fragment. A deliberate language switch loads the localized document so HTML language and shared server-rendered components update together.

`messages/*.json` contain reviewed English-source keys with `[Russian, Spanish]` values. `text.tsx` translates display text while building React output on the server and client; it never translates the browser DOM, input values, links, identifiers or API payloads. Components localize their own output across server/client boundaries. Exact dictionary matching deliberately leaves brand/model identifiers and raw technical values unchanged. New source wording requires a new dictionary entry and the browser coverage audit.

## Data and business boundaries

- The four original product/data modules are unchanged and remain the single technical source for all languages.
- `FuelCon.` and `Dis.` remain exactly as supplied: their meaning requires human confirmation. Units, including `mm L×W×H`, remain original. No conversion or reinterpretation of ratings.
- No new silent-generator, Mitsubishi, spare-parts, inventory or regional-branch pages are invented.
- Form option values remain English product identifiers; only visible labels are localized. The existing API and Lark mapping are unchanged. Existing Source Page / Source URL fields capture `/ru` or `/es`, avoiding CRM schema changes. Customer text is never translated.
- Existing consent storage is shared across locale paths. GA ID and initialization are unchanged. Existing Enhanced Measurement is the only page-view mechanism. The click tracker also recognizes the Russian and Spanish quote labels.
- Consent revocation also rechecks cookie removal after a late Google script load and its queued work, guarded by the current saved choice. This fixes a reproduced rapid-switch/revoke race without reconfiguring GA or emitting page views.

## SEO

`metadata.ts` supplies localized title/description, self canonical and reciprocal en/ru/es/x-default links. All 60 routes are in the sitemap with language alternatives. robots continues allowing public pages and excluding `/api/`. Breadcrumb structured data uses the active locale.

## Verification

Run `npx tsc --noEmit --incremental false`, `npm run lint`, and a production build with `VERCEL_ENV=production`. Start on port 3100.

Set `PLAYWRIGHT_MODULE` to an installed Playwright module path; tests launch the installed Chrome browser. Then run:

```
node scripts/i18n-inquiry-test.cjs
node scripts/i18n-audit.cjs http://localhost:3100 output/i18n-local
node scripts/i18n-flow-test.cjs http://localhost:3100 output/i18n-local
node scripts/i18n-consent-race-test.cjs http://localhost:3100
```

Use the production origin and a separate output directory to repeat after deployment. The audit covers all 60 pages, metadata and 18 mobile layouts. The flow test uses clean browser contexts and verifies each locale's page views, collect responses, conversions, consent reversals, navigation and mocked form success. The route test executes the actual inquiry handler with a mocked Lark adapter. None of these tests creates CRM records or sends email. They do emit synthetic analytics events after consent.
