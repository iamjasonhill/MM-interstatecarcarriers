# MM-interstatecarcarriers.com.au

Canonical Astro rebuild controller for `interstatecarcarriers.com.au`.

This folder is the new first-class site home for Interstate Car Carriers inside the fleet workspace. It starts from the hardened Meridian transport starter, then layers on the fleet controller contract, `@jdevalk/astro-seo-graph`, and the imported WordPress route-source archive so new work begins in the same shape as the other modern `MM-*` sites.

## Current State

- domain: `https://interstatecarcarriers.com.au`
- framework: Astro
- target hosting: Vercel
- local controller path: `MM-interstatecarcarriers.com.au`
- live production status: WordPress still live, Astro rebuild completed locally and awaiting preview/cutover work

## What This Scaffold Already Covers

- branded homepage shell for Interstate Car Carriers
- real quote and contact handoff targets
- support/content pages for the main broken inherited URLs
- terms, privacy-policy, and sitemap support pages
- dynamic route rendering from imported WordPress source files
- `@jdevalk/astro-seo-graph` integration and shared `<Seo>` document layout
- dynamic `robots.txt`
- sitemap index via `@astrojs/sitemap`
- generated `llms.txt`
- repo-level manifest and migration paperwork

## Important Commands

```bash
npm install
npm run dev
npm run build
npm run check
npm run check:contract
npm run check:seo
npm run import:routes
npm run import:routes:batches
```

## Core Files

- site config: `src/config/site.ts`
- document layout: `src/layouts/SiteDocument.astro`
- homepage: `src/pages/index.astro`
- dynamic route renderer: `src/pages/[routeSlug].astro`
- route source data: `src/data/routes/source/`
- HTML sitemap: `src/pages/sitemap.astro`
- robots route: `src/pages/robots.txt.ts`
- manifest: `brain.manifest.json`

## Migration Notes

This repo is now beyond the initial scaffold stage. The core support pages, legal pages, and indexed route archive are in place locally, and the remaining work is now preview, redirect, deploy-linkage, and live cutover rather than basic migration setup.

Analytics is now enforced at the repo-contract level too. The shared analytics adapter is present in the document shell, `.env.example` exposes the expected analytics variables, and `npm run check:contract` verifies that contract locally. What is still outstanding is the actual provider decision and live values for this site.

## Repo Paperwork

- `docs/migration-ledger.md`
- `docs/redirect-map.md`
- `docs/indexed-valid-inventory.md`
- `docs/homepage-audit.md`
- `docs/live-cutover-status.md`
