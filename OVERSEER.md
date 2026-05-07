# OVERSEER

## Change Log

### 2026-05-08 08:08 AEST

- Issue: iamjasonhill/MM-fleet-program#47, `[CONTROL] Domain Monitor findings: interstatecarcarriers.com.au`
- Trigger: Control / Domain Monitor reported the live property missing `/sitemap.xml` even though `/sitemap-index.xml` was live.
- Changed: added `/sitemap.xml` as a sitemap-index alias and updated robots output to advertise both sitemap endpoints.
- Fixed: generated `dist/sitemap.xml` now points at `https://interstatecarcarriers.com.au/sitemap-0.xml`, and generated robots lists both `/sitemap.xml` and `/sitemap-index.xml`.
- Verification: `npm run build`, `npm run check:seo`, and `npm run check` passed; `astro check` reports 0 errors and 1 existing hint in `scripts/import-icc-route-sources.mjs`.
- Remaining: deploy to production and ask Control / Domain Monitor to refresh the readiness signal.

### 2026-04-23 12:09 AEST

- Issue: iamjasonhill/MM-interstatecarcarriers#1, `[Bossman] Complete Interstate Car Carriers cutover closeout`
- Trigger: repo-owned closeout for the Interstate Car Carriers cutover loop
- Changed: added durable closeout paperwork, normalized indexed coverage notes, and codified the legacy `/contact-icc/` redirect decision in the repo
- Fixed: stale notes that still described WordPress as the live controller were updated toward the Astro-live state
- Remaining: none in repo; close the GitHub issue now that production GA4 and `/contact-icc/` redirect behavior have been verified
