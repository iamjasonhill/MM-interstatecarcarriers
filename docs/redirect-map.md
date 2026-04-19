# Interstate Car Carriers Redirect Map

Last updated: 2026-04-19

This file records the intended redirect and handoff shape for the Astro rebuild. It is not yet a live redirect inventory because the public site still runs on WordPress.

## Confirmed External Handoffs

- primary vehicle quote:
  `https://quoting.interstatecarcarriers.com.au/quote/vehicle`
- contact path:
  `https://quoting.interstatecarcarriers.com.au/contact`

## Planned Page Handling

- homepage `/`
  Astro-owned in the rebuild
- `/sitemap/`
  Astro-owned support page in the rebuild
- legacy quote and contact pages
  expected to resolve to the quoting/contact surfaces rather than stay as long-form WordPress pages

## Known Redirect Planning Gap

The site has a substantial WordPress route-page estate under patterns like `car-transport-*`.

That estate has not been mapped in this scaffold pass yet, so no full redirect schedule should be considered complete until:

- indexed valid URLs are inventoried
- keep-vs-redirect decisions are made
- route templates or redirect rules are written and tested
