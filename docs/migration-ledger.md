# Interstate Car Carriers Migration Ledger

Last updated: 2026-04-19

## Scope

This repo now exists as the first Astro controller scaffold for `interstatecarcarriers.com.au`.

Current position:

- live public site remains WordPress
- Astro homepage/controller scaffold now exists locally at `/Users/jasonhill/Projects/websites/MM-interstatecarcarriers.com.au`
- canonical new-build baseline includes `@jdevalk/astro-seo-graph`, sitemap generation, dynamic robots, and fleet-standard repo paperwork

## Source Inputs Used

- live public homepage and key quote paths on `https://interstatecarcarriers.com.au`
- `_wp-house/sites/interstatecarcarriers-com-au.json`
- `fleet-control/data/state/properties.json`
- hardened Meridian transport starter from `/Users/jasonhill/Projects/websites/tmp/meridian-transport`
- live production header checks run on 2026-04-19 against homepage, contact, FAQ/content links, `robots.txt`, and `sitemap_index.xml`

## Decisions Made In This Pass

- use the improved transport starter as the visual base
- adopt `MM-interstatecarcarriers.com.au` as the local naming-standard folder
- treat `https://quoting.interstatecarcarriers.com.au/quote/vehicle` as the main quote handoff
- treat `https://quoting.interstatecarcarriers.com.au/contact` as the main contact handoff
- wire `@jdevalk/astro-seo-graph` into the scaffold from the beginning

## Still To Be Done

- inventory the indexed WordPress route estate
- decide which WordPress URLs become Astro pages versus redirects
- build any required service, FAQ, and route templates
- confirm deployment target and create the real live repo/project linkage
- perform live cutover only after coverage and redirect evidence are complete

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
