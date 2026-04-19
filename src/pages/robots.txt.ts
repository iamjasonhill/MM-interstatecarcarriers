import type { APIRoute } from 'astro';

const siteUrl =
  import.meta.env.PUBLIC_SITE_URL ||
  import.meta.env.SITE_URL ||
  'https://interstatecarcarriers.com.au';

const body = [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap-index.xml`,
  '',
].join('\n');

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
