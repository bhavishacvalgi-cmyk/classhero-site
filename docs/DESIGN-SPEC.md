# Class Hero: design spec

Written 2026-09-26, before any code. BRIEF.md §0 is the source of truth; where this spec and a skill disagree, the brief wins and the reason is recorded here.

## 1. Direction

**Design read.** A small multi-page marketing site for a founder-led UK tutoring business, written for parents first and students second, in a warm-but-professional prospectus language built on a revision-notebook concept, using native HTML/CSS/JS with GSAP ScrollTrigger for one scroll-scrubbed signature scene. Mode: redesign, overhaul. The brand (logo, blue + violet, Sora) and the content (her story, the method, the real proof) are kept; the layout, type system and motion are new.

**Aesthetic direction (two sentences).** Class Hero is a well-made revision notebook: bright warm paper with a faint pale-blue squared grid, one violet margin rule, confident navy-ink type in Sora, and a violet marking pen that ticks, strikes and circles only where something is true. It should read in the first second as a premium UK independent-school prospectus with the warmth of a real tutor's marked-up page: a strict grid, generous space, real photography of Bhavisha, and one memorable scene where exam papers are marked as you scroll.

**Dials** (design-taste-frontend §1): `DESIGN_VARIANCE 6` (editorial, strict grid with deliberate asymmetry, no artsy chaos: a parent must trust it), `MOTION_INTENSITY 5` (one pinned scene and a few pen-drawing moments, everything else still), `VISUAL_DENSITY 3` (airy; round 1 was rejected for sections being too close together).

**Signature.** Two exam papers that go from worse to better as you scroll: each starts as the student's weak first attempt (wrong or missing working, violet crosses, low marks, the old total and grade), then the corrections are written in, crosses give way to ticks, the marks go up, and the old total and grade are struck through with the new ones written and circled. They then settle onto a stack of papers while the record (95% of 112) is stated. Second highlight: the three steps drawn down the margin, with the 90-day plan written out week by week.

**What makes it only Class Hero:** the tick from the CH mark becomes the pen's tick; exam-book blue rules and a violet margin rule instead of a red one; the grades on the papers are the students' own words; Bhavisha's real photos and lesson video.

### Decisions that override a skill default (and why)
| Default | Decision | Reason |
|---|---|---|
| Nav height 64-80px (design-principles L7, taste 4.7) | Header 88px desktop, 64px mobile; mark 60px desktop, 40px mobile | Brief §0f: the client said the logo and header were too small; asks for a 56-64px mark in an 84-96px header |
| Dark mode designed alongside light (taste 6.C, 8) | Light only (`color-scheme: light`) | Brief fixes "blue + violet on a warm white ground"; the paper concept does not survive inversion. One theme, locked |
| Icon libraries only, no hand-rolled SVG (taste 3.C, 9.E) | Pen marks (ticks, circles, strike-throughs, handwritten grades) are drawn as SVG paths by hand | They are the brand motif and must look hand-made; no icon library draws a marking pen. No other icons are used except a play triangle and a menu glyph, both geometric |
| Header CTA always visible | The header CTA is hidden while another "Book a free consultation" button is in view | Brief §0g bans the CTA repeated more than once per screen |
| Hero subtext 20 words (taste 4.7) | Up to 25 words | Brief §0c sets 25 |
| Lenis smooth scroll | Not used | Native scroll is calmer, keeps keyboard and anchor behaviour predictable; GSAP `scrub: 0.6` smooths the one scene |

## 2. Colour

Hues come from the kit: blue 262 (kit `#3B82F6` is oklch 62.3% 0.188 259), violet 293 (kit `#8B5CF6` is oklch 60.6% 0.219 292), navy 265-272. Warmth comes from the paper neutrals (hue 85, chroma below 0.012) and the photography, not from new hues. No other hue family exists anywhere in the UI.

**Roles.** Blue = actions only (buttons, links, focus ring). Violet = the pen only (ticks, circles, strike-throughs, margin notes, the margin rule, HERO in the logo). Navy ink = all text. The blue-to-violet gradient appears once: inside the CH mark. Never on text, never as a glow, never as a band.

### 2.1 Ramps (OKLCH, sRGB fallback in brackets)
Radix semantics: 1-2 grounds, 3-5 interactive fills, 6-8 borders, 9-10 solids, 11-12 text.

**Paper (warm neutrals, hue 85)**
| token | oklch | hex | use |
|---|---|---|---|
| paper-0 | 99.6% 0.002 90 | #FEFEFC | exam-paper sheet, button text, raised sheets |
| paper-1 | 98.6% 0.006 85 | #FCFAF6 | page ground |
| paper-2 | 96.7% 0.008 85 | #F7F4EE | quiet alternate ground (FAQ, footer) |
| desk | 95.5% 0.008 85 | #F3F0EA | the surface the exam papers lie on (#proof) |
| paper-3 | 94.5% 0.010 85 | #F0ECE5 | hover fills on neutral controls |
| paper-4 | 91.5% 0.012 85 | #E7E2DA | video letterbox, pressed fills |

**Rules (printed lines, cool, like exercise-book lines)**
| token | oklch | hex | use |
|---|---|---|---|
| grid | 90.0% 0.030 255 | #D1DFF2 | squared ground, drawn at 34% opacity |
| rule-1 | 91.5% 0.022 255 | #D9E4F2 | faint ruled lines |
| rule-2 | 85.5% 0.022 262 | #C8D0DE | hairline dividers, card and paper edges |
| rule-3 | 62.0% 0.035 268 | #7D869C | control borders (3.50:1 on paper-1, passes 1.4.11) |

**Ink (text, hue 272)**
| token | oklch | hex | use |
|---|---|---|---|
| ink-1 | 23.5% 0.045 272 | #171C33 | headings, body |
| ink-2 | 39.5% 0.040 272 | #3F455C | secondary text, intros |
| ink-3 | 48.5% 0.030 272 | #595E70 | captions, attribution, meta |
| biro | 33.0% 0.085 266 | #213261 | student handwriting inside the exam-paper illustrations |
| pencil | 50.0% 0.012 270 | #60636A | the old grade written on each paper |

**Blue (actions, hue 262)**
| step | oklch | hex | use |
|---|---|---|---|
| blue-2 | 97.6% 0.011 262 | #F3F7FF | focus halo |
| blue-3 | 95.2% 0.022 262 | #E7F0FE | selected filter fill |
| blue-4 | 92.4% 0.036 262 | #D9E7FF | hover fill on quiet buttons |
| blue-6 | 84.0% 0.079 262 | #AFCBFF | link underline at rest |
| blue-7 | 77.0% 0.110 262 | #8EB4FB | (reserve) |
| blue-8 | 68.0% 0.150 260 | #5F97F4 | (reserve) |
| blue-9 | 54.3% 0.215 262 | #1E63EA | primary button, focus ring (a touch darker than the brief's #2563EB floor) |
| blue-10 | 48.8% 0.217 264 | #1B4ED8 | primary button hover |
| blue-11 | 46.0% 0.190 264 | #1D4BC0 | text links |
| blue-12 | 28.0% 0.090 265 | #122555 | (reserve) |
| logo blue | 62.3% 0.188 259 | #3B82F6 | CLASS in the lockup only |

**Violet (the pen, hue 293)**
| step | oklch | hex | use |
|---|---|---|---|
| violet-2 | 97.4% 0.013 293 | #F6F5FF | (reserve) |
| violet-3 | 95.0% 0.026 293 | #EFECFF | pen-wash behind a circled figure |
| violet-4 | 92.0% 0.042 293 | #E5E0FF | (reserve) |
| violet-6 | 83.0% 0.093 293 | #C9BCFF | the margin rule (drawn at 1.5px) |
| violet-7 | 76.0% 0.130 293 | #B4A1FC | (reserve) |
| violet-8 | 67.0% 0.180 293 | #9C7BF8 | (reserve) |
| violet-9 | 52.5% 0.235 293 | #7639E2 | pen strokes: ticks, circles, strike-throughs |
| violet-10 | 49.0% 0.235 293 | #6D2BD5 | (reserve) |
| violet-11 | 45.0% 0.215 293 | #6026BE | violet text: margin notes, grade figures |
| violet-12 | 29.0% 0.110 293 | #301B5C | (reserve) |
| logo violet | 60.6% 0.219 292 | #8B5CF6 | HERO in the lockup only |

### 2.2 Every text/background pair used (WCAG 2.2, computed)
| text | on | ratio | needs | result |
|---|---|---|---|---|
| ink-1 | paper-0 / paper-1 / paper-2 / desk / paper-3 | 16.63 / 16.11 / 15.30 / 14.77 / 14.26 | 4.5 | AAA |
| ink-2 | paper-0 / paper-1 / paper-2 / desk / paper-3 | 9.38 / 9.09 / 8.63 / 8.33 / 8.04 | 4.5 | AAA |
| ink-3 | paper-0 / paper-1 / paper-2 / desk / paper-3 | 6.38 / 6.18 / 5.87 / 5.66 / 5.47 | 4.5 | AA |
| ink-1 | paper-4 | 13.03 | 4.5 | AAA |
| ink-2 | paper-4 | 7.35 | 4.5 | AAA |
| blue-11 (links) | paper-1 / paper-2 / desk | 7.14 / 6.78 / 6.55 | 4.5 | AAA / AA |
| blue-10 (link hover) | paper-1 | 6.44 | 4.5 | AA |
| paper-0 (button label) | blue-9 / blue-10 (hover) | 5.16 / 6.65 | 4.5 | AA |
| violet-11 (margin notes) | paper-0 / paper-1 / paper-2 / desk | 8.26 / 8.00 / 7.60 / 7.33 | 4.5 | AAA |
| violet-11 | violet-3 (pen wash) | 7.30 | 4.5 | AAA |
| ink-1 | blue-3 (selected filter) | 14.63 | 4.5 | AAA |
| violet-9 (pen strokes, graphics) | paper-0 / paper-1 / desk | 6.02 / 5.83 / 5.35 | 3.0 (1.4.11) | pass |
| blue-9 (focus ring) | paper-1 / paper-2 | 5.00 / 4.75 | 3.0 (2.4.13) | pass |
| rule-3 (control borders) | paper-1 | 3.50 | 3.0 | pass |
| biro (illustration text) | paper-0 | 12.28 | n/a (decorative, described in alt) | - |
| logo blue / logo violet | paper-1 | 3.53 / 4.06 | exempt (logotype) | - |

Photos never carry text. The only text over a non-flat ground is none: the squared grid is a background under text at 34% opacity of an already faint line colour (1px lines every 24px), which changes contrast locally by less than 2%; checked by eye in QA.

## 3. Type

**Display: Sora** (the client's choice, matches the geometric wordmark). Weight 600 for every heading, 800 only in the CLASS / HERO lockup words (aria-hidden text; the link carries the accessible name). Tracking: display -0.035em, h2 -0.025em, h3 -0.015em. Line height 1.0-1.05 display, 1.1 h2, 1.2 h3.

**Text: Hanken Grotesk.** Chosen over Inter (the ChatGPT default and half of why the draft looked generated) and over Figtree (round 1). It is a humanist grotesque with soft curves and a real italic, narrower than Sora so the pair has contrast, and it stays calm at 17-18px. Weights 400 and 600, italic 400 for testimonial quotes. Line height 1.55 body, 1.45 lead.

Two families, three weights in total (400, 600, and Sora 800 inside the logo SVG, which the audit does not count). `font: inherit` on buttons; `b, strong` set to 600; no browser-default sizes survive (no `<small>`, no default button 13.33px).

### 3.1 Modular scale, fluid between 390 and 1440
Utopia method: at 1440 the scale is base 18 × 1.25 (major third); at 390 it is base 17 × 1.125 (major second), so display sizes grow fast on desktop and stay sane on a phone. Endpoints are rounded to half pixels. Every font-size on the site is one of these steps, with one documented exception: the desktop nav links are a fixed 20px (`--nav-size`), because at 15px and then 18px they read as too small beside the 60px mark and the 26px wordmark (feedback round 01). The nav only exists from 1024px up, so there is no mobile value.

| step | 390 | 1440 | clamp() | used for |
|---|---|---|---|---|
| -1 | 15 | 15 | `15px` | captions, attribution, meta, labels |
| nav | n/a | 20 | `20px` (from 1024px) | desktop header nav links only (the exception above) |
| 0 | 17 | 18 | `clamp(17px, 16.629px + 0.0952vw, 18px)` | body |
| 1 | 19 | 22.5 | `clamp(19px, 17.7px + 0.3333vw, 22.5px)` | hero subtext, lead paragraphs, FAQ questions |
| 2 | 21.5 | 28 | `clamp(21.5px, 19.086px + 0.619vw, 28px)` | h3, step titles, short quotes |
| 3 | 24 | 35 | `clamp(24px, 19.914px + 1.0476vw, 35px)` | featured quote, beat headlines |
| 4 | 27 | 44 | `clamp(27px, 20.686px + 1.619vw, 44px)` | h2 |
| 5 | 30.5 | 55 | `clamp(30.5px, 21.4px + 2.3333vw, 55px)` | page h1 on inner pages, closing statements |
| 6 | 34.5 | 68.5 | `clamp(34.5px, 21.871px + 3.2381vw, 68.5px)` | large figures |
| 7 | 39 | 86 | `clamp(39px, 21.543px + 4.4762vw, 86px)` | (reserve) |
| 8 | 43.5 | 107 | `clamp(43.5px, 19.914px + 6.0476vw, 107px)` | home hero h1 |
| 9 | 49 | 134 | `clamp(49px, 17.429px + 8.0952vw, 134px)` | the 95% figure |

Measured: "A-Level tutoring." in Sora 600 at -0.035em is 8.07 × the font size wide, so the hero h1 sits on two lines at 107px (864px of a 1120px column) and three at 390px. Because both breaks sit close to a wrapping threshold, the headline carries explicit breaks: "1-to-1 GCSE and / A-Level tutoring." from 768px up, "1-to-1 GCSE / and A-Level / tutoring." below (`br.br-d` / `br.br-m`).

### 3.2 Font loading without layout shift
Google Fonts with `display=swap`, plus metric-matched fallback faces built from local Arial, so text wraps the same before and after the web fonts arrive. Width ratios measured in Chromium against Arial: Sora 600 = 1.061 × Arial Bold, Hanken 400 = 1.009 × Arial, Hanken 600 = 0.947 × Arial Bold, Hanken italic = 1.017 × Arial Italic.

| fallback face | local() source | size-adjust | ascent / descent override |
|---|---|---|---|
| Sora Fallback (600-800) | Arial Bold | 106% | 91.5% / 27.4% |
| Hanken Fallback 400 | Arial | 100.9% | 99.1% / 29.7% |
| Hanken Fallback 600-700 | Arial Bold | 94.7% | 105.6% / 31.7% |
| Hanken Fallback italic | Arial Italic | 101.7% | 98.3% / 29.5% |

Measure widths use `em`, not `ch` (a `ch` is the "0" glyph, which changes on swap): N ch became N × 0.756em on Sora elements and N × 0.56em on Hanken elements, the measured "0" advances. Measured result on a throttled phone profile (4× CPU, 1.6 Mbps, 150ms RTT): CLS 0.000 on every page.

## 4. Space, grid, radius, borders

**Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Every margin, padding and gap is one of these (checked by the audit). Stepped by breakpoint, never fluid, so no in-between value exists at any width.

**Section padding (block):** 128 desktop (≥1200), 96 tablet (768-1199), 64 mobile. Within a section: headline to body 24-32, group to group 48-64, never less between groups than within them.

**The notebook grid.**
- Container: content max 1312px, side padding 64 (≥1200), 48 (1024-1199), 32 (768-1023), 24 (<768).
- A margin column on the left of every page: 160px (≥1200), 128 (1024-1199), 96 (768-1023). The violet margin rule (1.5px, violet-6) runs down the middle of the 32px gutter between the margin column and the main column, so text starts 16px right of the rule. Headlines hang from it. The margin column only ever holds real annotations (step timing, question marks on papers, "You decide here").
- Under 768px the margin column collapses: the rule sits 12px from the left edge, content starts at 24px, and margin notes move inline above their block.
- Squared ground: 24px squares, 1px `grid` lines at 34% opacity, drawn as the body background (sections with their own ground cover it).

**Radius (one documented system).** Interactive controls (buttons, filter buttons, menu button, video play button) 8px. Paper things (exam papers, photos, video frame, sheets) 2px, like a trimmed print. Nothing is pill-shaped; no 16-24px "card" radius anywhere.

**Borders and depth.** 1px `rule-2` hairlines for dividers, and only one per group (top rule on a list, not top and bottom on every row). Paper sheets get a tinted two-layer shadow (`0 1px 0 rgb(23 28 51 / .05), 0 18px 40px -18px rgb(23 28 51 / .22)`); nothing else casts a shadow. No glass, no glow, no gradient except the logo mark.

## 5. Motion

Weighting (design-motion-principles): Jakub primary (subtle, production polish), Jhey secondary (the pen scene's craft), Emil for nav and controls. Every animation has a one-line reason.

| moment | reason | how |
|---|---|---|
| Papers corrected (#proof) | storytelling: shows the result being earned, from a weak paper to a strong one | CSS sticky stage, GSAP ScrollTrigger timeline, `scrub: 0.6`. Per question: the wrong working (`.pre`) fades, the correct working and answer (`.post`, one `pathLength="1"` path per stroke) are written in stroke by stroke, the cross fades, the tick draws and the old mark cross-fades into the new one. Then the total and grade are struck, the new ones written and the grade circled. Opacity and stroke-dashoffset only |
| Hero underline under "target grade" | hierarchy: introduces the pen before the papers | one stroke, 700ms, `--ease-pen`, 400ms after fonts load |
| Step circles and margin line (#how-it-works) | orientation: shows where you are in the sequence | circles draw once on entry (600ms); the connecting line scrubs with scroll |
| 90-day plan ticks | storytelling: the plan fills in lesson by lesson | 24 ticks scrubbed across the block's pass through the viewport |
| Header CTA in/out | state change | opacity 200ms + translateX 280ms, `--ease-out` |
| Beat text swaps in #proof | continuity | opacity + 12px translateY + 4px blur, scrubbed |
| Buttons | feedback | background 160ms; `:active` scale(0.98) |
| Links | feedback | underline colour 160ms |
| FAQ open | state change | content opacity 200ms; no height animation |
| Results filter | state change | instant: a filter is used repeatedly, so it does not animate (Emil's frequency rule) |

**Easing tokens:** `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`; `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`; `--ease-pen: cubic-bezier(0.45, 0, 0.2, 1)`. No bare `ease`, no bounce, no scale-from-zero, no pulsing, no looping motion, no fade-up applied to every block, no stagger except the plan ticks.

**Pinning is gated by height.** The papers scene pins only when the viewport is at least 560px tall (CSS `@media (min-height: 560px)` and `gsap.matchMedia()` with the same query, so they always agree and the timeline rebuilds or reverts on resize). Shorter screens, such as a phone in landscape, get the static marked papers.

**One CTA per screen.** The header button hides (opacity, 200ms, with `visibility` so it leaves the tab order) whenever another "Book a free consultation" button is on screen, watched with IntersectionObserver; the nav links slide right to close the gap. On book.html it is always hidden.

**Rules.** Only transform, opacity, filter and stroke-dashoffset animate. No `window.addEventListener('scroll')`; ScrollTrigger and IntersectionObserver only. `prefers-reduced-motion: reduce` shows every final state (papers side by side in their finished "after" state, with the old total and grade still visible under their strike-throughs so the improvement reads; steps and plan drawn) with no pinning. Without JavaScript the same static final state renders: the markup is the after state, and the first attempt (`.pre`) is hidden by CSS unless the pinned scene is running. Budget: no frame over 50ms while scrolling #proof on desktop.

## 6. Components

- **Logo lockup:** CH mark (the client's SVG file as an `<img>`, blue-violet gradient) 60px tall, 16px gap, 1px ink rule at 22% opacity, 16px gap, CLASS / HERO stacked as text in Sora 800 at 26px (CLASS `#3B82F6`, HERO `#8B5CF6`), tracking 0.02em. Link to home with `aria-label="Class Hero, home"`. Footer uses the same lockup at 48px. Favicon is the mark alone.
- **Primary button:** blue-9, paper-0 label, Hanken 600 at step 0, padding 12 × 24, radius 8, min height 48. One label everywhere: "Book a free consultation" (on book.html, "Pick a time"). Beside it, a short note in ink-3.
- **Text link:** blue-11, 1px underline in blue-6 at 4px offset; hover underline blue-11.
- **Focus:** 2px blue-9 outline, 3px offset, on every interactive element; never removed.
- **Pen tick bullet:** a 20px violet tick (SVG) instead of list bullets for real "done" facts only.
- **Quote:** Hanken italic 400, real curly quotes hung into the margin, attribution in ink-3 step -1 (role, subject, level), never stars.

## 7. Layout of every section

Desktop means 1440 × 900 (1280 × 720 behaves the same with smaller type). Mobile means 390 × 844. Tablet (768) notes where it differs.

### Header (all pages)
- Desktop: sticky, 88px tall on paper-1 at 94% with a 1px rule-2 bottom line once scrolled. Lockup left (mark 60px). Right: How it works · Results · About (Hanken 600 at 20px, 32px apart, violet 2px underline on hover and on the current page), then the primary button. The button is hidden while another booking button is on screen, and the nav links slide right to close the gap.
- Mobile: 64px, mark 40px, a "Menu" button (48px target) opens a full-screen sheet on paper-1 with the links in Sora at step 4, the primary button and the tagline. Esc closes; focus is trapped and returned.

### Home
1. **Hero** (grid ground, margin rule). Desktop: H1 "1-to-1 GCSE and A-Level tutoring." at step 8 across the main column in two lines (explicit breaks, see §3.1). Below it, a two-column row: left (cols 1-5 of the main column) the subtext at step 1, then the button with "Free video call. No obligation." beside it; right, the hallway photo of Bhavisha with a student at 3:2, bleeding to the right edge of the viewport, square-cornered, caption underneath in ink-3. A violet pen underline draws under "target grade". Mobile: H1 in three lines, subtext, button, note under the button, then the photo full-bleed at 3:2 with the caption. CTA bottom sits above 844px.
2. **#proof, the signature** (desk ground, no grid). A 500vh track with a sticky stage under the header. Desktop: the stage uses the margin column plus 12 columns; text in cols 1-5 of the main column, papers in cols 6-12, sized by height (viewport minus header minus 96px, max 780px); the note sits under the text column. Beats, each paper going from worse to better (feedback round 01: "A Grade 1 is a fail"):
   - **Paper 1** (GCSE Maths Foundation practice paper, Paper 1 non-calculator, Year 10) with "On a Grade 1 in Year 10. Now doing A-Levels." and her quote. *Start:* a failing paper: 25% of 80 answered 3.2 from muddled, scribbled working (cross, 0/2); 3x + 7 = 22 answered 12 after subtracting instead of dividing (cross, 1/2 for 3x = 15); (x + 3)(x − 5) expanded as x² − 15 with no working (cross, 0/2); 0.35 as a fraction left blank (0/2). Total 12/80, Grade 1. *End:* the corrections written in (80 ÷ 4 = 20; x = 15 ÷ 3, 5; x² − 5x + 3x − 15, x² − 2x − 15; 35/100, 7/20), four ticks, marks 2/2/2/2; 12 struck and 44/80 written, the 1 struck and "Pass" written and circled. No grade number is ever given for the end state (she said she passed).
   - **Paper 2** (GCSE Maths Higher practice paper, Paper 2 calculator) slides on top, with "Up two grades in five weeks." and his quote. *Start:* a Grade 6 paper that is a mix: x² + 2x − 15 = 0 factorised correctly but solved with the signs flipped (cross, 1/3); the simultaneous equations right (tick, 3/3); 27^(2/3) worked as 27 × 2/3 = 18 (cross, 0/2); the nth term 4n + 1 right (tick, 2/2). Total 38/80, Grade 6. *End:* x = −5 or x = 3 and 3 × 3 × 3 = 27, 3² = 9 written in, every answer ticked; 38 struck and 61/80 written, the 6 struck and 8 written and circled, "in 5 weeks" beneath.
   - Totals are plausible for single 80-mark papers: about 15% is a Grade 1 on Foundation, 55% a standard pass, 48% a Grade 6 and 76% a Grade 8 on Higher. The first page carries the easier questions, so its share of marks runs higher than the total.
   - Then both settle onto a stack of paper edges while "95% of our 112 students have reached their target grade." takes the text column. A one-line note says the papers are illustrations and the grades are the students' own words. Mobile: a paper window on top (46svh; 36svh on phones under 760px tall, where the quote also drops to step -1) over the words; tablet: 56svh so the whole paper shows. Reduced motion, no JS, or a screen under 560px tall: two static rows (paper beside its words, each in its finished after state with the old total and grade visible under their strike-throughs) then the record, no pinning.
3. **#struggles** (grid ground). Desktop: left (cols 1-5) sticky H2 "Working hard, and the grades still aren't moving?" and the intro; right (cols 7-12) three items separated by single hairlines, each an h3 at step 2 and a paragraph. Mobile: stacked, not sticky.
4. **#how-it-works** (grid ground, margin in use). Desktop: H2 across the main column. Then three steps; each has its timing in the margin ("Day 1", "Week 1", "Days 1-90") beside a pen-circled numeral on the rule, and in the main column a label, an h3 title, a paragraph (max 60ch) and three ticked checks laid in a row. The button sits in step 1. Between steps 2 and 3 a dashed rule crosses the page with the margin note "You decide here". Step 3 holds the plan: 12 week columns, two lesson cells each, ticks filling in, three phase labels beneath (Weeks 1-4, 5-8, 9-12), and the 90-day small print. Mobile: margin notes sit inline above each step title; the plan becomes three rows (one per phase) of four weeks.
5. **#bhavisha** (follows #how-it-works directly since feedback round 01 removed the method section; the two share the squared ground and the standard 128px + 128px section rhythm, like #struggles into #how-it-works) (paper-1, grid ground). Desktop: left (cols 1-6) H2 "Hi, I'm Bhavisha.", two paragraphs, four ticked facts, a text link to About. Right (cols 8-11) the lesson video in a portrait 9:16 frame with a play button and a caption. Mobile: text, then video at 80% width centred.
6. **#reviews** (paper-2 ground). Desktop: H2, then an asymmetric set: one featured parent quote at step 3 spanning cols 1-7, and three shorter quotes in a column on cols 9-12 with hairlines between; attribution under each; link "Read every review". Mobile: featured quote, then the three.
7. **#faq** (paper-2). Desktop: H2 on top, then nine native `<details>` across cols 1-9, each question at step 1 with one hairline between; stacked (not a sticky split) so it does not repeat the #struggles layout family. Mobile: the same, full width.
8. **#start, final CTA** (grid ground). Desktop: H2 at step 5 "Start with a free consultation." (cols 1-7), the line about the short call and the button; on the right (cols 9-12) a blank "Target grade" slip, tilted 2°, with a dashed violet grade box: the thing the consultation fills in. No photo, no banner, no gradient. Mobile: stacked, slip under the button. The same block closes About and Results.
9. **Footer** (paper-2, top hairline). Lockup (48px), tagline, links, © 2026 Class Hero, Privacy policy. Mobile: stacked.

### About
1. **Hero:** Desktop: H1 "Hi, I'm Bhavisha." at step 5 and a lead line (cols 1-6); portrait-wall photo (2:3) at cols 8-12. Mobile: text then photo.
2. **Story:** the main column holds the story (max 32.5em); from 1024px the margin holds short notes ("Six years", "During COVID", "Now"). Below 1024px the notes sit inline above each paragraph (the 96px tablet margin is too narrow for them).
3. **Motto:** "Nothing is ever difficult, only foreign." at step 5, pen-circled word "foreign", attribution to the Year 8 review. Full main column.
4. **Credentials and team:** a two-column split: credentials as a ticked list (left), the team paragraphs and the presenting photo cropped to 4:3 (right).
5. **A real lesson:** the video (9:16) beside a short caption, reversed from home (video left).
6. **Referee:** Nitin Parmar's letter excerpt as a sheet of paper-0 with his name.
7. **CTA:** as home #start.

### Results
1. **Hero:** H1 "Results, in their own words." at step 5, intro at step 1 (cols 1-8).
2. **Reviews** (straight after the intro since feedback round 01 removed the grade-movements section; the 95% record stays beside the page title): a filter (All · Parents · Students, `aria-pressed` buttons) and a two-column masonry (CSS columns) of every usable quote, verbatim, attribution under each. Mobile: one column.
3. **CTA.**

### Book
1. **Hero:** H1 "Book your free consultation." at step 5, a line of detail, the three things that happen (a numbered list with pen-circled numerals), a "Pick a time" button that jumps to the scheduler; the smiling crop of Bhavisha at cols 9-12. Mobile: text, button, then photo.
2. **Scheduler:** Calendly inline widget (min-height 700px desktop, 1000px mobile) on paper-0 with a hairline frame; under it "Having trouble? Open the booking page." linking to calendly.com/bhavishacvalgi. `noscript` shows the link.

Audit note: `#scheduler` is declared intentional in the audit tokens because the Calendly iframe fills it, and the audit only counts img, video, form controls and `figure > div` as content.

### Privacy (placeholder) and 404
Plain text pages on the same grid, clearly marked as placeholders for the client to replace.

## 8. Imagery

Real photos first. Hero: `bhavisha-hallway` (1600px source). About: `bhavisha-portrait-wall`, `bhavisha-speaking` (cropped to 4:3 around her and the screen). `bhavisha-hero-portrait` is not used: it repeats the About portrait. Book: `bhavisha-final-cta`. Video poster: `bhavisha-teaching-poster`. No generated image is used any more: the one generated notebook photo lived only in #method, which was removed in feedback round 01. All exported as WebP with `width`/`height` set; below-the-fold images lazy-load.

## 9. Build notes (what changed from the plan, and why)
- **CLS fix:** metric-matched fallback fonts, `em` measures and explicit hero breaks (§3.1-3.2). Before: CLS 0.145 on a throttled phone, from the hero headline re-wrapping when Sora arrived.
- **Pin gating:** the papers scene pins only on screens at least 560px tall (§5), after a landscape-phone check showed the words cut off.
- **Header CTA hand-off** instead of a permanently visible header button (brief §0g: one CTA per screen).
- **The proof note** is placed inside the text column in pinned mode; it had inherited a static-layout grid column and ran into the paper stack.
- **Closing CTA** gained the blank target-grade slip (§7.9) so the final screen is not type alone, without repeating the hero photo.
- **Story notes** move inline below 1024px (§7 About.2).
- **Attributions:** students and reviewers who may be children are credited by role, parents by the first name on their review (BRIEF §0a; details in CLAIMS.md).
- **FAQ restacked** (heading on top, questions across 9 columns) so it no longer repeats the struggles section's sticky split (taste-skill section-repetition rule).
- **Browser fallbacks:** hex fallbacks for every OKLCH token (`@supports not (color: oklch(...))`); translucent colours written as plain `rgb(... / a)` instead of `color-mix()` (Safari 15.4-16.1 support OKLCH but not `color-mix`); `overflow-x: hidden` before `clip`; `100vh` before `100svh`.
- **Motion vocabulary actually shipped:** papers (scrubbed), hero underline (once), step circles (once each), margin progress line (scrubbed), plan ticks (scrubbed, the only stagger), the About motto loop and the Results 95% loop (CSS, once each on entry), header CTA, menu, FAQ and filter state changes.
- **Feedback round 01 (2026-09-28):** nav links to 20px (§3.1 exception, §7 Header); both papers rebuilt as before → after states (§5, §7 Home.2), generated by `_scratch/papers/build2.mjs` (`.pre` first attempt, `.post` corrections, `.keep` unchanged ink); the method section, its chart, photo and CSS removed (§7 Home); the Results grade-movements section removed (§7 Results). On Results, the review filter's space is now held from the first paint when JS is on (`.js .filter[hidden]`), which keeps CLS at 0 now that the filter sits higher on the page.

## 10. Audit tokens

```json audit-tokens
{
  "spacing": [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
  "fontSizesPx": {
    "max1440": [15, 18, 20, 22.5, 28, 35, 44, 55, 68.5, 86, 107, 134],
    "min390": [15, 17, 19, 21.5, 24, 27, 30.5, 34.5, 39, 43.5, 49]
  },
  "fontSizeTolerancePx": 1,
  "maxFamilies": 2,
  "maxWeights": 3,
  "maxDeadGapShare": 0.35,
  "intentionalEmptySelectors": ["#proof", "#scheduler"]
}
```
