# Interstate Car Carriers Migration Ledger

Last updated: 2026-04-23

## Scope

This repo now exists as the active Astro rebuild controller for `interstatecarcarriers.com.au`.

Current position:

- live public site is Astro
- Astro rebuild now exists locally at `/Users/jasonhill/Projects/Business/websites/MM-interstatecarcarriers.com.au`
- canonical new-build baseline includes `@jdevalk/astro-seo-graph`, sitemap generation, dynamic robots, and fleet-standard repo paperwork
- canonical new-build baseline now also includes the shared analytics adapter and repo-contract validation so analytics cannot silently drift out of the build

## Source Inputs Used

- live public homepage and key quote paths on `https://interstatecarcarriers.com.au`
- `_wp-house/sites/interstatecarcarriers-com-au.json`
- `fleet-control/data/state/properties.json`
- hardened Meridian transport starter from `/Users/jasonhill/Projects/Business/websites/tmp/meridian-transport`
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
- adopt the shared analytics adapter from the fleet starter and expose a local `check:contract` command so analytics presence is enforced in code, not just described in docs

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
- `npm run check:contract` passes
- `npm run build` passes
- `@jdevalk/astro-seo-graph` checks are clean on the full build
- the shared analytics adapter is now wired into the document shell and ready for provider values

## Still To Be Done

- confirm the deployed output after publishing the committed closeout state
- extend production verification beyond the first sampled checks if new routes are added
- keep redirect coverage in sync with any later legacy URL discoveries
- update `_wp-house` and cutover paperwork if the operating model changes again

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

- the public Vercel output needs a fresh publish from the committed state to fully reflect the repo changes
- production verification should be rerun after publish so the deployed output can be treated as final

## Live Production Findings On 2026-04-23

Confirmed with direct public checks:

- homepage `/` renders the Astro homepage shell
- the production build output contains GA4 wiring with measurement ID `G-G4FXNJBHPM`
- `/contact-icc/` is intentionally redirected to `https://quoting.interstatecarcarriers.com.au/contact`
- the live public site is now a stable Astro content surface

Operational interpretation:

- quote and contact handoff already belong to the quoting platform, not the WordPress site
- rebuilding this property in Astro is not only a design migration, it is also a production cleanup of broken technical SEO and broken internal-link paths
- WordPress has been retired as the production controller

