# MM-interstatecarcarriers.com.au

Canonical Astro rebuild scaffold for `interstatecarcarriers.com.au`.

This folder is the new first-class site home for Interstate Car Carriers inside the fleet workspace. It starts from the hardened Meridian transport starter, then layers on the fleet controller contract and the `@jdevalk/astro-seo-graph` baseline so new work begins in the same shape as the other modern `MM-*` sites.

## Current State

- domain: `https://interstatecarcarriers.com.au`
- framework: Astro
- target hosting: Vercel
- local controller path: `MM-interstatecarcarriers.com.au`
- live production status: WordPress still live, Astro rebuild now scaffolded locally

## What This Scaffold Already Covers

- branded homepage shell for Interstate Car Carriers
- real quote and contact handoff targets
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
npm run check:seo
```

## Core Files

- site config: `src/config/site.ts`
- document layout: `src/layouts/SiteDocument.astro`
- homepage: `src/pages/index.astro`
- HTML sitemap: `src/pages/sitemap.astro`
- robots route: `src/pages/robots.txt.ts`
- manifest: `brain.manifest.json`

## Migration Notes

This scaffold is intentionally the homepage and controller baseline first, not the full WordPress migration.

The big remaining work for this property is the route-page estate currently living on WordPress. That needs its own indexed-page audit, redirect plan, and cutover sequence before the Astro build can replace the live site.

## Repo Paperwork

- `docs/migration-ledger.md`
- `docs/redirect-map.md`
- `docs/indexed-valid-inventory.md`
- `docs/homepage-audit.md`
- `docs/live-cutover-status.md`
