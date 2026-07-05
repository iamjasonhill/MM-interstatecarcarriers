import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `# Interstate Car Carriers

> Interstate Car Carriers publishes agent-readable discovery resources for customer-authorised household moving quotes, vehicle transport quotes, callbacks, and quote API documentation.

## Contact
Website: https://interstatecarcarriers.com.au
Contact: https://quoting.interstatecarcarriers.com.au/contact
Quote system: https://quoting.interstatecarcarriers.com.au/

## Key Pages
- [Homepage](https://interstatecarcarriers.com.au/): Main site entry point for Interstate Car Carriers services.
- [Agent/API documentation](https://interstatecarcarriers.com.au/agents/): Human-readable guide for approved AI assistants and developers.
- [Agent/API examples](https://interstatecarcarriers.com.au/agents/examples/): Example quote, vehicle, and callback payloads.
- [XML sitemap](https://interstatecarcarriers.com.au/sitemap.xml): Crawlable page inventory for search engines and agents.
- [Privacy policy](https://interstatecarcarriers.com.au/privacy-policy/): Privacy and data-handling policy.
- [Terms and conditions](https://interstatecarcarriers.com.au/terms/): Site and service terms.

## Human Quote Flows
- [Household quote form](https://quoting.interstatecarcarriers.com.au/quote/household): Customer-facing household removal quote workflow.
- [Vehicle quote form](https://quoting.interstatecarcarriers.com.au/quote/vehicle): Customer-facing vehicle transport quote workflow.
- [Contact page](https://quoting.interstatecarcarriers.com.au/contact): Contact and callback entry point.

## Agent/API Resources
- [Markdown summary](https://interstatecarcarriers.com.au/index.md): Agent-readable markdown summary of the marketing site and quote actions.
- [AI catalog](https://interstatecarcarriers.com.au/.well-known/ai-catalog.json): Machine-readable catalog of public agent resources.
- [Agent skills index](https://interstatecarcarriers.com.au/.well-known/agent-skills/index.json): Machine-readable skill discovery index.
- [OpenAPI alias](https://interstatecarcarriers.com.au/openapi.json): Marketing-domain alias for the canonical quote OpenAPI schema.
- [Quote capability alias](https://interstatecarcarriers.com.au/quote-capability.json): Marketing-domain alias for the quote capability manifest.
- [AI plugin alias](https://interstatecarcarriers.com.au/.well-known/ai-plugin.json): Marketing-domain alias for AI plugin compatibility metadata.
- [Canonical Agent/API guide](https://quoting.interstatecarcarriers.com.au/agents): Quote-host source of truth for API usage.
- [Canonical OpenAPI schema](https://quoting.interstatecarcarriers.com.au/openapi.json): Canonical public quote API schema.
- [Canonical quote capability manifest](https://quoting.interstatecarcarriers.com.au/quote-capability.json): Canonical supported operations and quote capabilities.
- [Quote host LLM guidance](https://quoting.interstatecarcarriers.com.au/llms.txt): Quote-host LLM guidance.

## Public Agent API Endpoints
- [Household quote API](https://quoting.interstatecarcarriers.com.au/api/v1/household-quotes/assistant/submit): Submit a customer-authorised household quote request.
- [Vehicle quote API](https://quoting.interstatecarcarriers.com.au/api/v1/vehicle-quotes/assistant/submit): Submit a customer-authorised vehicle transport quote request.
- [Callback request API](https://quoting.interstatecarcarriers.com.au/api/v1/callbacks/assistant/request): Request a customer-authorised callback.

## Ownership Notes
- This marketing site is owned by the Interstate Car Carriers Astro repository.
- The quote host is the source of truth for API execution, OpenAPI schemas, and capability manifests.
- Agents may read these resources for customer-authorised quote discovery and may only submit quote or callback requests when the customer has asked for that action.
- Public host-aware API submissions should omit tenant unless Moveroo has supplied an agreed tenant slug.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
