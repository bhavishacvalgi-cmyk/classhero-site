// Mockup screenshots: hero + each pinned step at desktop, full page at mobile. usage: node tools/shots.mjs <url> <outDir>
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const [,, url = 'http://127.0.0.1:8000/', out = 'shots'] = process.argv; mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const errs = [];
const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
d.on('pageerror', e => errs.push(String(e))); d.on('console', m => m.type() === 'error' && errs.push(m.text()));
await d.goto(url, { waitUntil: 'networkidle' }); await d.waitForTimeout(1500);
await d.screenshot({ path: `${out}/desk-01-hero.png` });
await d.evaluate(() => document.querySelector('.proof').scrollIntoView()); await d.waitForTimeout(400);
await d.screenshot({ path: `${out}/desk-02-proof.png` });
for (const i of [0, 1, 2]) {
  await d.evaluate(i => { const t = document.querySelector('.steps-track'); const top = t.getBoundingClientRect().top + scrollY - 72; scrollTo(0, top + (t.offsetHeight - innerHeight) * ((i + 0.5) / 3)); }, i);
  await d.waitForTimeout(1200);
  await d.screenshot({ path: `${out}/desk-0${3 + i}-step${i + 1}.png` });
}
const dark = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
await dark.goto(url, { waitUntil: 'networkidle' }); await dark.waitForTimeout(1200); await dark.screenshot({ path: `${out}/desk-dark-hero.png` });
const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await m.goto(url, { waitUntil: 'networkidle' }); await m.waitForTimeout(1200);
await m.screenshot({ path: `${out}/mob-01-hero.png` });
await m.screenshot({ path: `${out}/mob-full.png`, fullPage: true });
console.log('errors', JSON.stringify(errs));
await b.close();
