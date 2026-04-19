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
- `@jdevalk/astro-seo-graph`
- generated sitemap index
- dynamic robots route
- generated `llms.txt`
- fleet-standard migration docs

## Remaining Cutover Gates

- complete indexed-page and route inventory
- define redirect behavior for legacy quote/contact and route pages
- confirm production deployment target and project linkage
- test public behavior on a preview deployment
- verify robots, sitemap, and quote handoff on the preview

## `_wp-house` Decision

Current decision:

- retain temporarily

Reason:

- WordPress is still the live production controller
- `_wp-house/sites/interstatecarcarriers-com-au.json` remains the active compatibility record until cutover happens
