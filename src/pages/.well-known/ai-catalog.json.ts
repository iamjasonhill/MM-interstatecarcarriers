import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const catalog = {
    specVersion: '1.0',
    host: {
      displayName: "Interstate Car Carriers",
      identifier: "did:web:interstatecarcarriers.com.au",
      url: "https://interstatecarcarriers.com.au/",
    },
    entries: [
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
            "identifier": "urn:ai:interstatecarcarriers.com.au:action:1",
            "displayName": "Interstate Car Carriers Action 1",
            "type": "application/javascript",
            "url": "https://quotes.moveroo.com.au/embed/vehicle-assistant/v1/loader.js"
      }
],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
