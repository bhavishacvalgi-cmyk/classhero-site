# Class Hero: design spec (v1)

> Phase 2. The spec for the mockup (`site/index.html`: nav, hero, proof strip, three steps) and the rest of the build. `tools/website_audit.mjs` reads the audit block at the bottom.

## Design read
A trust-first landing site for UK parents of GCSE and A-Level students (with the student reading over their shoulder). Warm but professional: a bright study room, calm and organised, with one blue pen and a violet highlighter. Built in plain HTML, CSS and a little JS; no framework and no build step.

**Dials:** DESIGN_VARIANCE 6 · MOTION_INTENSITY 5 · VISUAL_DENSITY 3. Why: parents need to trust it (lower variance than an agency site), there's one signature scroll moment per page (moderate motion), and it gets generous space.

## Round 3 (2026-09-26): the client's brand kit, used literally
The client's feedback on round 2: not warm or professional enough, logo wrong, header and logo too small, make it more like the developer's site. Round 3 follows `brand/branding-kit-v1.png` literally, with the developer's layout patterns (white base, portrait hero with a floating card, icon tiles, a navy band).

**Colour** (kit hexes; contrast on white in brackets):
- `#0F172A` navy (ink 17.9, and the band behind the grades scene)
- `#475569` body text (7.6)
- `#64748B` meta text, on white only (4.8)
- `#3B82F6` brand blue (logo, large only)
- `#2563EB` buttons and links (5.2; white on the kit blue would only be 3.7)
- `#8B5CF6` / `#7C3AED` violet (HERO, the eyebrow, ticks)
- `#60A5FA` sky (links on navy, 7.0)
- `#F5F6FA` off-white
- `#EEF4FF` / `#F3EFFF` soft blue and violet tints for icon tiles
- The brand gradient `#2563EB → #4F46E5 → #7C3AED` appears on the closing band (white text 5.2-6.3 across it) and as a 16% backing shape behind the hero portrait.

**Type:** the kit's own pairing, Sora Bold (headlines 700, logo 800) and Inter Regular (body 400-600), self-hosted. Figtree is retired.

**Logo:** the kit's horizontal lockup, a traced gradient mark (`site/images/ch-mark.svg`), a 1px rule, and CLASS / HERO stacked in Sora 800. The mark is 58px in an 88px nav (38px in a 72px nav on mobile). The mark was traced from the 116px raster in the kit, so **ask the client for the original vector logo**.

## Space, shape, depth
- Spacing: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Sections 96 top and bottom on desktop, 64 on mobile. Gutters 24 / 40 / 64.
- Shape: interactive elements are 12px, cards 20px, photos and the closing band 24px. The step tabs, eyebrow and diagram bars are full pills.
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
  "fontSizesPx": { "min390": [11, 13, 15, 16, 18, 19, 21, 24, 28, 32, 38, 72], "max1440": [13, 15, 18, 20, 22, 25, 31, 39, 49, 64, 128] },
  "fontSizeTolerancePx": 1.5,
  "maxFamilies": 2,
  "maxWeights": 5,
  "maxDeadGapShare": 0.45,
  "intentionalEmptySelectors": ["#how-it-works", ".steps-track", ".steps-sentinels", ".grades", ".grades-track"]
}
```
