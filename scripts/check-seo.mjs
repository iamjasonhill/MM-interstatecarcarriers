import fs from 'node:fs';

const failures = [];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

const packageJson = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const astroConfig = fs.readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
const siteConfig = fs.readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8');
const layoutSource = fs.readFileSync(
  new URL('../src/layouts/SiteDocument.astro', import.meta.url),
  'utf8',
);
const robotsRoute = fs.readFileSync(new URL('../src/pages/robots.txt.ts', import.meta.url), 'utf8');
const homepageSource = fs.readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

assert(packageJson.scripts.check, 'package.json is missing the check script');
assert(packageJson.scripts['check:seo'], 'package.json is missing the check:seo script');
assert(
  packageJson.dependencies['@jdevalk/astro-seo-graph'],
  'package.json is missing @jdevalk/astro-seo-graph',
);
assert(astroConfig.includes('seoGraph('), 'astro.config.mjs is missing the seoGraph integration');
assert(astroConfig.includes('llmsTxt'), 'astro.config.mjs is missing llmsTxt generation');
assert(
  siteConfig.includes('https://interstatecarcarriers.com.au'),
  'site config no longer includes the Interstate Car Carriers production URL',
);
assert(
  siteConfig.includes('https://quoting.interstatecarcarriers.com.au/quote/vehicle'),
  'site config no longer includes the canonical vehicle quote destination',
);
assert(
  layoutSource.includes("@jdevalk/astro-seo-graph/Seo.astro"),
  'SiteDocument is not using the jdevalk Seo component',
);
assert(
  robotsRoute.includes('sitemap-index.xml'),
  'robots.txt route must publish the sitemap-index.xml location',
);
assert(
  homepageSource.includes('Interstate car transport without the guesswork.'),
  'homepage no longer reflects the Interstate Car Carriers hero copy',
);

if (failures.length > 0) {
  console.error('Interstate Car Carriers SEO checks failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Interstate Car Carriers SEO checks passed.');
