import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const payload = {
  "$schema": "https://interstatecarcarriers.com.au/.well-known/agent-skills/schema.json",
  "version": "2026-07-01",
  "publisher": {
    "name": "Interstate Car Carriers",
    "url": "https://interstatecarcarriers.com.au/",
    "agentGuide": "https://interstatecarcarriers.com.au/agents/",
    "openApi": "https://interstatecarcarriers.com.au/openapi.json"
  },
  "canonicalQuoteHost": "https://quoting.interstatecarcarriers.com.au",
  "skills": [
    {
      "id": "interstatecarcarriers-com-au.household_quote",
      "name": "Household removal quote",
      "type": "quote_request",
      "description": "Collect a customer-authorised household removal quote request through the official Interstate Car Carriers quote API.",
      "url": "https://interstatecarcarriers.com.au/agents/",
      "openApi": "https://interstatecarcarriers.com.au/openapi.json",
      "capabilityManifest": "https://interstatecarcarriers.com.au/quote-capability.json",
      "examples": "https://interstatecarcarriers.com.au/agents/examples/",
      "executionHost": "https://quoting.interstatecarcarriers.com.au",
      "endpoint": "https://quoting.interstatecarcarriers.com.au/api/v1/household-quotes/assistant/submit",
      "consentRequired": true
    },
    {
      "id": "interstatecarcarriers-com-au.vehicle_quote",
      "name": "Vehicle transport quote",
      "type": "quote_request",
      "description": "Collect a customer-authorised vehicle transport quote request through the official Interstate Car Carriers quote API.",
      "url": "https://interstatecarcarriers.com.au/agents/",
      "openApi": "https://interstatecarcarriers.com.au/openapi.json",
      "capabilityManifest": "https://interstatecarcarriers.com.au/quote-capability.json",
      "examples": "https://interstatecarcarriers.com.au/agents/examples/",
      "executionHost": "https://quoting.interstatecarcarriers.com.au",
      "endpoint": "https://quoting.interstatecarcarriers.com.au/api/v1/vehicle-quotes/assistant/submit",
      "consentRequired": true
    },
    {
      "id": "interstatecarcarriers-com-au.callback_request",
      "name": "Callback request",
      "type": "contact_request",
      "description": "Request a customer-authorised Interstate Car Carriers callback through the official quote host contact API.",
      "url": "https://interstatecarcarriers.com.au/agents/",
      "openApi": "https://interstatecarcarriers.com.au/openapi.json",
      "capabilityManifest": "https://interstatecarcarriers.com.au/quote-capability.json",
      "examples": "https://interstatecarcarriers.com.au/agents/examples/",
      "executionHost": "https://quoting.interstatecarcarriers.com.au",
      "endpoint": "https://quoting.interstatecarcarriers.com.au/api/v1/callbacks/assistant/request",
      "consentRequired": true
    },
    {
      "id": "interstatecarcarriers-com-au.agent_discovery",
      "name": "Agent/API documentation discovery",
      "type": "documentation",
      "description": "Read public Interstate Car Carriers agent guidance, capability metadata, OpenAPI aliases, and integration examples.",
      "url": "https://interstatecarcarriers.com.au/agents/",
      "openApi": "https://interstatecarcarriers.com.au/openapi.json",
      "capabilityManifest": "https://interstatecarcarriers.com.au/quote-capability.json",
      "examples": "https://interstatecarcarriers.com.au/agents/examples/",
      "consentRequired": false
    }
  ],
  "operatingRules": {
    "customerConsentRequired": "Quote and callback submissions require the customer to ask for the action and include customer_consent.confirmed=true.",
    "tenant": "Public submissions are host-aware. Omit tenant unless Moveroo has supplied an agreed tenant slug.",
    "canonicalContract": "Use the quote host OpenAPI schema, capability manifest, agent guide, and examples as the source of truth."
  }
};

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
