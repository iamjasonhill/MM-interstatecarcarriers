import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const defaultManifestPath = path.resolve(
  repoRoot,
  '../_wp-house/sites/interstatecarcarriers-com-au.json',
);
const defaultCoverageZip = '/Users/jasonhill/Downloads/interstatecarcarriers.com.au-Coverage-Valid-2026-04-19.zip';
const defaultOutputDir = path.resolve(repoRoot, 'src/data/routes/source');

function parseArgs(argv) {
  const args = {
    manifest: defaultManifestPath,
    zip: defaultCoverageZip,
    outputDir: defaultOutputDir,
    slugs: [],
    limit: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === '--manifest' && next) {
      args.manifest = next;
      i += 1;
      continue;
    }

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

    if (arg === '--slugs' && next) {
      args.slugs = next
        .split(',')
        .map((slug) => slug.trim())
        .filter(Boolean);
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

function cleanText(value) {
  return value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/car transportservices/gi, 'car transport services')
    .replace(/car transportsolutions/gi, 'car transport solutions')
    .replace(/^\.+/, '')
    .trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
    .filter(Boolean))];
}

function readManifest(manifestPath) {
  return fs.readFile(manifestPath, 'utf8').then((raw) => JSON.parse(raw));
}

function runRemoteWp(manifest, command) {
  const sshPort = String(manifest.ssh_port ?? 22);
  const sshTarget = manifest.ssh_target;
  const remoteDocroot = manifest.remote_docroot;
  const wpCli = manifest.wp_cli ?? 'wp';
  const remoteCommand = `cd ${remoteDocroot} && ${wpCli} ${command}`;

  return execFileSync('ssh', ['-p', sshPort, sshTarget, remoteCommand], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
}

function getPostRecord(manifest, slug) {
  const listRaw = runRemoteWp(
    manifest,
    `post list --post_type=post --name=${slug} --fields=ID,post_title,post_name,post_status,post_type --format=json`,
  );
  const posts = JSON.parse(listRaw);

  if (!posts.length) {
    return null;
  }

  const postId = posts[0].ID;
  const postRaw = runRemoteWp(
    manifest,
    `post get ${postId} --fields=ID,post_title,post_name,post_date,post_status,post_type,post_content --format=json`,
  );

  return JSON.parse(postRaw);
}

function paragraphsBetween(startNode, stopSelector, $) {
  const values = [];
  let current = $(startNode).next();

  while (current.length) {
    if (current.is(stopSelector)) {
      break;
    }

    if (current.is('p')) {
      const text = cleanText(current.text());
      if (text) {
        values.push(text);
      }
    }

    current = current.next();
  }

  return values;
}

function parseReasons(reasonsList, $) {
  return $(reasonsList)
    .find('li')
    .map((_, element) => {
      const item = $(element);
      const label = cleanText(item.find('strong').first().text()).replace(/:$/, '');
      const fullText = cleanText(item.text());

      if (!label) {
        return {
          title: '',
          body: fullText,
        };
      }

      const body = cleanText(
        fullText
          .replace(new RegExp(`^${escapeRegExp(label)}:?\\s*`, 'i'), '')
          .replace(item.find('strong').first().text(), '')
          .replace(/^[:.\-\s]+/, ''),
      );

      return {
        title: label,
        body,
      };
    })
    .get();
}

function parseRouteContent(post, siteUrl) {
  const $ = load(post.post_content);
  const primaryTitle = $('h1')
    .map((_, element) => cleanText($(element).text()))
    .get()
    .find((text) => /^Car transport from /i.test(text));

  const routeMatch = primaryTitle?.match(/^Car transport from (.+?) to (.+)$/i);
  const h1 = $('h1').filter((_, element) => cleanText($(element).text()) === primaryTitle).first();
  const intro = cleanText(h1.nextAll('p').filter((_, element) => cleanText($(element).text())).first().text());
  const quoteHeadingNode = h1.nextAll('h3').first();
  const quotePromptHeading = cleanText(quoteHeadingNode.text());
  const quotePromptBody = cleanText(quoteHeadingNode.nextAll('p').first().text());
  const reasonsHeadingNode = $('h2')
    .filter((_, element) => /Why Opt for Car Transport Services/i.test(cleanText($(element).text())))
    .first();
  const reasonsHeading = cleanText(reasonsHeadingNode.text());
  const reasonsList = reasonsHeadingNode.nextAll('ol').first();
  const reasons = parseReasons(reasonsList, $);
  const advantageHeadingNode = $('h2')
    .filter((_, element) => /Interstate Car Carrier Advantage/i.test(cleanText($(element).text())))
    .first();
  const advantageHeading = cleanText(advantageHeadingNode.text());
  const advantageParagraphs = paragraphsBetween(advantageHeadingNode, 'h3, h2', $);
  const readyHeadingNode = advantageHeadingNode.nextAll('h3').first();
  const readyHeading = cleanText(readyHeadingNode.text());
  const readyBody = cleanText(readyHeadingNode.nextAll('p').first().text());
  const conclusionHeadingNode = $('h2')
    .filter((_, element) => /^Conclusion/i.test(cleanText($(element).text())))
    .first();
  const conclusionHeading = cleanText(conclusionHeadingNode.text());
  const conclusionParagraphs = paragraphsBetween(conclusionHeadingNode, 'h2, h3', $);

  return {
    sourceUrl: `${siteUrl.replace(/\/$/, '')}/${post.post_name}/`,
    importedAt: new Date().toISOString(),
    post: {
      id: Number(post.ID),
      title: post.post_title,
      slug: post.post_name,
      date: post.post_date,
      status: post.post_status,
      type: post.post_type,
    },
    route: {
      title: primaryTitle,
      from: routeMatch?.[1] ?? null,
      to: routeMatch?.[2] ?? null,
    },
    extracted: {
      intro,
      quotePromptHeading,
      quotePromptBody,
      reasonsHeading,
      reasons,
      advantageHeading,
      advantageParagraphs,
      readyHeading,
      readyBody,
      conclusionHeading,
      conclusionParagraphs,
    },
  };
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function buildOutputIndex(outputDir) {
  const fileNames = await fs.readdir(outputDir);
  const imported = [];

  for (const fileName of fileNames.filter((name) => name.endsWith('.json') && name !== 'index.json').sort()) {
    const fullPath = path.join(outputDir, fileName);
    const raw = await fs.readFile(fullPath, 'utf8');
    const record = JSON.parse(raw);

    imported.push({
      slug: record.post?.slug ?? fileName.replace(/\.json$/, ''),
      imported: true,
      outputPath: fullPath,
      title: record.route?.title ?? record.post?.title ?? null,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    count: imported.length,
    imported,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const manifest = await readManifest(args.manifest);

  let slugs = args.slugs.length ? args.slugs : readIndexedRouteSlugs(args.zip);

  if (Number.isInteger(args.limit) && args.limit > 0) {
    slugs = slugs.slice(0, args.limit);
  }

  for (const slug of slugs) {
    const post = getPostRecord(manifest, slug);

    if (!post) {
      continue;
    }

    const record = parseRouteContent(post, manifest.site_url);
    const outputPath = path.join(args.outputDir, `${slug}.json`);
    await writeJson(outputPath, record);
  }

  const indexPath = path.join(args.outputDir, 'index.json');
  const index = await buildOutputIndex(args.outputDir);
  await writeJson(indexPath, index);

  console.log(`Route source index now contains ${index.count} record(s).`);
  console.log(`Index written to ${indexPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
