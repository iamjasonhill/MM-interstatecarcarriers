import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const catalog = {
  "specVersion": "1.0",
  "host": {
    "displayName": "Interstate Car Carriers",
    "identifier": "did:web:interstatecarcarriers.com.au",
    "url": "https://interstatecarcarriers.com.au/"
  },
  "entries": [
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:web:home",
      "displayName": "Interstate Car Carriers Website",
      "type": "text/html",
      "url": "https://interstatecarcarriers.com.au/"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:okf:index",
      "displayName": "Interstate Car Carriers Open Knowledge Index",
      "type": "text/markdown",
      "url": "https://interstatecarcarriers.com.au/okf/index.md"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:household",
      "displayName": "Interstate Car Carriers Household Quote",
      "type": "text/html",
      "url": "https://quoting.interstatecarcarriers.com.au/quote/household"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:vehicle",
      "displayName": "Interstate Car Carriers Vehicle Quote",
      "type": "text/html",
      "url": "https://quoting.interstatecarcarriers.com.au/quote/vehicle"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:contact",
      "displayName": "Interstate Car Carriers Contact",
      "type": "text/html",
      "url": "https://quoting.interstatecarcarriers.com.au/contact"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:capability",
      "displayName": "Interstate Car Carriers Quote Capability Manifest",
      "type": "application/json",
      "url": "https://quoting.interstatecarcarriers.com.au/quote-capability.json"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:ai-catalog",
      "displayName": "Interstate Car Carriers Quote Host AI Catalog",
      "type": "application/json",
      "url": "https://quoting.interstatecarcarriers.com.au/.well-known/ai-catalog.json"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:human-guide",
      "displayName": "Interstate Car Carriers Human Guide For Agents",
      "type": "text/html",
      "url": "https://quoting.interstatecarcarriers.com.au/agents"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:household-api",
      "displayName": "Interstate Car Carriers Household Quote Public Agent API",
      "type": "application/json",
      "method": "POST",
      "url": "https://quoting.interstatecarcarriers.com.au/api/v1/household-quotes/assistant/submit"
    }
  ]
};

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
