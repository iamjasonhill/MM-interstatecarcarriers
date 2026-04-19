export interface SiteLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Stat {
  value: string;
  label: string;
  detail: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  spec: string;
  note: string;
  featured?: boolean;
}

export interface RouteCard {
  route: string;
  note: string;
}

export interface ReasonCard {
  title: string;
  body: string;
}

export interface FooterSection {
  heading: string;
  links: SiteLink[];
}

export interface PublicPage {
  label: string;
  href: string;
  description: string;
}

export interface SupportAction extends PublicPage {
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  domain: string;
  url: string;
  locale: string;
  tagline: string;
  defaultTitle: string;
  defaultDescription: string;
  destinations: {
    vehicleQuote: string;
    contactPage: string;
  };
  primaryCta: SiteLink;
  secondaryCta: SiteLink;
  navigation: SiteLink[];
  footerSections: FooterSection[];
  heroProof: string[];
  heroStats: Stat[];
  serviceCards: ServiceCard[];
  routes: RouteCard[];
  reasons: ReasonCard[];
  publicPages: PublicPage[];
  supportActions: SupportAction[];
  seoAssets: {
    ogImage: string;
    favicon: string;
  };
  brand: {
    primary: string;
    accent: string;
  };
}

export const site: SiteConfig = {
  name: 'Interstate Car Carriers',
  shortName: 'ICC',
  domain: 'interstatecarcarriers.com.au',
  url: 'https://interstatecarcarriers.com.au',
  locale: 'en-AU',
  tagline: 'Australia-wide vehicle transport for standard, prestige, and specialist vehicles.',
  defaultTitle: 'Interstate Car Carriers | Australia-Wide Vehicle Transport',
  defaultDescription:
    'Interstate Car Carriers handles Australia-wide vehicle transport with open carriers, enclosed options, and specialist coordination for standard, prestige, and non-drivable vehicles.',
  destinations: {
    vehicleQuote: 'https://quoting.interstatecarcarriers.com.au/quote/vehicle',
    contactPage: 'https://quoting.interstatecarcarriers.com.au/contact',
  },
  primaryCta: {
    label: 'Get A Vehicle Quote',
    href: 'https://quoting.interstatecarcarriers.com.au/quote/vehicle',
    external: true,
  },
  secondaryCta: {
    label: 'Contact The Quote Team',
    href: 'https://quoting.interstatecarcarriers.com.au/contact',
    external: true,
  },
  navigation: [
    { label: 'Services', href: '#services' },
    { label: 'Routes', href: '#routes' },
    { label: 'Why ICC', href: '#why-icc' },
    { label: 'Sitemap', href: '/sitemap/' },
  ],
  footerSections: [
    {
      heading: 'On this page',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Popular routes', href: '#routes' },
        { label: 'Why ICC', href: '#why-icc' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      heading: 'Site pages',
      links: [
        { label: 'Home', href: '/' },
        { label: 'HTML Sitemap', href: '/sitemap/' },
      ],
    },
    {
      heading: 'External actions',
      links: [
        {
          label: 'Vehicle Quote',
          href: 'https://quoting.interstatecarcarriers.com.au/quote/vehicle',
          external: true,
        },
        {
          label: 'Contact',
          href: 'https://quoting.interstatecarcarriers.com.au/contact',
          external: true,
        },
      ],
    },
  ],
  heroProof: [
    'Open and enclosed transport',
    'Specialist vehicle coordination',
    'Australia-wide carrier network',
  ],
  heroStats: [
    { value: 'Australia-wide', label: 'Route coverage', detail: 'Interstate lanes and capital-city corridors' },
    { value: 'Open + enclosed', label: 'Transport modes', detail: 'Standard and prestige vehicle options' },
    { value: 'Quote first', label: 'Customer flow', detail: 'Fast handoff to the dedicated quoting surface' },
  ],
  serviceCards: [
    {
      title: 'Standard Vehicle Transport',
      description:
        'Open-carrier transport for standard sedans, SUVs, utes, and everyday vehicles moving between major Australian corridors.',
      spec: 'Best for common vehicle types',
      note: 'The most efficient option when timing and value matter more than premium enclosure.',
      featured: true,
    },
    {
      title: 'Enclosed Car Transport',
      description:
        'For prestige, classic, collector, and high-value vehicles that need extra protection in transit.',
      spec: 'Protected vehicle handling',
      note: 'A stronger fit when presentation, paint protection, or collection-value care matters.',
    },
    {
      title: 'Specialist And Non-Drivable',
      description:
        'Support for vehicles that need extra planning, modified-vehicle handling, or specialist loading coordination.',
      spec: 'Special handling pathways',
      note: 'Use the contact pathway when the job needs more than a standard online quote.',
    },
  ],
  routes: [
    { route: 'Sydney to Melbourne', note: 'High-frequency east-coast vehicle lane' },
    { route: 'Brisbane to Sydney', note: 'Private moves, dealer transfers, and relocation demand' },
    { route: 'Melbourne to Brisbane', note: 'Strong household and prestige transport corridor' },
    { route: 'Perth to Adelaide', note: 'Long-haul interstate vehicle movements' },
    { route: 'Adelaide to Melbourne', note: 'Regular south-east freight planning' },
    { route: 'Sydney to Brisbane', note: 'Fast-moving corridor for standard vehicle transport' },
  ],
  reasons: [
    {
      title: 'Quote flow built around real transport jobs',
      body:
        'The homepage now pushes straight into the vehicle quote and contact handoffs instead of making people dig through generic WordPress content first.',
    },
    {
      title: 'Designed for both standard and specialist moves',
      body:
        'The scaffold makes room for standard transport, enclosed transport, and specialist jobs without forcing every enquiry into the same bland lane.',
    },
    {
      title: 'Ready for the route migration work to follow',
      body:
        'This controller starts with the right SEO and deployment contract so we can add route templates and redirects without rebuilding the foundation again.',
    },
  ],
  publicPages: [
    {
      label: 'Home',
      href: '/',
      description: 'Homepage for Interstate Car Carriers with the primary vehicle-transport positioning and quote CTAs.',
    },
    {
      label: 'Vehicle Transport Questions',
      href: '/vehicle-transport-questions/',
      description: 'Single-page FAQ pattern covering common interstate vehicle transport questions.',
    },
    {
      label: 'HTML Sitemap',
      href: '/sitemap/',
      description: 'Human-readable sitemap for the current Astro scaffold.',
    },
  ],
  supportActions: [
    {
      label: 'Vehicle Quote',
      href: 'https://quoting.interstatecarcarriers.com.au/quote/vehicle',
      description: 'Primary quoting surface for standard vehicle transport.',
      external: true,
    },
    {
      label: 'Contact The Quote Team',
      href: 'https://quoting.interstatecarcarriers.com.au/contact',
      description: 'Contact handoff for specialist or higher-touch transport requests.',
      external: true,
    },
  ],
  seoAssets: {
    ogImage: '/og-default.svg',
    favicon: '/favicon.svg',
  },
  brand: {
    primary: '#3a8fd6',
    accent: '#ffb04c',
  },
};

export function toAbsoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
