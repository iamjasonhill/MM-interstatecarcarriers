# Interstate Car Carriers Migration Ledger

Last updated: 2026-04-19

## Scope

This repo now exists as the active Astro rebuild controller for `interstatecarcarriers.com.au`.

Current position:

- live public site remains WordPress
- Astro rebuild now exists locally at `/Users/jasonhill/Projects/websites/MM-interstatecarcarriers.com.au`
- canonical new-build baseline includes `@jdevalk/astro-seo-graph`, sitemap generation, dynamic robots, and fleet-standard repo paperwork

## Source Inputs Used

- live public homepage and key quote paths on `https://interstatecarcarriers.com.au`
- `_wp-house/sites/interstatecarcarriers-com-au.json`
- `fleet-control/data/state/properties.json`
- hardened Meridian transport starter from `/Users/jasonhill/Projects/websites/tmp/meridian-transport`
- live production header checks run on 2026-04-19 against homepage, contact, FAQ/content links, `robots.txt`, and `sitemap_index.xml`
- Search Console indexed-valid export from `/Users/jasonhill/Downloads/interstatecarcarriers.com.au-Coverage-Valid-2026-04-19.zip`
- WordPress route-post imports pulled from the live host through `wp-cli`

## Decisions Made In This Pass

- use the improved transport starter as the visual base
- adopt `MM-interstatecarcarriers.com.au` as the local naming-standard folder
- treat `https://quoting.interstatecarcarriers.com.au/quote/vehicle` as the main quote handoff
- treat `https://quoting.interstatecarcarriers.com.au/contact` as the main contact handoff
- wire `@jdevalk/astro-seo-graph` into the scaffold from the beginning
- use `/car-transport-sydney-melbourne/` as the first route-page prototype and the base pattern for the indexed route lane
- add first-class `/terms/` and `/privacy-policy/` pages so legal/support basics are present in the Astro build from the start
- use the WordPress route-post importer to preserve original route content into structured source files before rolling out bulk route pages
- use a dynamic route renderer backed by imported source JSON for the indexed route estate instead of hand-authoring hundreds of individual Astro pages

## Completed In Repo

- homepage, footer, sitemap, robots, and document shell are in place
- quote and contact handoffs are normalized to the canonical quoting surfaces
- support/content pages now exist for:
  - `/vehicle-transport-questions/`
  - `/car-transport-personal-items-allowed/`
  - `/car-transport-express-service/`
  - `/interstate-car-transport-by-rail/`
  - `/cheapest-interstate-car-transport/`
  - `/enclosed-car-transport-quote/`
- legal/support pages now exist for:
  - `/terms/`
  - `/privacy-policy/`
  - `/sitemap/`
- the indexed route lane is now source-led and imported
- `686` route source JSON files now exist under `src/data/routes/source/`
- the `688` indexed `car-transport-*` URLs from Search Console are accounted for operationally:
  - `686` as route-source imports
  - `2` as support pages already handled separately:
    - `/car-transport-express-service/`
    - `/car-transport-personal-items-allowed/`
- `npm run check` passes
- `npm run build` passes
- `@jdevalk/astro-seo-graph` checks are clean on the full build

## Still To Be Done

- confirm whether the current Vercel project should remain the canonical production target for this site
- decide whether deployment protection should remain on during the review phase or be relaxed for broader stakeholder preview access
- extend preview verification beyond the first sampled checks
- finalize redirect behavior for any legacy URLs that will not remain as first-class Astro pages
- verify analytics on preview / production-linked output
- perform live cutover only after preview, redirect, and controller evidence are complete
- update `_wp-house` and cutover paperwork after Astro becomes the live controller

## Deployment And Preview Progress

Completed on 2026-04-19:

- created Vercel project `mm-interstatecarcarriers`
- linked the local repo with `.vercel/project.json`
- produced the first Vercel deployment:
  `https://mm-interstatecarcarriers-17s1p7h1p-iamjasonhills-projects.vercel.app`
- verified through authenticated Vercel requests that:
  - homepage renders
  - `/robots.txt` renders
  - `/sitemap-index.xml` renders
  - representative route page `/car-transport-sydney-melbourne/` renders
  - quote and contact links are present in the output

Current caveat:

- direct public access to the Vercel deployment is protected and returns `401` without a bypass token
- the deployment itself is healthy; the remaining question is whether to keep that protection in place during review or relax it for easier checking

## Live Production Findings On 2026-04-19

Confirmed with direct public checks:

- homepage `/` returns `200`
- homepage exposes a `link rel="https://api.w.org/"` header pointing at `https://interstatecarcarriers.com.au/wp-json/`
- `https://interstatecarcarriers.com.au/contact-icc/` returns `301` to `https://quoting.interstatecarcarriers.com.au/contact`
- `https://interstatecarcarriers.com.au/robots.txt` returns `404`
- `https://interstatecarcarriers.com.au/sitemap_index.xml` returns `404`

Homepage-linked content URLs checked on 2026-04-19:

- `/vehicle-transport-questions/` -> `404`
- `/car-transport-personal-items-allowed/` -> `404`
- `/car-transport-express-service/` -> `404`
- `/interstate-car-transport-by-rail/` -> `404`
- `/cheapest-interstate-car-transport/` -> `404`
- `/enclosed-car-transport-quote/` -> `404`

Operational interpretation:

- the current live site is not a stable content surface
- quote and contact handoff already belong to the quoting platform, not the WordPress site
- rebuilding this property in Astro is not only a design migration, it is also a production cleanup of broken technical SEO and broken internal-link paths
- the repo is now structurally ready for preview and cutover work, but WordPress remains the production controller until deploy linkage and verification are complete
