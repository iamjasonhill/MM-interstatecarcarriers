import rss from '@astrojs/rss';
import { site } from '../config/site';

const feedPages = site.publicPages.filter(
  (page) =>
    !['/', '/privacy-policy/', '/terms/', '/sitemap/'].includes(page.href) &&
    !page.href.startsWith('/car-transport-'),
);

export function GET(context: { site?: string | URL }) {
  return rss({
    title: `${site.name} Vehicle Transport Guides`,
    description:
      'Interstate vehicle transport guides, service explainers, and planning content from Interstate Car Carriers.',
    site: context.site ?? site.url,
    items: feedPages.map((page) => ({
      title: page.label,
      description: page.description,
      link: page.href,
      customData: `<language>${site.locale}</language>`,
    })),
    customData: `<language>${site.locale}</language>`,
  });
}
