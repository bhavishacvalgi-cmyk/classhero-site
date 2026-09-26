import { chromium } from 'playwright';
import { existsSync } from 'fs';  // npm i in this folder (1.51.1 matches cached chromium-1164)
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1164/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
const b = await chromium.launch({ executablePath: existsSync(EXE) ? EXE : undefined, args: ['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist'] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: false, recordVideo: { dir: (process.env.OUT || 'shots') + '/video', size: { width: 1440, height: 900 } } });
const p = await ctx.newPage();
const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
await p.goto('' + (process.env.SITE_URL || 'http://127.0.0.1:8766/') + ''); await p.waitForTimeout(6000);
const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
console.log('scrollable px', H);
await p.screenshot({ path: (process.env.OUT || 'shots') + '/00-hero.png' });
const steps = 240; let shot = 1;
for (let i = 1; i <= steps; i++) {
  await p.mouse.wheel(0, H / steps); await p.waitForTimeout(110);
  if (i % 16 === 0) await p.screenshot({ path: `${process.env.OUT || 'shots'}/${String(shot++).padStart(2,'0')}-scroll.png` });
}
await p.waitForTimeout(1500);
console.log('errors', JSON.stringify(errs.slice(0,8)));
await ctx.close(); await b.close();
