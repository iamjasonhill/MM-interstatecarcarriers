# Interstate Car Carriers Live Cutover Status

Last updated: 2026-04-19

This document applies the shared Astro migration model to `interstatecarcarriers.com.au`.

## Canonical Live Controller

Current reality:

- production domain: `https://interstatecarcarriers.com.au/`
- current live controller: WordPress
- current Astro scaffold: `/Users/jasonhill/Projects/websites/MM-interstatecarcarriers.com.au`
- local manifest: `/Users/jasonhill/Projects/websites/MM-interstatecarcarriers.com.au/brain.manifest.json`
- Vercel project: `mm-interstatecarcarriers`
- first linked Vercel deployment: `https://mm-interstatecarcarriers-17s1p7h1p-iamjasonhills-projects.vercel.app`

Conclusion:

- the Astro repo exists locally, but it is not yet the live controller

## Astro Build Status

This repo now has:

- branded homepage shell
- support/content pages for the main broken WordPress content URLs
- first-class legal pages
- dynamic route system backed by imported WordPress source content
- `686` imported route source files under `src/data/routes/source/`
- `@jdevalk/astro-seo-graph`
- shared analytics adapter in the document shell
- generated sitemap index
- dynamic robots route
- generated `llms.txt`
- fleet-standard migration docs

Validation status:

- `npm run check` passes
- `npm run check:contract` passes
- `npm run build` passes
- current build emits `696` pages
- metadata, H1, internal-link, and image-alt checks are clean in the latest build
- repo is now linked to a real Vercel project
- first Vercel deployment reached `Ready`
- authenticated preview checks confirmed homepage, robots, sitemap index, and representative route output

Analytics note:

- the shared analytics adapter is now present in code
- `.env.example` now exposes the analytics contract variables for this repo
- no provider values are configured yet for this site, so no analytics snippet currently renders
- remaining gate is provider confirmation plus preview verification, not component implementation

Preview access note:

- direct browser requests to the Vercel deployment currently return deployment protection `401` without a bypass token
- Vercel-authenticated checks succeed, so the deployment itself is healthy

## Remaining Cutover Gates

- confirm production deployment target and project linkage
- test public behavior on a preview deployment
- verify homepage, support pages, representative route pages, and quote/contact handoff on the preview
- verify robots, sitemap, schema, and analytics on the preview
- decide whether deployment protection should remain on during the broader review phase or be relaxed for easier stakeholder checks
- finalize redirect behavior for any legacy URLs that will not remain Astro-owned
- perform live production cutover and then update tracker / `_wp-house` state

## `_wp-house` Decision

Current decision:

- retain temporarily

Reason:

- WordPress is still the live production controller
- `_wp-house/sites/interstatecarcarriers-com-au.json` remains the active compatibility record until cutover happens
