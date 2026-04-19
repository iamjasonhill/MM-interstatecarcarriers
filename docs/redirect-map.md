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

## Initial Redirect Decisions

These are the first working assumptions based on the live-site checks from 2026-04-19.

### Keep in Astro

- `/`
- `/sitemap/`

### Redirect to quoting/contact surface

- `/contact-icc/` -> `https://quoting.interstatecarcarriers.com.au/contact`
- `/enclosed-car-transport-quote/` -> likely `https://quoting.interstatecarcarriers.com.au/contact`
  Reason: the current WordPress URL returns `404`, so the Astro rebuild should replace that broken path with a useful handoff.

### Rebuild or consolidate into stronger evergreen pages

- `/vehicle-transport-questions/`
- `/car-transport-personal-items-allowed/`
- `/car-transport-express-service/`
- `/interstate-car-transport-by-rail/`
- `/cheapest-interstate-car-transport/`

These should not be blindly restored one-for-one without checking search demand and internal-link value, but they are good candidates for a smaller evergreen content set in Astro.

### Route pages

- `car-transport-*`
  decision not yet made
  working assumption: keep the strongest indexed routes, consolidate weak duplicates, redirect anything thin or broken

## Technical SEO Replacements Required On Day One

The Astro cutover must replace broken production files with working equivalents:

- `/robots.txt`
- `/sitemap-index.xml`
- internal navigation that does not point users into dead `404` content URLs

## Known Redirect Planning Gap

The site has a substantial WordPress route-page estate under patterns like `car-transport-*`.

That estate has not been mapped in this scaffold pass yet, so no full redirect schedule should be considered complete until:

- indexed valid URLs are inventoried
- keep-vs-redirect decisions are made
- route templates or redirect rules are written and tested
