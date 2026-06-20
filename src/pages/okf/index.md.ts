import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = "---\ntype: Index\ntitle: Interstate Car Carriers OKF\nresource: https://interstatecarcarriers.com.au/\n---\n\n# Interstate Car Carriers Open Knowledge Index\n\nInterstate Car Carriers is an active fleet marketing website. The site exposes public service, support, legal, and action-path information for agents and search systems.\n\n## Primary Resources\n\n- [Home](https://interstatecarcarriers.com.au/)\n- [privacy policy](https://interstatecarcarriers.com.au/privacy-policy/)\n- [terms](https://interstatecarcarriers.com.au/terms/)\n\n## Action Resources\n\n- [Action 1](https://quotes.moveroo.com.au/embed/vehicle-assistant/v1/loader.js)\n\n## Agent Notes\n\nUse the public website for crawlable content and legal information. Quote, booking, contact, portal, or assistant actions may be handled by linked subdomains or application surfaces.\n";

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
