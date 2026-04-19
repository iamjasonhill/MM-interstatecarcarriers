import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

async function read(relativePath) {
  return fs.readFile(path.join(root, relativePath), 'utf8');
}

async function exists(relativePath) {
  try {
    await fs.access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const checks = [];

  checks.push([
    'analytics component exists',
    await exists('src/components/analytics/Analytics.astro'),
  ]);
  checks.push([
    'matomo component exists',
    await exists('src/components/analytics/Matomo.astro'),
  ]);

  const siteDocument = await read('src/layouts/SiteDocument.astro');
  checks.push([
    'SiteDocument imports Analytics',
    siteDocument.includes("import Analytics from '../components/analytics/Analytics.astro';"),
  ]);
  checks.push([
    'SiteDocument renders Analytics',
    siteDocument.includes('<Analytics />'),
  ]);

  const siteConfig = await read('src/config/site.ts');
  checks.push([
    'site config resolves analytics contract',
    siteConfig.includes('function resolveAnalyticsConfig()'),
  ]);
  checks.push([
    'site config exposes analytics on site object',
    siteConfig.includes('analytics: resolveAnalyticsConfig()'),
  ]);

  const envExample = await read('.env.example');
  for (const key of [
    'PUBLIC_ANALYTICS_ENABLED=',
    'PUBLIC_ANALYTICS_PROVIDER=',
    'PUBLIC_ANALYTICS_CONFIG=',
    'PUBLIC_MATOMO_BASE_URL=',
    'PUBLIC_MATOMO_SITE_ID=',
  ]) {
    checks.push([`.env.example includes ${key}`, envExample.includes(key)]);
  }

  const failures = checks.filter(([, passed]) => !passed);

  for (const [label, passed] of checks) {
    console.log(`${passed ? 'PASS' : 'FAIL'}: ${label}`);
  }

  if (failures.length) {
    process.exitCode = 1;
    return;
  }

  console.log('Repo contract checks passed.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
