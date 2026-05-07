import type { APIRoute } from 'astro';
import { site } from '../config/site';

export const prerender = true;

export const GET: APIRoute = () => {
  const baseUrl = site.url.replace(/\/$/, '');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${baseUrl}/sitemap-0.xml</loc>\n  </sitemap>\n</sitemapindex>\n`;

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
    },
  });
};
