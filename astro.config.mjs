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
        filter: (url) => !url.endsWith('/404/'),
      },
    }),
  ],
  adapter: vercel(),
});
