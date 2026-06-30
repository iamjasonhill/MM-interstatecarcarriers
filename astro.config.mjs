import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import seoGraph from '@jdevalk/astro-seo-graph/integration';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://interstatecarcarriers.com.au',
  output: 'static',
  compressHTML: true,
  build: {
    assets: '_assets',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/404/') &&
        !page.endsWith('.md') &&
        !page.includes('/schema/') &&
        !page.endsWith('/schemamap.xml'),
    }),
    seoGraph({
      validateH1: true,
      validateUniqueMetadata: true,
      validateImageAlt: true,
      validateMetadataLength: true,
      validateInternalLinks: true,
      llmsTxt: {
        title: 'Interstate Car Carriers',
        siteUrl: 'https://interstatecarcarriers.com.au',
        summary:
          'Interstate Car Carriers provides Australia-wide vehicle transport information, quote pathways, and specialist transport guidance.',
        details:
          'This Astro scaffold currently covers the homepage shell, sitemap support, and the main quote and contact handoffs for Interstate Car Carriers.',
        sections: [
          {
            name: 'Quote Capability For Agents',
            links: [
              {
                title: 'Household Quote',
                url: 'https://quoting.interstatecarcarriers.com.au/quote/household',
                description: 'Household removals quote handoff on the site-owned quote subdomain.',
              },
              {
                title: 'Vehicle Quote',
                url: 'https://quoting.interstatecarcarriers.com.au/quote/vehicle',
                description: 'Vehicle transport quote handoff on the site-owned quote subdomain.',
              },
              {
                title: 'Contact',
                url: 'https://quoting.interstatecarcarriers.com.au/contact',
                description: 'Customer contact surface on the site-owned quote subdomain.',
              },
              {
                title: 'Quote Capability Manifest',
                url: 'https://quoting.interstatecarcarriers.com.au/quote-capability.json',
                description: 'Machine-readable public quote capability contract.',
              },
              {
                title: 'AI Catalog',
                url: 'https://quoting.interstatecarcarriers.com.au/.well-known/ai-catalog.json',
                description: 'Machine-readable catalog for quote-host agent resources.',
              },
              {
                title: 'Human Guide For Agents',
                url: 'https://quoting.interstatecarcarriers.com.au/agents',
                description: 'Human-readable guide for agent-assisted quote intake.',
              },
              {
                title: 'Household Quote Public Agent API',
                url: 'https://quoting.interstatecarcarriers.com.au/api/v1/household-quotes/assistant/submit',
                description: 'Host-aware household quote intake API, no tenant required.',
              }
            ],
          },
        ],
        filter: (url) => !url.endsWith('/404/'),
      },
    }),
  ],
  adapter: vercel(),
});
