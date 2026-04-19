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
- `/terms/`
- `/privacy-policy/`

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

Status update:

- these pages now exist in the Astro rebuild as first-class pages
- redirect planning for them is no longer a blocker for the Astro build itself

### Route pages

- `car-transport-*`
  current implementation: imported source-led Astro route system
  pattern decision: use the Sydney-to-Melbourne route as the originating base pattern, then render the indexed lane through the dynamic route template with corridor-aware copy logic
  current status:
  - `686` route source files imported
  - `688` indexed `car-transport-*` URLs accounted for operationally
  - the two non-route exceptions are:
    - `/car-transport-express-service/`
    - `/car-transport-personal-items-allowed/`

## Technical SEO Replacements Required On Day One

The Astro cutover must replace broken production files with working equivalents:

- `/robots.txt`
- `/sitemap-index.xml`
- internal navigation that does not point users into dead `404` content URLs

## Remaining Redirect Planning Gap

The site still needs a final launch-ready redirect decision for any legacy URLs that will not remain Astro-owned after cutover.

That means the remaining redirect work is now:

- verify whether any inherited WordPress pages outside the current Astro build need explicit redirects
- confirm quote/contact legacy aliases on preview and production
- verify live redirect behavior after cutover
