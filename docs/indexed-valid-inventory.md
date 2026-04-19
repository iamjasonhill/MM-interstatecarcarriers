# Interstate Car Carriers Indexed Valid Inventory

Last updated: 2026-04-19

## Status

Not yet complete.

This repo currently contains the homepage/controller scaffold only. The indexed valid WordPress estate still needs to be audited and imported into a proper working inventory.

## What We Know Already

- the current public site is route-heavy
- there are many long-tail `car-transport-*` pages on the WordPress build
- those URLs must be reviewed before cutover so we do not lose coverage unnecessarily

## Next Inventory Steps

1. export indexed valid URLs from available Search Console or fleet state evidence
2. separate homepage, utility, quote, FAQ, and route URLs
3. mark each URL as:
   - rebuild in Astro
   - redirect to a stronger kept page
   - retire only if there is no SEO or user value
4. attach destination decisions to `docs/redirect-map.md`
