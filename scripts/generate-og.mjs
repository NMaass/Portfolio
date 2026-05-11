#!/usr/bin/env node
/**
 * Generate Open Graph cards for the home page and each post.
 * Run as a prebuild step: `node scripts/generate-og.mjs`.
 *
 * Style: typographic. Post title in large serif, byline "Nicholas Maassen ·
 * nmaass.dev" small in the corner. Paper-cream background, forest border.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const writingDir = path.join(root, 'src/pages/writing');
const publicDir = path.join(root, 'public');
const outDir = path.join(publicDir, 'og');

await fs.mkdir(outDir, { recursive: true });

const PAPER = '#f5efe0';
const PAPER_DARKER = '#e8dcc0';
const TEXT = '#243029';
const MUTED = '#5a6b60';
const ACCENT = '#2d4a3e';

const WIDTH = 1200;
const HEIGHT = 630;

/** Escape characters that would break SVG. */
function svgEscape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Wrap a string into N lines that fit roughly within maxCharsPerLine. */
function wrapText(text, maxCharsPerLine) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length <= maxCharsPerLine) {
      current = (current ? current + ' ' : '') + w;
    } else {
      if (current) lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildSvg({ title, description, kicker }) {
  // Choose a title font-size based on length so it fits without ugly wrap.
  let titleSize = 84;
  if (title.length > 30) titleSize = 72;
  if (title.length > 50) titleSize = 60;
  if (title.length > 80) titleSize = 48;

  const maxCharsPerLine = Math.floor((WIDTH - 160) / (titleSize * 0.48));
  const titleLines = wrapText(title, maxCharsPerLine);
  const lineHeight = titleSize * 1.15;

  // Center the title block vertically.
  const totalTitleHeight = lineHeight * titleLines.length;
  let titleY = (HEIGHT - totalTitleHeight) / 2 + lineHeight * 0.7;

  const titleTSpans = titleLines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : lineHeight}">${svgEscape(line)}</tspan>`)
    .join('');

  const descBlock = description
    ? `<text x="80" y="${HEIGHT - 140}" font-family="Source Serif 4, Source Serif Pro, Georgia, serif" font-size="28" fill="${MUTED}" font-style="italic">
         ${wrapText(svgEscape(description), 70)
           .slice(0, 2)
           .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : 36}">${l}</tspan>`)
           .join('')}
       </text>`
    : '';

  const kickerBlock = kicker
    ? `<text x="80" y="100" font-family="JetBrains Mono, monospace" font-size="22" fill="${ACCENT}" letter-spacing="4" text-transform="uppercase">${svgEscape(kicker.toUpperCase())}</text>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${PAPER}"/>
      <stop offset="100%" stop-color="${PAPER_DARKER}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${WIDTH}" height="12" fill="${ACCENT}"/>
  ${kickerBlock}
  <text font-family="Source Serif 4, Source Serif Pro, Georgia, serif" font-size="${titleSize}" font-weight="600" fill="${TEXT}" y="${titleY}">
    ${titleTSpans}
  </text>
  ${descBlock}
  <g transform="translate(80, ${HEIGHT - 60})">
    <rect width="32" height="32" rx="6" fill="${ACCENT}"/>
    <path d="M9 23V10h2.5l8 9V10h2.5v13h-2.5l-8-9v9h-2.5z" fill="${PAPER}"/>
  </g>
  <text x="124" y="${HEIGHT - 39}" font-family="JetBrains Mono, monospace" font-size="22" fill="${TEXT}">
    Nicholas Maassen <tspan fill="${MUTED}"> · nmaass.dev</tspan>
  </text>
</svg>`;
}

async function writePng(svg, outPath) {
  const buffer = await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .png()
    .toBuffer();
  await fs.writeFile(outPath, buffer);
  console.log(`  ${path.relative(root, outPath)}  (${Math.round(buffer.length / 1024)} KB)`);
}

console.log('Generating OG cards...');

// Default card (home/about/writing index)
await writePng(
  buildSvg({
    title: 'Nicholas Maassen',
    description: "Full-stack engineer. Shipping software for users' actual workflows.",
    kicker: 'Portfolio · Writing',
  }),
  path.join(publicDir, 'og-default.png')
);

// Per-post cards
const files = await fs.readdir(writingDir);
for (const f of files.filter((x) => x.endsWith('.md'))) {
  const raw = await fs.readFile(path.join(writingDir, f), 'utf8');
  // Naive frontmatter parser — good enough for our format.
  const fm = {};
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (match) {
    for (const line of match[1].split('\n')) {
      const m = line.match(/^(\w+):\s*(.*)$/);
      if (m) fm[m[1]] = m[2].trim();
    }
  }
  const slug = f.replace(/\.md$/, '');
  await writePng(
    buildSvg({
      title: fm.title ?? slug,
      description: fm.description ?? '',
      kicker: 'Writing',
    }),
    path.join(outDir, `${slug}.png`)
  );
}

console.log('Done.');
