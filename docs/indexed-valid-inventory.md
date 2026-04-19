# Interstate Car Carriers Indexed Valid Inventory

Last updated: 2026-04-19

## Status

Not yet complete.

This repo currently contains the homepage/controller scaffold only. The indexed valid WordPress estate still needs to be audited and imported into a proper working inventory.

## What We Know Already

- the current public site is route-heavy
- there are many long-tail `car-transport-*` pages on the WordPress build
- those URLs must be reviewed before cutover so we do not lose coverage unnecessarily
- search results still show historical URLs such as:
  - `/contact-icc/`
  - `/vehicle-transport-questions/`
  - `/enclosed-car-transport-quote/`
  - many `car-transport-{origin}-{destination}/` routes

## Seed URL Groups

### Core utility and commercial pages

- `/`
- `/contact-icc/`
- `/vehicle-transport-questions/`
- `/enclosed-car-transport-quote/`

### Legacy article / advice pages linked from the homepage

- `/car-transport-personal-items-allowed/`
- `/car-transport-express-service/`
- `/interstate-car-transport-by-rail/`
- `/cheapest-interstate-car-transport/`

### Route estate

- many pages under `car-transport-*`
- examples surfaced in search on 2026-04-19 include:
  - `/car-transport-cairns-warrnambool/`
  - `/car-transport-melbourne-sydney/`
  - `/car-transport-melbourne-ballina/`
  - `/car-transport-hobart-geelong/`
  - `/car-transport-adelaide-geelong/`

## Next Inventory Steps

1. export indexed valid URLs from available Search Console or fleet state evidence
2. separate homepage, utility, quote, FAQ, and route URLs
3. mark each URL as:
   - rebuild in Astro
   - redirect to a stronger kept page
   - retire only if there is no SEO or user value
4. attach destination decisions to `docs/redirect-map.md`

## Working Port Recommendation

For the first real migration pass, treat the site as four parallel lanes:

1. homepage and global shell
2. quote/contact handoff cleanup
3. FAQ and evergreen commercial pages
4. route-page preservation or consolidation

That is the cleanest way to use the same process as the other `MM-*` sites without pretending every historical URL deserves a full rebuild.
