// Smooth scroll-through video of the home page. usage: node tools/record.mjs <url> <out.webm-dir>
import { chromium } from 'playwright';
const [,, url = 'http://127.0.0.1:8000/', out = 'shots/video'] = process.argv;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: out, size: { width: 1440, height: 900 } } });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(2200);
const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
const steps = 900;
for (let i = 1; i <= steps; i++) { await p.mouse.wheel(0, H / steps); await p.waitForTimeout(28); }
await p.waitForTimeout(1500);
await ctx.close(); await b.close();
