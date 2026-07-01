import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const payload = {
  "specVersion": "1.0",
  "host": {
    "displayName": "Interstate Car Carriers",
    "identifier": "did:web:interstatecarcarriers.com.au",
    "url": "https://interstatecarcarriers.com.au/"
  },
  "canonicalQuoteHost": "https://quoting.interstatecarcarriers.com.au",
  "entries": [
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:web:home",
      "displayName": "Interstate Car Carriers Website",
      "type": "text/html",
      "url": "https://interstatecarcarriers.com.au/"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:llms",
      "displayName": "Interstate Car Carriers LLM guidance",
      "type": "text/plain",
      "url": "https://interstatecarcarriers.com.au/llms.txt"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:markdown:index",
      "displayName": "Interstate Car Carriers Markdown summary",
      "type": "text/markdown",
      "url": "https://interstatecarcarriers.com.au/index.md"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:agent-skills:index",
      "displayName": "Interstate Car Carriers Agent Skills Index",
      "type": "application/json",
      "url": "https://interstatecarcarriers.com.au/.well-known/agent-skills/index.json"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:agents:guide",
      "displayName": "Interstate Car Carriers Agent/API Guide",
      "type": "text/html",
      "url": "https://interstatecarcarriers.com.au/agents/"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:household",
      "displayName": "Household Quote",
      "type": "text/html",
      "url": "https://quoting.interstatecarcarriers.com.au/quote/household"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:vehicle",
      "displayName": "Vehicle Quote",
      "type": "text/html",
      "url": "https://quoting.interstatecarcarriers.com.au/quote/vehicle"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:contact",
      "displayName": "Contact",
      "type": "text/html",
      "url": "https://quoting.interstatecarcarriers.com.au/contact"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:capability",
      "displayName": "Quote Capability Manifest",
      "type": "application/json",
      "url": "https://quoting.interstatecarcarriers.com.au/quote-capability.json"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:openapi",
      "displayName": "Quote OpenAPI Schema",
      "type": "application/vnd.oai.openapi+json",
      "url": "https://quoting.interstatecarcarriers.com.au/openapi.json"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:household-public-agent-api",
      "displayName": "Household Quote Public Agent API",
      "type": "application/json",
      "url": "https://quoting.interstatecarcarriers.com.au/api/v1/household-quotes/assistant/submit"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:vehicle-public-agent-api",
      "displayName": "Vehicle Quote Public Agent API",
      "type": "application/json",
      "url": "https://quoting.interstatecarcarriers.com.au/api/v1/vehicle-quotes/assistant/submit"
    },
    {
      "identifier": "urn:ai:interstatecarcarriers.com.au:quote:callback-public-agent-api",
      "displayName": "Callback Public Agent API",
      "type": "application/json",
      "url": "https://quoting.interstatecarcarriers.com.au/api/v1/callbacks/assistant/request"
    }
  ]
};

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
