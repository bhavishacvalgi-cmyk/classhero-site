# Class Hero: design spec (v1)

> Phase 2. The spec for the mockup (`site/index.html`: nav, hero, proof strip, three steps) and the rest of the build. `tools/website_audit.mjs` reads the audit block at the bottom.

## Design read
A trust-first landing site for UK parents of GCSE and A-Level students (with the student reading over their shoulder). Warm but professional: a bright study room, calm and organised, with one blue pen and a violet highlighter. Built in plain HTML, CSS and a little JS; no framework and no build step.

**Dials:** DESIGN_VARIANCE 6 · MOTION_INTENSITY 5 · VISUAL_DENSITY 3. Why: parents need to trust it (lower variance than an agency site), there's one signature scroll moment per page (moderate motion), and it gets generous space.

## Colour: "Cobalt + Cream"
The brand-kit hues are kept, and the values are tuned in OKLCH (`okl.py` in the session scratchpad computed every pair).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#fcfaf5` | `#0e1320` | page ground (warm, not cool grey: this is where the warmth comes from) |
| `--paper-2` | `#f5f3ee` | `#131a28` | alternate band, diagram ground |
| `--surface` | `#fffefb` | `#171e2c` | cards |
| `--line` | `#dedad2` | `#2a3243` | 1px borders |
| `--ink` | `#161e2f` | `#f3f0ea` | text, warm navy |
| `--ink-2` | `#4c5261` | `#b3b7c1` | secondary text |
| `--blue` | `#3c82f6` | `#66a5ff` | brand blue: wordmark, large arrows, phase bar. **Large only** |
| `--blue-600` | `#2a60d6` | `#66a5ff` | buttons, links, step numbers |
| `--blue-700` | `#244eb5` | `#8dbcff` | hover |
| `--violet` | `#8c5cf6` | `#af99fb` | brand violet: HERO, the tick, "%", final phase. **Large only** |
| `--violet-600` | `#743ed8` | `#af99fb` | small violet (eyebrow, list ticks) |

Contrast on `--paper`: ink 16.0 · ink-2 7.5 · blue-600 5.4 (and paper on blue-600 5.4, for button text) · blue-700 7.1 · violet-600 5.9 · brand blue 3.5 and brand violet 4.1 (3:1 is enough for large text). Dark: ink 16.3 · ink-2 9.2 · blue 7.4 · violet 7.7.

Rules:
- Blue is the action colour and the only accent that carries meaning.
- Violet appears only as brand moments: HERO in the wordmark, the tick, progress, "%".
- No gradients, no glow, no keyword-in-colour headlines.

## Type
- **Sora** 600 (display, headlines; -0.025 to -0.04em tracking; line height 1.02-1.08) and 700 (wordmark only).
- **Figtree** 400/500/600 (text; line height 1.55; measure 45-65ch).
- Both self-hosted as woff2 in `site/fonts/`, latin subset, `font-display: swap`, preloaded. Inter is retired: it was half of why the draft looked generated.
- **Scale** (fluid `clamp()`, exact at 390 and 1440): xs 13 · sm 15 · base 16→18 · md 18→20 · lg 21→25 · xl 24→31 · 2xl 28→39 · 3xl 32→49 · 4xl 38→64. The wordmark is fixed at 22 (19 on mobile).

## Space, shape, depth
- Spacing: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Sections 96 top and bottom on desktop, 64 on mobile. Gutters 24 / 40 / 64.
- Shape: interactive elements are 12px; containers and photos are 20px; the step-tab track and diagram bars are full pills. Nothing else.
- Depth: one tinted shadow token, used on cards and the active tab.

## The brand mark
- The wordmark is HTML text in Sora 700. "CLASS" is brand blue and "HERO" is brand violet. The A is an inline SVG (a filled, flat-topped A with no crossbar), and a violet tick takes the crossbar's place, as in the brand kit.
- **Interim until the client supplies a vector logo.**
- The tick is the one motif: it draws itself after the hero headline, marks completed steps in the tabs, and bullets the checklists.
- Favicon: the tick on a blue rounded square.

## Motion
| Where | What | Why |
|---|---|---|
| Hero tick | draws in 700ms after 500ms | the brand mark signs off the promise |
| Three steps (≥1100px) | section pins; scroll, tabs and Next buttons move through steps; cards cross-fade 380ms; finished tabs turn into ticks | tells the process in order, one step at a time, like Eddie's `Process.tsx` |
| Plan diagram | phase bars grow in sequence, then the 24 lesson dots fill | shows what 90 days of two lessons a week looks like |
| Buttons | 160ms colour, 1px press | feedback |

Easing is `cubic-bezier(0.22, 1, 0.36, 1)` throughout. Only `transform`, `opacity` and colour are animated. Scroll state comes from an IntersectionObserver, with no scroll listeners. Under `prefers-reduced-motion` the tick is static and all transitions are off. Below 1100px the steps are a plain stacked list.

## Layout families (no family repeats on a page)
- Hero: asymmetric split, copy 1.1fr and photo 0.9fr; stacks under 900px.
- Proof: a stat plus three grade movements in a tinted band.
- Steps: a pinned, tabbed story (desktop) or stacked cards (mobile).
- Still to build: the method (forgetting curve, full width, scroll-scrubbed), Meet Bhavisha (photo and story plus video), testimonials (typeset quotes, a staggered 2-column), FAQ (accordion), and the final CTA (centred, the one allowed centred block).

## Photos
- All six came from the developer's folder, named `bhavisha-*`. **CONFIRM with the client that every photo is Bhavisha**: they come from at least two different shoots.
- Hero: the hallway shot, in conversation. Step 1: the wall portrait. Step 2: teaching at a screen.
- All are WebP at 700-1600px, with width and height set; everything below the fold is lazy-loaded.

```json audit-tokens
{
  "spacing": [0, 1, 2, 3, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
  "fontSizesPx": { "min390": [13, 15, 16, 18, 19, 21, 24, 28, 32, 38], "max1440": [13, 15, 18, 20, 22, 25, 31, 39, 49, 64] },
  "fontSizeTolerancePx": 1.5,
  "maxFamilies": 2,
  "maxWeights": 4,
  "maxDeadGapShare": 0.45,
  "intentionalEmptySelectors": ["#how-it-works", ".steps-track", ".steps-sentinels"]
}
```
