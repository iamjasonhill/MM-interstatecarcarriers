# Interstate Car Carriers Non-Indexed Redirect Report

Last updated: 2026-04-19

This report is the placeholder summary for the non-indexed legacy backlog that remains outside the preserved Astro lane.

## Current State

- indexed-valid route and evergreen coverage is already protected in Astro
- no non-indexed redirect manifest has been generated yet
- unresolved non-indexed URL count is still pending a dedicated Search Console export

## What Is Already Protected

- homepage
- legal pages
- evergreen support pages
- `686` imported route source pages
- the two indexed support-page exceptions outside the route lane:
  - `/car-transport-express-service/`
  - `/car-transport-personal-items-allowed/`

## Remaining Work

1. Pull the non-indexed Search Console export.
2. Exclude all preserved indexed-valid URLs.
3. Exclude all imported route slugs already owned by Astro.
4. Bucket the remainder into:
   - quote/contact aliases
   - duplicate route variants
   - weak retired content
5. Generate a launch-ready redirect manifest from those families.

## Current Recommendation

Do not generate production redirects for ICC until the non-indexed export is in hand. The indexed lane is already protected, so the next redirect pass should be driven by real backlog evidence rather than assumptions.
