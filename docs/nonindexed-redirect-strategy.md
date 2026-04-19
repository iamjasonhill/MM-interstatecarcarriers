# Interstate Car Carriers Non-Indexed Redirect Strategy

Last updated: 2026-04-19

This document defines how `interstatecarcarriers.com.au` should handle any non-indexed legacy URL backlog after the indexed route and evergreen lane is fully protected.

## Current Rule

- do not redirect any indexed-valid URL that is already preserved in Astro
- do not redirect any route slug that already exists in the imported source-led route system
- keep quote and contact aliases pointed at the canonical quoting surfaces
- only redirect residual non-indexed URLs once they are confirmed to sit outside the protected indexed set

## Why This Is Needed

The Astro rebuild now protects:

- homepage
- legal pages
- evergreen support pages
- `686` imported route source pages

That means the remaining redirect problem is no longer the indexed lane. It is the leftover non-indexed WordPress debris outside that protected set.

## Redirect Principles

1. Preserve indexed pages exactly.
2. Preserve imported route slugs exactly.
3. Route quote- or contact-like utility pages to the canonical quoting surfaces.
4. Redirect only genuinely retired non-indexed pages.
5. Prefer a useful transport intent destination over a blunt homepage fallback.

## Default Destination Families

- vehicle quote:
  `https://quoting.interstatecarcarriers.com.au/quote/vehicle`
- contact:
  `https://quoting.interstatecarcarriers.com.au/contact`
- homepage:
  `https://interstatecarcarriers.com.au/`

## Planned Redirect Families

### 1. Quote and contact aliases

Examples:

- legacy quote URLs
- legacy contact variants
- outdated booking/contact prompts

Default targets:

- quote-like -> vehicle quote surface
- contact-like -> contact surface

### 2. Duplicate route variants

Examples:

- alternate separators
- duplicate location formatting
- path variants that clearly refer to an existing imported route

Default target:

- redirect to the canonical imported route slug already served by Astro

### 3. Retired weak content

Examples:

- thin, duplicate, or obsolete content that is not indexed and is not worth preserving as evergreen content

Default target:

- strongest relevant evergreen page where intent is clear
- homepage only when no better transport intent destination exists

## Guardrails

- Never redirect a live imported route slug.
- Never redirect an indexed-valid support page.
- Do not use a global catch-all to the homepage.
- Keep Search Console indexed-valid exports as the exclusion list before generating any redirect set.

## Current Status

- strategy defined
- redirect manifest not generated yet
- non-indexed coverage export still needs to be pulled before the first production redirect sweep
