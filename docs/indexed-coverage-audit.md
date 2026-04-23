# Indexed Coverage Audit

Issue: `iamjasonhill/MM-interstatecarcarriers#1`

## Purpose

Normalize the indexed-valid inventory into a closeout-friendly audit that separates what Astro now owns from what was intentionally retired or redirected.

## Source Evidence

- Search Console indexed-valid export reviewed on 2026-04-19
- current Astro build output from 2026-04-23
- live redirect decision for `/contact-icc/`

## Coverage Summary

- indexed-valid URLs in the export: `698`
- main-domain indexed-valid URLs: `695`
- route-pattern URLs: `688`
- related subdomain login URLs: `3`
- Astro build output pages: `696`

## Astro-Owned Public Surface

- homepage `/`
- legal pages:
  - `/privacy-policy/`
  - `/terms/`
- support pages:
  - `/vehicle-transport-questions/`
  - `/car-transport-personal-items-allowed/`
  - `/car-transport-express-service/`
  - `/interstate-car-transport-by-rail/`
  - `/cheapest-interstate-car-transport/`
  - `/enclosed-car-transport-quote/`
- imported route archive:
  - `686` route source entries under `src/data/routes/source/`

## Redirected Or Retired

- `/contact-icc/` -> `https://quoting.interstatecarcarriers.com.au/contact`

## Notes

- The indexed-valid estate is now protected by Astro rather than by WordPress.
- The remaining closeout work is operational publication and final live verification, not additional content discovery.

