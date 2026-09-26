#!/usr/bin/env node
// Measured website audit: spacing scale, type scale, fonts, contrast, empty space,
// overflow, hero CTA, dashes, and frame times in a scroll-driven 3D section.
//
// Turns "does the spacing make sense?" into a number and a list of offenders.
// Reads the allowed scales from the fenced ```json audit-tokens block in a spec.
//
// Usage (run from a project that has `playwright` installed):
//   node scripts/website_audit.mjs <url> --spec <DESIGN-SPEC.md> --out <dir> [--frames "#build"] [--tag NN]
// WebGL-painted backgrounds: put data-audit-bg="#hex" on the section so contrast is measured against it.
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const url = args[0];
const opt = (k, d) => {
  const i = args.indexOf(k);
  return i > -1 ? args[i + 1] : d;
};
if (!url || url.startsWith("--")) {
  console.error("usage: website_audit.mjs <url> --spec <spec.md> --out <dir> [--frames <selector>] [--tag NN]");
  process.exit(2);
}
const specPath = opt("--spec");
const outDir = opt("--out", ".");
const framesSel = opt("--frames");
const tag = opt("--tag", new Date().toISOString().slice(0, 10));

const require = createRequire(path.join(process.cwd(), "noop.js"));
const pw = await import(pathToFileURL(require.resolve("playwright")).href);
const chromium = pw.chromium ?? pw.default.chromium;

let tokens = {
  spacing: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
  fontSizesPx: null,
  fontSizeTolerancePx: 1.5,
  maxFamilies: 3,
  maxWeights: 4,
  maxDeadGapShare: 0.35,
  intentionalEmptySelectors: [],
};
if (specPath) {
  const md = fs.readFileSync(specPath, "utf8");
  const m = md.match(/```json audit-tokens\s*([\s\S]*?)```/);
  if (m) tokens = { ...tokens, ...JSON.parse(m[1]) };
}

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, sizes: tokens.fontSizesPx?.max1440 },
  { name: "mobile", width: 390, height: 844, sizes: tokens.fontSizesPx?.min390 },
];

// ---------------------------------------------------------------- in-page probe
function probe({ tokens, sizes }) {
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) return false;
      if (e.getAttribute("aria-hidden") === "true" && e.tagName !== "svg") return false;
    }
    return true;
  };
  const sel = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) return `${s}#${el.id}`;
    const c = [...el.classList].slice(0, 3).join(".");
    if (c) s += "." + c;
    const sec = el.closest("section,header,footer,nav");
    return (sec && sec !== el ? (sec.id ? `#${sec.id} ` : sec.tagName.toLowerCase() + " ") : "") + s;
  };
  // Any CSS colour → [r,g,b,a] via canvas (handles oklch, color-mix, etc.)
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const cx = cv.getContext("2d", { willReadFrequently: true });
  const rgba = (css) => {
    cx.clearRect(0, 0, 1, 1);
    cx.fillStyle = "#000";
    cx.fillStyle = css;
    cx.fillRect(0, 0, 1, 1);
    const d = cx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  };
  const lum = ([r, g, b]) => {
    const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const over = (top, bot) => {
    const a = top[3];
    return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1];
  };
  // A gradient or image behind the text can't be read from computed colours; report it, don't guess.
  const imageBehind = (el) => {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return true;
      if (rgba(cs.backgroundColor)[3] >= 1) return false;
    }
    return false;
  };
  // Pages that paint their background in WebGL declare it with data-audit-bg on the section.
  const bgOf = (el) => {
    const stack = [];
    let declared = null;
    for (let e = el; e; e = e.parentElement) {
      const c = rgba(getComputedStyle(e).backgroundColor);
      if (c[3] > 0) stack.push(c);
      if (c[3] >= 1) break;
      if (e.dataset && e.dataset.auditBg) {
        declared = rgba(e.dataset.auditBg);
        break;
      }
    }
    let base = declared || rgba(getComputedStyle(document.documentElement).backgroundColor);
    if (base[3] === 0) base = [255, 255, 255, 1];
    for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
    return base;
  };

  const all = [...document.body.querySelectorAll("*")].filter(
    (e) => !e.closest("canvas, svg") && !["SCRIPT", "STYLE", "CANVAS", "NOSCRIPT"].includes(e.tagName)
  );
  const visible = all.filter(vis);

  // Spacing
  const scale = tokens.spacing;
  const onScale = (v) => scale.some((s) => Math.abs(s - v) < 0.6);
  const spacing = {};
  const props = ["marginTop", "marginRight", "marginBottom", "marginLeft", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "rowGap", "columnGap"];
  for (const el of visible) {
    if (el.classList.contains("pin-spacer")) continue; // GSAP-generated scroll spacing
    const cs = getComputedStyle(el);
    // Auto-centring margins compute to px; equal left/right margins on a narrower box are `auto`.
    const autoX = parseFloat(cs.marginLeft) > 0 && Math.abs(parseFloat(cs.marginLeft) - parseFloat(cs.marginRight)) < 1;
    for (const p of props) {
      if (autoX && (p === "marginLeft" || p === "marginRight")) continue;
      const raw = cs[p];
      if (!raw || raw === "normal" || raw === "auto") continue;
      const v = parseFloat(raw);
      if (!isFinite(v) || v === 0 || v < 0) continue;
      if (onScale(v)) continue;
      const k = `${Math.round(v * 10) / 10}px`;
      (spacing[k] ??= { count: 0, examples: new Set() }).count++;
      spacing[k].examples.add(`${sel(el)} (${p})`);
    }
  }

  // Text elements
  const texty = visible.filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1));
  const fams = new Set();
  const weights = new Set();
  const sizesOff = {};
  const contrast = [];
  const contrastUnverified = [];
  for (const el of texty) {
    const cs = getComputedStyle(el);
    fams.add(cs.fontFamily.split(",")[0].replace(/["']/g, "").trim());
    weights.add(cs.fontWeight);
    const fs = parseFloat(cs.fontSize);
    if (sizes && !sizes.some((s) => Math.abs(s - fs) <= tokens.fontSizeTolerancePx)) {
      const k = `${Math.round(fs * 10) / 10}px`;
      (sizesOff[k] ??= { count: 0, examples: new Set() }).count++;
      sizesOff[k].examples.add(sel(el));
    }
    if (imageBehind(el)) {
      contrastUnverified.push({ el: sel(el), text: el.textContent.trim().slice(0, 40) });
      continue;
    }
    const fg0 = rgba(cs.color);
    const bg = bgOf(el);
    const fg = fg0[3] < 1 ? over(fg0, bg) : fg0;
    const L1 = lum(fg);
    const L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const large = fs >= 24 || (fs >= 18.66 && +cs.fontWeight >= 700);
    const need = large ? 3 : 4.5;
    if (ratio < need)
      contrast.push({ el: sel(el), text: el.textContent.trim().slice(0, 50), ratio: +ratio.toFixed(2), need, fontSize: fs });
  }

  // Wasted space per section: the largest vertical band with no content inside the
  // section's padding box, as a share of the viewport height. Padding itself is by design.
  const empty = [];
  for (const sec of document.querySelectorAll("main > section, footer")) {
    if (!vis(sec)) continue;
    const box = sec.getBoundingClientRect();
    const cs = getComputedStyle(sec);
    const top = box.top + parseFloat(cs.paddingTop);
    const bottom = box.bottom - parseFloat(cs.paddingBottom);
    const bands = [];
    const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (!n.textContent.trim() || !vis(n.parentElement)) continue;
      const r = document.createRange();
      r.selectNodeContents(n);
      for (const q of r.getClientRects()) bands.push([q.top, q.bottom]);
    }
    for (const m of sec.querySelectorAll("img, input, select, button, textarea, video, figure > div")) {
      if (!vis(m)) continue;
      const q = m.getBoundingClientRect();
      bands.push([q.top, q.bottom]);
    }
    bands.sort((a, b) => a[0] - b[0]);
    let cursor = top;
    let maxGap = 0;
    for (const [a, b] of bands) {
      if (a > cursor) maxGap = Math.max(maxGap, a - cursor);
      cursor = Math.max(cursor, b);
    }
    if (bottom > cursor) maxGap = Math.max(maxGap, bottom - cursor);
    const share = maxGap / window.innerHeight;
    const intentional = tokens.intentionalEmptySelectors.some((s) => sec.matches(s));
    empty.push({ section: sec.id || sec.getAttribute("aria-label") || sec.tagName.toLowerCase(), maxGapPx: Math.round(maxGap), maxGapShareOfViewport: +share.toFixed(2), flagged: share > tokens.maxDeadGapShare && !intentional, intentional });
  }

  const heroCta = document.querySelector("#hero-stage .btn-primary, main section:first-of-type a[href], main section:first-of-type button");
  const ctaBottom = heroCta ? heroCta.getBoundingClientRect().bottom + window.scrollY : null;
  const text = document.body.innerText;
  const dashes = (text.match(/[—–]/g) || []).length;

  const toObj = (o) => Object.fromEntries(Object.entries(o).sort((a, b) => b[1].count - a[1].count).map(([k, v]) => [k, { count: v.count, examples: [...v.examples].slice(0, 4) }]));

  return {
    spacingOffScale: toObj(spacing),
    fontSizeOffScale: toObj(sizesOff),
    families: [...fams],
    weights: [...weights].sort(),
    contrastFailures: contrast,
    contrastUnverified,
    emptySpace: empty,
    overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
    heroCtaInFirstViewport: ctaBottom !== null && ctaBottom <= window.innerHeight,
    heroCtaBottom: ctaBottom,
    dashCount: dashes,
    textElements: texty.length,
  };
}

// ---------------------------------------------------------------- frame times
async function frameTimes(page, selector) {
  return page.evaluate(async (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const end = start + window.innerHeight * 5;
    window.scrollTo(0, start - 10);
    await new Promise((r) => setTimeout(r, 800));
    const deltas = [];
    let last = performance.now();
    let y = start;
    await new Promise((resolve) => {
      const step = (t) => {
        deltas.push(t - last);
        last = t;
        y += 24;
        window.scrollTo(0, y);
        if (y < end) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
    deltas.shift();
    const s = [...deltas].sort((a, b) => a - b);
    return {
      frames: deltas.length,
      meanMs: +(deltas.reduce((a, b) => a + b, 0) / deltas.length).toFixed(1),
      p95Ms: +s[Math.floor(s.length * 0.95)].toFixed(1),
      maxMs: +s[s.length - 1].toFixed(1),
      over50: deltas.filter((d) => d > 50).length,
    };
  }, selector);
}

// ---------------------------------------------------------------- run
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--enable-gpu"] });
const report = { url, tag, when: new Date().toISOString(), tokens, viewports: {} };
for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  // Walk the whole page once so lazy content and scroll-triggered reveals settle.
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  const r = await page.evaluate(probe, { tokens, sizes: vp.sizes });
  if (framesSel) r.frameTimes = await frameTimes(page, framesSel);
  report.viewports[vp.name] = r;
  await page.close();
}
await browser.close();

// ---------------------------------------------------------------- write
const jsonPath = path.join(outDir, `audit-${tag}.json`);
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

const lines = [`# Website audit ${tag}`, "", `URL: ${url}  `, `Run: ${report.when}`, ""];
let fails = 0;
for (const [name, r] of Object.entries(report.viewports)) {
  const check = (ok, label, detail = "") => {
    if (!ok) fails++;
    lines.push(`- ${ok ? "PASS" : "FAIL"} ${label}${detail ? `: ${detail}` : ""}`);
  };
  lines.push(`## ${name}`, "");
  const sp = Object.entries(r.spacingOffScale);
  check(sp.length === 0, "Spacing on the scale", sp.length ? `${sp.reduce((a, [, v]) => a + v.count, 0)} off-scale values` : "");
  sp.slice(0, 8).forEach(([k, v]) => lines.push(`  - \`${k}\` x${v.count}: ${v.examples.join(", ")}`));
  const fz = Object.entries(r.fontSizeOffScale);
  check(fz.length === 0, "Font sizes on the type scale", fz.length ? `${fz.length} off-scale sizes` : "");
  fz.slice(0, 8).forEach(([k, v]) => lines.push(`  - \`${k}\` x${v.count}: ${v.examples.join(", ")}`));
  check(r.families.length <= tokens.maxFamilies, "Font families", r.families.join(", "));
  check(r.weights.length <= tokens.maxWeights, "Font weights", r.weights.join(", "));
  check(r.contrastFailures.length === 0, "WCAG AA contrast", r.contrastFailures.length ? `${r.contrastFailures.length} failures` : "");
  r.contrastFailures.slice(0, 8).forEach((c) => lines.push(`  - ${c.el} "${c.text}" ${c.ratio}:1 (needs ${c.need}:1, ${c.fontSize}px)`));
  if (r.contrastUnverified.length) lines.push(`  - UNVERIFIED (gradient/image behind text, check by eye): ${r.contrastUnverified.map((c) => `"${c.text}"`).join(", ")}`);
  check(!r.overflowX, "No horizontal overflow", r.overflowX ? `scrollWidth ${r.scrollWidth}` : "");
  check(r.heroCtaInFirstViewport, "Hero CTA in first viewport", `bottom at ${Math.round(r.heroCtaBottom)}px`);
  check(r.dashCount === 0, "No em or en dashes in visible text", r.dashCount ? `${r.dashCount} found` : "");
  const flagged = r.emptySpace.filter((e) => e.flagged);
  check(flagged.length === 0, `No dead vertical gap over ${Math.round(tokens.maxDeadGapShare * 100)}% of the viewport`, flagged.map((e) => `${e.section} ${e.maxGapPx}px`).join(", "));
  lines.push(`  - largest dead gap by section: ${r.emptySpace.map((e) => `${e.section} ${e.maxGapPx}px${e.intentional ? " (intentional)" : ""}`).join(" · ")}`);
  if (r.frameTimes) {
    const f = r.frameTimes;
    check(f.over50 === 0, "3D scroll frame budget (no frame > 50ms)", `${f.frames} frames, mean ${f.meanMs}ms, p95 ${f.p95Ms}ms, max ${f.maxMs}ms, ${f.over50} over 50ms`);
  }
  lines.push("");
}
lines.splice(4, 0, `**Result: ${fails === 0 ? "CLEAN" : `${fails} failing checks`}**`, "");
const mdPath = path.join(outDir, `audit-${tag}.md`);
fs.writeFileSync(mdPath, lines.join("\n"));
console.log(lines.join("\n"));
console.log(`\nwrote ${jsonPath}\nwrote ${mdPath}`);
