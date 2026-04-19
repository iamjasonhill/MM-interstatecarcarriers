# Interstate Car Carriers Live Cutover Status

Last updated: 2026-04-19

This document applies the shared Astro migration model to `interstatecarcarriers.com.au`.

## Canonical Live Controller

Current reality:

- production domain: `https://interstatecarcarriers.com.au/`
- current live controller: WordPress
- current Astro scaffold: `/Users/jasonhill/Projects/websites/MM-interstatecarcarriers.com.au`
- local manifest: `/Users/jasonhill/Projects/websites/MM-interstatecarcarriers.com.au/brain.manifest.json`

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
- generated sitemap index
- dynamic robots route
- generated `llms.txt`
- fleet-standard migration docs

Validation status:

- `npm run check` passes
- `npm run build` passes
- current build emits `696` pages
- metadata, H1, internal-link, and image-alt checks are clean in the latest build

## Remaining Cutover Gates

- confirm production deployment target and project linkage
- test public behavior on a preview deployment
- verify homepage, support pages, representative route pages, and quote/contact handoff on the preview
- verify robots, sitemap, schema, and analytics on the preview
- finalize redirect behavior for any legacy URLs that will not remain Astro-owned
- perform live production cutover and then update tracker / `_wp-house` state

## `_wp-house` Decision

Current decision:

- retain temporarily

Reason:

- WordPress is still the live production controller
- `_wp-house/sites/interstatecarcarriers-com-au.json` remains the active compatibility record until cutover happens
