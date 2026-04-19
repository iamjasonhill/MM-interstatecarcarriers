# Interstate Car Carriers Indexed Valid Inventory

Last updated: 2026-04-19

## Status

Coverage export reviewed.

The indexed-valid export from `interstatecarcarriers.com.au-Coverage-Valid-2026-04-19.zip` shows that this property is overwhelmingly route-led. We now have a reliable count for the current indexed-valid estate and can split it into the right migration lanes.

## Indexed Valid Summary

- total indexed-valid URLs in the export: `698`
- main domain indexed-valid URLs: `695`
- related subdomain login URLs indexed-valid: `3`
- main domain homepage: `1`
- main domain clearly non-route utility/content pages: `6`
- main domain `car-transport-*` URLs: `688`

## Related Subdomain URLs

These are in the indexed-valid export but should not be treated as part of the public content import:

- `https://transport.interstatecarcarriers.com.au/login`
- `https://quotes.interstatecarcarriers.com.au/login`
- `https://routecalc.interstatecarcarriers.com.au/login`

They are a separate technical SEO cleanup issue.

## Main Domain Indexed Pages

### Homepage

- `/`

### Clearly indexed utility and commercial pages

- `/contact-icc/`
- `/vehicle-transport-questions/`
- `/enclosed-car-transport-quote/`
- `/cheapest-interstate-car-transport/`
- `/interstate-car-transport-by-rail/`
- `/terms/`

### `car-transport-*` estate

The export contains `688` indexed-valid URLs under the `car-transport-*` pattern.

That bucket includes:

- the large origin/destination route estate
- at least some evergreen advice/commercial pages that also use the `car-transport-*` prefix, including:
  - `/car-transport-personal-items-allowed/`
  - `/car-transport-express-service/`

So the route-pattern bucket should not be treated as one thing. It contains both:

- pages we likely want to rebuild as evergreen content
- pages that belong to the dedicated route-lane migration

## What This Means

- the site is not mainly a homepage-plus-few-pages migration
- it is primarily a route-estate migration with a smaller content/core-page layer around it
- the next import batch should focus on the indexed evergreen/content pages before touching the bulk route lane
- route pages need their own preservation and consolidation strategy, not ad hoc page-by-page importing

## First Import Candidates From Indexed Valid

These are the strongest next candidates because they are indexed-valid and fit the page patterns we have already built:

- `/cheapest-interstate-car-transport/`
- `/interstate-car-transport-by-rail/`
- `/car-transport-personal-items-allowed/`
- `/car-transport-express-service/`

The already-started Astro pages in the current repo also line up with indexed-valid reality:

- `/vehicle-transport-questions/`
- `/enclosed-car-transport-quote/`

## Route Lane Note

The `688` indexed-valid `car-transport-*` URLs should be exported again into a dedicated route inventory later, then grouped by:

- top-value corridors
- duplicate or near-duplicate route patterns
- redirect candidates
- pages worth preserving as standalone route landers

Do not mix that route audit into the next small content import batch.

## Next Inventory Steps

1. keep the indexed-valid core/content set separate from the route estate
2. import the next small batch of indexed evergreen/content pages into Astro
3. mark each imported URL as:
   - rebuild in Astro
   - redirect to a stronger kept page
   - retire only if there is no SEO or user value
4. create a separate route inventory for the `car-transport-*` bulk estate
5. attach destination decisions to `docs/redirect-map.md`

## Working Port Recommendation

For the first real migration pass, treat the site as four parallel lanes:

1. homepage and global shell
2. quote/contact handoff cleanup
3. FAQ and evergreen commercial pages
4. route-page preservation or consolidation

That is the cleanest way to use the same process as the other `MM-*` sites without pretending every historical URL deserves a full rebuild.
