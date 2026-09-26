// Measured teardown of any site: what it ACTUALLY uses (computed styles of every visible text node),
// plus full-page screenshots at 1440 and 390. This is how a vague review ("still too AI") became rules
// with numbers in the FIZZION rounds: measure 2-3 sites the client admires, measure ours, compare.
//
// usage (from a folder with playwright installed):
//   node extract-styles.mjs <url> <outDir> [tag]
// writes <outDir>/<tag>-styles.json, <tag>-desk-full.png, <tag>-mob-full.png and prints a summary table.
import { chromium } from 'playwright';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const [, , url, out = 'teardown', tag = new URL(process.argv[2] || 'http://x').hostname.replace(/\W/g, '-')] = process.argv;
if (!url) { console.error('usage: node extract-styles.mjs <url> <outDir> [tag]'); process.exit(2); }
mkdirSync(out, { recursive: true });
const MAC = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1164/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const b = await chromium.launch({ executablePath: existsSync(MAC) ? MAC : undefined });

for (const [w, h, d] of [[1440, 900, 'desk'], [390, 844, 'mob']]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, acceptDownloads: false });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(e => console.log('goto:', e.message));
  await p.waitForTimeout(2500);
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 400) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(100); } // trigger reveals
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/${tag}-${d}-full.png`, fullPage: true });
  if (d === 'desk') {
    const s = await p.evaluate(() => {
      const count = (m, k) => (m[k] = (m[k] || 0) + 1, m);
      const fam = {}, size = {}, weight = {}, color = {}, bg = {}, track = {}, radius = {};
      const texts = [...document.querySelectorAll('body *')].filter(e => {
        if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return false;
        const r = e.getBoundingClientRect(), c = getComputedStyle(e);
        return r.width > 1 && r.height > 1 && c.visibility !== 'hidden' && +c.opacity > 0;
      });
      for (const e of texts) {
        const c = getComputedStyle(e);
        count(fam, c.fontFamily.split(',')[0].replace(/["']/g, '').trim()); count(size, c.fontSize); count(weight, c.fontWeight);
        count(color, c.color); count(track, c.letterSpacing);
      }
      document.querySelectorAll('body *').forEach(e => {
        const c = getComputedStyle(e);
        if (c.backgroundColor !== 'rgba(0, 0, 0, 0)') count(bg, c.backgroundColor);
        if (c.borderRadius !== '0px') count(radius, c.borderRadius);
      });
      const top = m => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 14);
      const heads = [...document.querySelectorAll('h1,h2,h3')].slice(0, 12).map(e => {
        const c = getComputedStyle(e);
        return { tag: e.tagName, text: e.textContent.trim().slice(0, 70), size: c.fontSize, weight: c.fontWeight, lh: c.lineHeight, track: c.letterSpacing, family: c.fontFamily.split(',')[0] };
      });
      return { title: document.title, height: document.body.scrollHeight, textNodes: texts.length, families: top(fam), sizes: top(size), weights: top(weight), colors: top(color), letterSpacing: top(track), backgrounds: top(bg), radii: top(radius), headings: heads };
    });
    writeFileSync(`${out}/${tag}-styles.json`, JSON.stringify(s, null, 1));
    console.log(`\n${url}  (${s.textNodes} text nodes, ${s.height}px tall)`);
    for (const k of ['families', 'weights', 'sizes', 'colors', 'backgrounds', 'radii']) console.log(k.padEnd(12), s[k].map(([v, n]) => `${v} ×${n}`).join(' · '));
    console.log('headings'); s.headings.forEach(h => console.log(`  ${h.tag} ${h.size}/${h.lh} w${h.weight} ${h.track} ${h.family} | ${h.text}`));
  }
  await p.close();
}
await b.close();
