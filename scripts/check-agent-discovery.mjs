import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = {
  "domain": "interstatecarcarriers.com.au",
  "siteUrl": "https://interstatecarcarriers.com.au/",
  "quoteRoot": "https://quoting.interstatecarcarriers.com.au/",
  "contact": "https://quoting.interstatecarcarriers.com.au/contact",
  "householdQuote": "https://quoting.interstatecarcarriers.com.au/quote/household",
  "vehicleQuote": "https://quoting.interstatecarcarriers.com.au/quote/vehicle",
  "openApi": "https://quoting.interstatecarcarriers.com.au/openapi.json",
  "quoteCapability": "https://quoting.interstatecarcarriers.com.au/quote-capability.json",
  "householdPublicAgentApi": "https://quoting.interstatecarcarriers.com.au/api/v1/household-quotes/assistant/submit",
  "vehiclePublicAgentApi": "https://quoting.interstatecarcarriers.com.au/api/v1/vehicle-quotes/assistant/submit",
  "callbackPublicAgentApi": "https://quoting.interstatecarcarriers.com.au/api/v1/callbacks/assistant/request"
};
const requiredFiles = [
  'src/pages/agents.astro',
  'src/pages/agents/examples.astro',
  'src/pages/index.md.ts',
  'src/pages/llms.txt.ts',
  'src/pages/.well-known/llms.txt.ts',
  'src/pages/.well-known/ai-catalog.json.ts',
  'src/pages/.well-known/agent-skills/index.json.ts',
];

let failed = false;
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`Missing agent discovery file: ${file}`);
    failed = true;
  }
}

const searchableFiles = requiredFiles.filter((file) => fs.existsSync(path.join(root, file)));
const haystack = searchableFiles.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');

for (const [label, value] of Object.entries(required)) {
  if (!haystack.includes(value)) {
    console.error(`Agent discovery missing ${label}: ${value}`);
    failed = true;
  }
}

if (fs.existsSync(path.join(root, 'vercel.json'))) {
  const vercel = fs.readFileSync(path.join(root, 'vercel.json'), 'utf8');
  for (const value of ['/openapi.json', '/quote-capability.json', '/.well-known/ai-plugin.json', '/.well-known/agent-skills/index.json', '/.well-known/llms.txt']) {
    if (!vercel.includes(value)) {
      console.error(`Vercel discovery header/redirect missing ${value}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log(`Agent discovery contract OK for ${required.domain}`);
