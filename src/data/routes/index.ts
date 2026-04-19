export interface RouteReason {
  title: string;
  body: string;
}

export interface RouteSourceRecord {
  sourceUrl: string;
  importedAt: string;
  post: {
    id: number;
    title: string;
    slug: string;
    date: string;
    status: string;
    type: string;
  };
  route: {
    title: string;
    from: string | null;
    to: string | null;
  };
  extracted: {
    intro: string;
    quotePromptHeading: string;
    quotePromptBody: string;
    reasonsHeading: string;
    reasons: RouteReason[];
    advantageHeading: string;
    advantageParagraphs: string[];
    readyHeading: string;
    readyBody: string;
    conclusionHeading: string;
    conclusionParagraphs: string[];
  };
}

interface RouteTemplateCard {
  title: string;
  body: string;
}

interface RoutePlanningCard {
  heading: string;
  copy: string;
}

interface RouteJob {
  title: string;
  detail: string;
}

export interface RoutePageContent {
  slug: string;
  title: string;
  description: string;
  canonicalPath: string;
  heroEyebrow: string;
  intro: string;
  panelRouteTitle: string;
  panelRouteCopy: string;
  panelBadge: string;
  panelBestStep: string;
  panelUseContact: string;
  bridgeHeading: string;
  bridgeCopy: string;
  benefitsHeading: string;
  benefits: RouteTemplateCard[];
  whyHeading: string;
  whyLeadTitle: string;
  whyLeadBody: string;
  corridorNoteTitle: string;
  corridorNoteBody: string;
  whyCards: RouteTemplateCard[];
  planningHeading: string;
  planningIntro: string;
  planningSignals: RoutePlanningCard[];
  advantageHeading: string;
  advantageIntro: string;
  corridorJobs: RouteJob[];
  advantages: string[];
  checklistHeading: string;
  checklistIntro: string;
  checklist: string[];
  ctaHeading: string;
  ctaSub: string;
}

type RouteSourceModule = RouteSourceRecord | { default: RouteSourceRecord };

const modules = import.meta.glob('./source/*.json', { eager: true }) as Record<string, RouteSourceModule>;

function getModuleRecord(mod: RouteSourceModule): RouteSourceRecord {
  if (typeof mod === 'object' && mod && 'default' in mod) {
    return mod.default;
  }

  return mod;
}

const routeSourceRecords = Object.entries(modules)
  .filter(([filePath]) => !filePath.endsWith('/index.json'))
  .map(([, mod]) => getModuleRecord(mod));

const routeSourceMap = new Map(routeSourceRecords.map((record) => [record.post.slug, record]));

function cleanCopy(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function ensureSentence(value: string) {
  const trimmed = cleanCopy(value);
  if (!trimmed) {
    return trimmed;
  }

  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function normalizeIntro(value: string) {
  return cleanCopy(value).replace(/^Imagine this:\s*/i, '');
}

function parseLocations(record: RouteSourceRecord) {
  const fallbackMatch = record.route.title.match(/^Car transport from (.+?) to (.+)$/i);

  return {
    from: titleCase(record.route.from ?? fallbackMatch?.[1] ?? 'Origin'),
    to: titleCase(record.route.to ?? fallbackMatch?.[2] ?? 'Destination'),
  };
}

function classifyRoute(from: string, to: string, slug: string) {
  const lower = `${from} ${to} ${slug}`.toLowerCase();
  const eastCoastCities = new Set(['sydney', 'melbourne', 'brisbane', 'canberra', 'queanbeyan']);
  const ends = [from.toLowerCase(), to.toLowerCase()];
  const hasTasmania = lower.includes('hobart') || lower.includes('tasmania');
  const hasDarwin = lower.includes('darwin');
  const hasPerth = lower.includes('perth');
  const eastCoast = ends.every((city) => eastCoastCities.has(city));
  const longHaul = hasPerth || hasDarwin || hasTasmania;

  return {
    hasTasmania,
    hasDarwin,
    hasPerth,
    eastCoast,
    longHaul,
  };
}

function toCards(reasons: RouteReason[], start: number, count: number, fallbackPrefix: string) {
  return reasons.slice(start, start + count).map((reason, index) => ({
    title: cleanCopy(reason.title) || `${fallbackPrefix} ${index + 1}`,
    body: ensureSentence(reason.body),
  }));
}

function buildRoutePageContent(record: RouteSourceRecord): RoutePageContent {
  const { from, to } = parseLocations(record);
  const flags = classifyRoute(from, to, record.post.slug);
  const reasons = record.extracted.reasons.map((reason) => ({
    title: cleanCopy(reason.title),
    body: cleanCopy(reason.body),
  }));

  const benefits = toCards(reasons, 0, 3, 'Benefit');
  const whyLead = reasons[3] ?? reasons[0];
  let whyCards = toCards(reasons, 4, 4, 'Reason');

  if (whyCards.length < 4) {
    const extraBodies = [
      ...record.extracted.advantageParagraphs,
      ...record.extracted.conclusionParagraphs,
    ].map(cleanCopy);

    for (const body of extraBodies) {
      if (whyCards.length >= 4) {
        break;
      }

      whyCards.push({
        title: `Route note ${whyCards.length + 1}`,
        body: ensureSentence(body),
      });
    }
  }

  const intro = normalizeIntro(record.extracted.intro);
  const advantageIntro = cleanCopy(record.extracted.advantageParagraphs[0] ?? intro);
  const panelRouteCopy = cleanCopy(
    record.extracted.advantageParagraphs[1] ??
      record.extracted.conclusionParagraphs[0] ??
      intro,
  );

  const corridorNoteTitle = flags.hasTasmania
    ? 'Why this route needs clearer timing and handover planning'
    : flags.longHaul
      ? 'Why this route needs more planning than a short metro-to-metro lane'
      : flags.eastCoast
        ? 'Why this lane is easier to plan than lower-volume routes'
        : 'Why this corridor benefits from cleaner route planning';

  const corridorNoteBody = flags.hasTasmania
    ? `${from} to ${to} usually needs clearer timing, handover, and route-fit confirmation than a simple mainland capital lane.`
    : flags.longHaul
      ? `${from} to ${to} is long enough that timing windows, route fit, and pickup or delivery practicality usually matter more than generic route copy.`
      : flags.eastCoast
        ? `${from} to ${to} usually benefits from stronger demand, more familiar metro pickup and delivery conditions, and cleaner carrier availability than thinner regional corridors.`
        : `${from} to ${to} usually works best when the route, vehicle, and collection conditions are confirmed early instead of assumed.`;

  const panelBadge = flags.hasTasmania
    ? 'Specialist corridor'
    : flags.longHaul
      ? 'Long-haul route'
      : 'Core corridor';

  const heroEyebrow = flags.hasTasmania
    ? 'Specialist interstate route'
    : flags.longHaul
      ? 'Long-haul interstate route'
      : 'High-frequency interstate route';

  const bridgeHeading = flags.hasTasmania
    ? 'A Tasmania route usually needs clearer planning than a standard mainland lane.'
    : flags.longHaul
      ? 'On a route this long, planning matters almost as much as the corridor itself.'
      : flags.eastCoast
        ? 'A strong corridor usually means cleaner quoting and better route fit.'
        : 'Good route fit depends on more than the city pair alone.';

  const bridgeCopy = flags.hasTasmania
    ? `On a route like ${from} to ${to}, the main question is usually not whether the move can happen. It is whether the vehicle, handover conditions, and timing fit a standard booking path or need a more careful conversation first.`
    : flags.longHaul
      ? `On a route like ${from} to ${to}, the real question is usually not whether the move can be done. It is whether the vehicle, access conditions, and timing fit a standard booking path or need a more careful conversation first.`
      : `On a lane like ${from} to ${to}, the real question is usually not whether the move can happen. It is whether the vehicle, the timing, and the collection conditions fit a standard booking path or need a more careful conversation first.`;

  const planningSignals: RoutePlanningCard[] = [
    {
      heading: 'When the standard quote is usually enough',
      copy: 'If the vehicle is drivable, the route is straightforward, and the collection and delivery conditions are relatively normal, start with the vehicle quote wizard.',
    },
    {
      heading: 'When to contact the team first',
      copy: 'Use the contact path if the vehicle is non-drivable, access is tricky, enclosed handling is likely, or the timing needs more discussion before booking.',
    },
    {
      heading: flags.hasTasmania
        ? 'What often affects this route most'
        : flags.longHaul
          ? 'What often affects this route most'
          : 'What often affects this route most',
      copy: flags.hasTasmania
        ? 'Collection and delivery practicality, timing windows, and the extra planning around a Tasmania route usually matter more here than on a standard mainland corridor.'
        : flags.longHaul
          ? 'Timing windows, long-haul carrier availability, and whether the job is depot, home delivery, or something more specialised usually matter more than generic route copy.'
          : 'Timing windows, carrier availability, and whether the job is depot, home delivery, or something more specialised usually matter more than generic route copy.',
    },
  ];

  const corridorJobs: RouteJob[] = [
    {
      title: 'Private relocation moves',
      detail: `A common fit when households are relocating between ${from} and ${to} and do not want the extra driving burden.`,
    },
    {
      title: 'Interstate vehicle purchases',
      detail: `This route often suits online purchases and dealer sales where the buyer needs the vehicle moved from ${from} to ${to} without collecting it personally.`,
    },
    {
      title: flags.hasTasmania || flags.longHaul ? 'Higher-touch planning jobs' : 'Dealer and business handovers',
      detail: flags.hasTasmania || flags.longHaul
        ? `Because the route has more moving parts than a simple metro corridor, it is also a natural candidate for contact-first transport planning when timing, access, or handling needs more discussion.`
        : `Because the corridor is active, dealer transfers and business jobs can often be planned more cleanly than on lower-volume regional lanes.`,
    },
  ];

  const advantages = [
    cleanCopy(record.extracted.advantageParagraphs[1] ?? `Support for standard vehicles, light commercials, and specialist transport planning across the ${from} to ${to} corridor.`),
    'A cleaner quote path for straightforward jobs and a contact path for anything that needs more discussion.',
    flags.hasTasmania || flags.longHaul
      ? 'Route planning that takes timing, handover practicality, and vehicle condition seriously from the start.'
      : 'Door-to-door or depot-style planning depending on what suits the move best.',
  ].map(ensureSentence);

  const checklist = [
    'Have the vehicle type and condition ready before you quote.',
    'Know whether pickup and delivery are depot, residential, dealership, or business locations.',
    'Flag non-drivable, modified, prestige, or presentation-sensitive vehicles early.',
    flags.hasTasmania || flags.longHaul
      ? 'Use contact instead of guessing if the route timing, access, or handover conditions are tighter than usual.'
      : 'Use contact instead of guessing if the timing window is tighter than usual.',
  ];

  return {
    slug: record.post.slug,
    title: record.route.title,
    description: `Interstate car transport guide for the ${from} to ${to} route, including when to quote online and when to contact the team first.`,
    canonicalPath: `/${record.post.slug}/`,
    heroEyebrow,
    intro,
    panelRouteTitle: `${from} to ${to}`,
    panelRouteCopy,
    panelBadge,
    panelBestStep: flags.longHaul ? 'Quote online for straightforward interstate jobs' : 'Quote online for standard jobs',
    panelUseContact: flags.hasTasmania || flags.longHaul ? 'Timing, access, or handling needs discussion' : 'Timing or handling needs discussion',
    bridgeHeading,
    bridgeCopy,
    benefitsHeading: `Three useful things about the ${from} to ${to} lane`,
    benefits,
    whyHeading: `Why people use car transport from ${from} to ${to}`,
    whyLeadTitle: cleanCopy(whyLead?.title ?? `Why people move vehicles from ${from} to ${to}`),
    whyLeadBody: ensureSentence(whyLead?.body ?? record.extracted.conclusionParagraphs[0] ?? intro),
    corridorNoteTitle,
    corridorNoteBody,
    whyCards,
    planningHeading: 'Use the route properly, not just the route name.',
    planningIntro: `On a route like ${from} to ${to}, the smartest next step depends less on the city pair itself and more on the vehicle, the handover conditions, and how fixed the timing really is.`,
    planningSignals,
    advantageHeading: `The kinds of jobs that most often sit on the ${from} to ${to} corridor`,
    advantageIntro,
    corridorJobs,
    advantages,
    checklistHeading: 'Have the route details clear before you start.',
    checklistIntro: 'The cleaner the route and vehicle details are up front, the easier it is to tell whether a standard quote is enough or whether this job should go straight to the team.',
    checklist,
    ctaHeading: `Ready to quote ${from} to ${to} vehicle transport?`,
    ctaSub: `Start with the vehicle quote if the job is straightforward, or use the contact path if the vehicle, access, or timing needs a more detailed ${from} to ${to} route discussion first.`,
  };
}

export function getAllRouteSourceRecords() {
  return [...routeSourceRecords];
}

export function getRouteSourceRecord(slug: string) {
  return routeSourceMap.get(slug);
}

export function getRoutePageContent(slug: string) {
  const record = getRouteSourceRecord(slug);

  if (!record) {
    return null;
  }

  return buildRoutePageContent(record);
}
