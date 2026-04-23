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
  pathway: string;
  featured?: boolean;
}

export interface RouteCard {
  route: string;
  note: string;
  href?: string;
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

export interface LegalPage extends SiteLink {
  description?: string;
}

export interface AnalyticsConfig {
  enabled: boolean;
  provider: string | null;
  config: Record<string, string>;
  siteKey?: string;
  trackedLinks?: Array<{ href: string; eventName: string }>;
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
  legalPages: LegalPage[];
  seoAssets: {
    ogImage: string;
    favicon: string;
  };
  brand: {
    primary: string;
    accent: string;
  };
  analytics: AnalyticsConfig;
}

function parseJsonRecord(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null;
    }

    return Object.fromEntries(
      Object.entries(parsed).map(([key, item]) => [key, item == null ? '' : String(item)]),
    );
  } catch {
    return null;
  }
}

const ANALYTICS_SITE_KEY = 'interstatecarcarriers';
const ANALYTICS_TRACKED_LINKS = [
  {
    href: 'https://quoting.interstatecarcarriers.com.au/quote/vehicle',
    eventName: 'quote_vehicle_click',
  },
  {
    href: 'https://quoting.interstatecarcarriers.com.au/contact',
    eventName: 'quote_contact_click',
  },
];

function resolveAnalyticsConfig(): AnalyticsConfig {
  const analyticsEnabled = import.meta.env.PUBLIC_ANALYTICS_ENABLED;
  const analyticsProvider = import.meta.env.PUBLIC_ANALYTICS_PROVIDER;
  const analyticsConfig = parseJsonRecord(import.meta.env.PUBLIC_ANALYTICS_CONFIG);

  if (analyticsProvider && analyticsConfig) {
    return {
      enabled: analyticsEnabled ? analyticsEnabled === 'true' : true,
      provider: analyticsProvider,
      config: analyticsConfig,
      siteKey: ANALYTICS_SITE_KEY,
      trackedLinks: ANALYTICS_TRACKED_LINKS,
    };
  }

  const gaMeasurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID || 'G-G4FXNJBHPM';
  const gaTagUrl = import.meta.env.PUBLIC_GA_TAG_URL || '';
  const gaSendPageView = import.meta.env.PUBLIC_GA_SEND_PAGE_VIEW || '';
  const gaAnonymizeIp = import.meta.env.PUBLIC_GA_ANONYMIZE_IP || '';

  if (gaMeasurementId) {
    return {
      enabled: analyticsEnabled ? analyticsEnabled === 'true' : true,
      provider: 'ga4',
      config: {
        measurement_id: gaMeasurementId,
        ...(gaTagUrl ? { tag_url: gaTagUrl } : {}),
        ...(gaSendPageView ? { send_page_view: gaSendPageView } : {}),
        ...(gaAnonymizeIp ? { anonymize_ip: gaAnonymizeIp } : {}),
        site_key: ANALYTICS_SITE_KEY,
      },
      siteKey: ANALYTICS_SITE_KEY,
      trackedLinks: ANALYTICS_TRACKED_LINKS,
    };
  }

  const matomoBaseUrl = import.meta.env.PUBLIC_MATOMO_BASE_URL || '';
  const matomoSiteId = import.meta.env.PUBLIC_MATOMO_SITE_ID || '';

  if (matomoBaseUrl && matomoSiteId) {
    return {
      enabled: true,
      provider: 'matomo',
      config: {
        base_url: matomoBaseUrl,
        site_id: matomoSiteId,
      },
      siteKey: ANALYTICS_SITE_KEY,
      trackedLinks: ANALYTICS_TRACKED_LINKS,
    };
  }

  return {
    enabled: false,
    provider: null,
    config: {},
    siteKey: ANALYTICS_SITE_KEY,
    trackedLinks: ANALYTICS_TRACKED_LINKS,
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
    { label: 'Contact', href: 'https://quoting.interstatecarcarriers.com.au/contact', external: true },
    { label: 'Sitemap', href: '/sitemap/' },
  ],
  footerSections: [
    {
      heading: 'On this page',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Popular routes', href: '#routes' },
        { label: 'Why ICC', href: '#why-icc' },
        { label: 'Contact', href: 'https://quoting.interstatecarcarriers.com.au/contact', external: true },
      ],
    },
    {
      heading: 'Site pages',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Privacy Policy', href: '/privacy-policy/' },
        { label: 'Terms Of Use', href: '/terms/' },
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
      note: 'Usually the most practical option when the move is straightforward and cost matters.',
      pathway: 'Best for standard interstate vehicle moves',
      featured: true,
    },
    {
      title: 'Enclosed Car Transport',
      description:
        'For prestige, classic, collector, and high-value vehicles that need extra protection in transit.',
      spec: 'Protected vehicle handling',
      note: 'A stronger fit when finish, presentation, and extra protection are part of the decision.',
      pathway: 'Built for prestige and presentation-sensitive vehicles',
    },
    {
      title: 'Specialist And Non-Drivable',
      description:
        'Support for vehicles that need extra planning, modified-vehicle handling, or specialist loading coordination.',
      spec: 'Special handling pathways',
      note: 'A better option for modified, non-drivable, or more unusual transport jobs.',
      pathway: 'Speak with the team before booking',
    },
  ],
  routes: [
    { route: 'Sydney to Melbourne', note: 'High-frequency east-coast vehicle lane', href: '/car-transport-sydney-melbourne/' },
    { route: 'Brisbane to Sydney', note: 'Private moves, dealer transfers, and relocation demand' },
    { route: 'Melbourne to Brisbane', note: 'Strong household and prestige transport corridor' },
    { route: 'Perth to Adelaide', note: 'Long-haul interstate vehicle movements', href: '/car-transport-perth-adelaide/' },
    { route: 'Adelaide to Melbourne', note: 'Regular south-east freight planning' },
    { route: 'Sydney to Brisbane', note: 'Fast-moving corridor for standard vehicle transport' },
  ],
  reasons: [
    {
      title: 'Straightforward jobs can move quickly',
      body:
        'For standard vehicle moves with a known route and vehicle type, the online quote is usually the fastest and cleanest first step.',
    },
    {
      title: 'Some vehicles need a proper conversation first',
      body:
        'Non-drivable vehicles, prestige handling, and unusual pickup conditions are better discussed with the team before the booking path is locked in.',
    },
    {
      title: 'Good transport planning is more than just a cheap number',
      body:
        'The right transport lane depends on the corridor, the vehicle, and how much care the move needs from pickup through delivery.',
    },
  ],
  publicPages: [
    {
      label: 'Home',
      href: '/',
      description: 'Homepage for Interstate Car Carriers with the primary vehicle-transport positioning and quote CTAs.',
    },
    {
      label: 'Enclosed Car Transport',
      href: '/enclosed-car-transport-quote/',
      description: 'Service page for enclosed interstate vehicle transport when protection and presentation matter most.',
    },
    {
      label: 'Vehicle Transport Questions',
      href: '/vehicle-transport-questions/',
      description: 'FAQ page covering common interstate vehicle transport questions.',
    },
    {
      label: 'Personal Items In Car Transport',
      href: '/car-transport-personal-items-allowed/',
      description: 'Guide to what can and cannot travel inside the vehicle during interstate transport.',
    },
    {
      label: 'Express Car Transport',
      href: '/car-transport-express-service/',
      description: 'Service page for express interstate car transport when timing is a higher priority.',
    },
    {
      label: 'Interstate Car Transport By Rail',
      href: '/interstate-car-transport-by-rail/',
      description: 'Guide to when rail can suit interstate car transport and what tradeoffs to consider.',
    },
    {
      label: 'Cheapest Interstate Car Transport',
      href: '/cheapest-interstate-car-transport/',
      description: 'Guide to finding the most practical low-cost interstate car transport option.',
    },
    {
      label: 'Sydney To Melbourne Car Transport',
      href: '/car-transport-sydney-melbourne/',
      description: 'Route page for interstate car transport from Sydney to Melbourne.',
    },
    {
      label: 'Perth To Adelaide Car Transport',
      href: '/car-transport-perth-adelaide/',
      description: 'Route page for interstate car transport from Perth to Adelaide.',
    },
    {
      label: 'Brisbane To Melbourne Car Transport',
      href: '/car-transport-brisbane-melbourne/',
      description: 'Route page for interstate car transport from Brisbane to Melbourne.',
    },
    {
      label: 'Sydney To Hobart Car Transport',
      href: '/car-transport-sydney-hobart/',
      description: 'Route page for interstate car transport from Sydney to Hobart.',
    },
    {
      label: 'Privacy Policy',
      href: '/privacy-policy/',
      description: 'Privacy policy explaining how Interstate Car Carriers handles website, quote, and contact information.',
    },
    {
      label: 'Terms Of Use',
      href: '/terms/',
      description: 'Website and transport-use terms for quotes, bookings, timing, and carrier coordination.',
    },
    {
      label: 'HTML Sitemap',
      href: '/sitemap/',
      description: 'Human-readable sitemap for the current Interstate Car Carriers website.',
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
  legalPages: [
    {
      label: 'Privacy Policy',
      href: '/privacy-policy/',
      description: 'How Interstate Car Carriers handles personal information and website usage data.',
    },
    {
      label: 'Terms Of Use',
      href: '/terms/',
      description: 'Website terms covering quotes, bookings, timing, and transport assumptions.',
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
  analytics: resolveAnalyticsConfig(),
};

export function toAbsoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
