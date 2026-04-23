# Interstate Car Carriers Live Cutover Status

Last updated: 2026-04-23

This document applies the shared Astro migration model to `interstatecarcarriers.com.au`.

## Canonical Live Controller

Current reality:

- production domain: `https://interstatecarcarriers.com.au/`
- current live controller: Astro
- current Astro scaffold: `/Users/jasonhill/Projects/Business/websites/MM-interstatecarcarriers.com.au`
- local manifest: `/Users/jasonhill/Projects/Business/websites/MM-interstatecarcarriers.com.au/brain.manifest.json`
- Vercel project: `mm-interstatecarcarriers`
- production URL: `https://mm-interstatecarcarriers.vercel.app`

Conclusion:

- the Astro repo is now the live controller, and the remaining closeout work is publication verification and recordkeeping

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
- GA4 provider support uses the shared `Ga4.astro` pattern
- `.env.example` exposes GA4 variables with `G-G4FXNJBHPM` plus the analytics contract keys
- site-consumer fallback wiring resolves GA4 in production output for this site
- the production homepage now renders GA4 and the legacy `/contact-icc/` alias now redirects permanently to the quoting contact surface

## Remaining Cutover Gates

- close the GitHub issue and keep this note as a historical record
- update tracker / `_wp-house` state if the operating model changes again

## `_wp-house` Decision

Current decision:

- retire as live controller

Reason:

- WordPress is no longer the active production controller
- `_wp-house/sites/interstatecarcarriers-com-au.json` remains as a transitional compatibility record until the final closeout sweep is complete
