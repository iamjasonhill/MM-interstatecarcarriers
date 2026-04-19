import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const defaultCoverageZip = '/Users/jasonhill/Downloads/interstatecarcarriers.com.au-Coverage-Valid-2026-04-19.zip';
const defaultOutputDir = path.resolve(repoRoot, 'src/data/routes/source');
const importerScript = path.resolve(__dirname, 'import-icc-route-sources.mjs');

function parseArgs(argv) {
  const args = {
    zip: defaultCoverageZip,
    outputDir: defaultOutputDir,
    batchSize: 50,
    limit: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--zip' && next) {
      args.zip = next;
      i += 1;
      continue;
    }

    if (arg === '--output-dir' && next) {
      args.outputDir = next;
      i += 1;
      continue;
    }

    if (arg === '--batch-size' && next) {
      args.batchSize = Number.parseInt(next, 10);
      i += 1;
      continue;
    }

    if (arg === '--limit' && next) {
      args.limit = Number.parseInt(next, 10);
      i += 1;
    }
  }

  return args;
}

function parseCsvLines(input) {
  return input
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(',')[0]?.trim())
    .filter(Boolean);
}

function readIndexedRouteSlugs(zipPath) {
  const csv = execFileSync('unzip', ['-p', zipPath, 'Table.csv'], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });

  const urls = parseCsvLines(csv);
  return [...new Set(urls
    .filter((url) => url.includes('/car-transport-'))
    .map((url) => {
      try {
        const pathname = new URL(url).pathname.replace(/^\/|\/$/g, '');
        return pathname.startsWith('car-transport-') ? pathname : null;
      } catch {
        return null;
      }
    })
    .filter(Boolean))].sort();
}

async function readImportedSlugs(outputDir) {
  try {
    const fileNames = await fs.readdir(outputDir);
    return new Set(
      fileNames
        .filter((name) => name.endsWith('.json') && name !== 'index.json')
        .map((name) => name.replace(/\.json$/, '')),
    );
  } catch {
    return new Set();
  }
}

function chunk(values, size) {
  const parts = [];
  for (let i = 0; i < values.length; i += size) {
    parts.push(values.slice(i, i + size));
  }
  return parts;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const indexed = readIndexedRouteSlugs(args.zip);
  const imported = await readImportedSlugs(args.outputDir);
  let remaining = indexed.filter((slug) => !imported.has(slug));

  if (Number.isInteger(args.limit) && args.limit > 0) {
    remaining = remaining.slice(0, args.limit);
  }

  if (!remaining.length) {
    console.log('No remaining indexed route slugs to import.');
    return;
  }

  const batches = chunk(remaining, Math.max(1, args.batchSize));
  console.log(`Importing ${remaining.length} remaining route slug(s) in ${batches.length} batch(es).`);

  batches.forEach((batch, index) => {
    console.log(`Batch ${index + 1}/${batches.length}: ${batch[0]} -> ${batch[batch.length - 1]} (${batch.length} slugs)`);
    execFileSync('node', [importerScript, '--output-dir', args.outputDir, '--slugs', batch.join(',')], {
      cwd: repoRoot,
      stdio: 'inherit',
      maxBuffer: 20 * 1024 * 1024,
    });
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
