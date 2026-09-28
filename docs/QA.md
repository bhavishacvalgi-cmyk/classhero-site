# Class Hero: QA report

## 0. Feedback round 01 re-check (2026-09-28)

Everything in this section was re-run on the site as it stands after feedback round 01 (headless Chromium, Playwright, served from `127.0.0.1:8124`). Scripts are in `_scratch/r2/`, screenshots in `_scratch/r2/shots/`. Sections 1-9 below are the original build's QA; where round 01 changed a result, the line is updated and marked "(round 01)".

**The four changes, checked against the files and in the browser**

| # | Feedback | Result | Evidence |
|---|---|---|---|
| 1 | Nav links clearly larger, 18-20px, weight 500-600, active underline kept, one line at 1024, mobile menu unaffected | PASS | 20px Hanken 600 (was 15px). One line at 1024, 1280 and 1440, with the header CTA shown and hidden; at 1024 the links clear the lockup by 162px and the CTA by 32px. The violet underline shows on the current page (Results) and on hover. The mobile menu is unchanged (links in Sora at 27px). `navcheck.mjs`, `shots/nav-*.png`, `shots/menu-390.png` |
| 2 | Papers go from worse to better; Grade 1 is a fail; "Pass" is the ceiling; paper 2 goes from a mixed 6 to a nearly all-ticked 8; static fallback shows the after state with the old grade struck | PASS | Paper 1 start: 3 crosses, 1 blank, marks 0/1/0/0, 12/80, Grade 1. End: corrections written in, 4 ticks, 44/80, the 1 struck, "Pass" circled; no grade number anywhere (text scan finds no "Grade 5"). Paper 2 start: 2 ticks, 2 crosses, 6/10 on the page, 38/80, Grade 6. End: 4 ticks, 61/80, 6 struck, 8 circled, "in 5 weeks". The maths is checked by hand: every after-state answer is right, and every before-state error is a typical one (dividing by 25 for 25%, subtracting 3 instead of dividing, first × first and last × last, flipped signs on the roots, 27 × 2/3). Scene frames at 9 timeline points at 1440 and 390 (`shots/sheet-d.png`, `shots/sheet-m.png`), start and end at 768 (`shots/sheet-t.png`). Reduced motion and no-JS: first-attempt layer opacity 0, every correction stroke fully drawn, old totals and grades visible under their strikes (`static.mjs`, `shots/static-*.png`). The caption is unchanged |
| 3 | Method section removed with its chart, techniques, photo and "social life" line; unused CSS, JS and images removed; no links to it; flow still intentional | PASS | No `#method` markup, CSS, JS or links; the notebook image is gone from `site/images` (every remaining image is referenced). The dead helper rules it used (`.cols`, `.measure`, `.margin-note`, `.btn--quiet`, `.ground-paper`, `.plan__head`, `.proof__title`) were removed too. #how-it-works now runs straight into "Hi, I'm Bhavisha." on the same squared ground with the standard 128 + 128px rhythm (64 + 64 on mobile), like #struggles into #how-it-works (`shots/junction-*.png`) |
| 4 | Results: grade-movements section and its animation removed; intro straight into reviews; 95% kept | PASS | No grade-movements markup, CSS or JS. The page goes from the intro (with the circled 95% record) to "Every review." The stale `og:description` ("Grade movements and…") is rewritten. `shots/results-*.png` |

**Re-run checks (round 01)**
- **Audit** (`_tools/website_audit.mjs`, 1440×900 and 390×844): index, about, results, book, privacy and 404 all **CLEAN**. 0 failures, 0 unverified. The spec's audit tokens gained one size, 20px at 1440, for the nav links (DESIGN-SPEC §3.1 exception).
- **Interaction tests** (`_scratch/r2/interact.mjs`): 25 of 25 pass (menu, focus trap, one CTA per screen, skip link, video, FAQ, results filter 24 / 11 / 8, Calendly iframe loads, links, images).
- **Text scan:** 0 em/en dashes, no US spellings, and no banned words except "truly" inside Kaushik's verbatim review. None of the removed copy remains, and "Grade 5" appears nowhere.
- **Vitals** (throttled phone / desktop): index LCP 1,220 / 132ms, CLS 0 / 0.002; about 864 / 100ms, CLS 0; results 636 / 120ms, CLS 0; book 712 / 104ms, CLS 0. With the grade-movements section gone, Results first measured CLS 0.002 on the throttled phone, because the review filter appeared (JS removes `hidden`) higher up the page. Its space is now held from the first paint when JS is on, and CLS is back to 0.
- **Frame times** scrolling #proof 24px per frame: 1440: 224 frames, max 18.7ms; 390: 210 frames, max 21.6ms; 0 frames over 33ms in two runs each.
- **Not re-checked this round:** 1280×720, the 375×667 and 844×390 phone profiles, and the Calendly embed beyond "iframe loads". Those layouts use the same paper SVG dimensions and CSS as before, so no change is expected there.

2026-09-26. Everything below was checked in headless Chromium (Playwright 1.51) against the finished `site/`, served from `127.0.0.1`. The test scripts are in `_scratch/` and the audit reports in `_audit/`. Anything I could not check is listed at the end, not glossed over.

## 1. Measured audit (`_tools/website_audit.mjs`, against the tokens in DESIGN-SPEC.md §10)

Run on every page at 1440×900 and 390×844:

| Page | Result | Families | Weights | Contrast failures | Off-scale spacing / type | Overflow | Dashes | Hero CTA bottom (1440 / 390) |
|---|---|---|---|---|---|---|---|---|
| index | **CLEAN** | Hanken Grotesk, Sora | 400, 600 | 0 | 0 / 0 | none | 0 | 621px / 443px |
| about | **CLEAN** | same | 400, 600 | 0 | 0 / 0 | none | 0 | 598px / 359px |
| results | **CLEAN** | same | 400, 600 | 0 | 0 / 0 | none | 0 | 503px / 391px |
| book | **CLEAN** | same | 400, 600 | 0 | 0 / 0 | none | 0 | 651px / 596px |
| privacy | **CLEAN** | same | 400, 600 | 0 | 0 / 0 | none | 0 | n/a |
| 404 | **CLEAN** | same | 400, 600 | 0 | 0 / 0 | none | 0 | n/a |

- **UNVERIFIED contrast:** none on the final run. An earlier run flagged the three nav links because their hover underline was a background gradient; the underline is now a pseudo-element, so the audit can measure them (ink-1 on paper-1, 16.1:1).
- **Checked by eye:** text over the squared ground. The grid lines are 1px at 34% of an already faint blue, every 24px, and change local contrast by under 2%. No text sits on a photo anywhere.
- **Dead-space check:** `#proof` (the pinned scene's scroll track) and `#scheduler` (filled by the Calendly iframe, which the audit cannot see) are declared intentional in the tokens. Every other section passes.
- **Fixes the audit drove during the build:** one off-scale margin (the loop round "foreign"), a horizontal overflow on Results at 390px (the grade pairs could not wrap), and a dead gap on the Book page (declared intentional, see above).

## 2. Performance

| Page | LCP, throttled phone (4× CPU, 1.6 Mbps, 150ms RTT) | CLS, throttled phone | LCP / CLS desktop | Transfer (first load) |
|---|---|---|---|---|
| index | 1,068ms (hero photo) | 0.000 | 88ms / 0.002 | 181 KB |
| about | 872ms (portrait) | 0.000 | 64ms / 0.000 | 118 KB |
| results | 668ms (intro text) | 0.000 | 64ms / 0.000 | 73 KB |
| book | 732ms (photo) | 0.000 | 64ms / 0.000 | 94 KB, plus the Calendly iframe |

- **CLS started at 0.145** on the throttled phone: the hero headline re-wrapped when Sora replaced the fallback font. Fixed with metric-matched Arial fallback faces (`size-adjust`), `em` measures instead of `ch`, and explicit headline breaks (DESIGN-SPEC §3.2). Result: 0.000.
- **Frame times** (scrolling 24px per frame, like the audit): the audit's `#proof` run has 187 frames at 1440 and 175 at 390, max 16.8ms, 0 frames over 50ms. A full-page scroll of index, about and results at both widths also stays at 16.8ms max, 0 over 50ms. One 67-83ms frame appeared in early runs as the paper stack first painted mid-scroll; the stack is now painted from the start and three cold runs showed no frame over 30ms.
- **Assets:** photos are WebP at 2-3 sizes with `srcset`, `width`/`height` on every image, and lazy loading below the fold; the hero image is preloaded with `fetchpriority="high"`. The lesson video was re-encoded from 9.6 MB to 2.0 MB and loads only on play (`preload="none"`). The whole `site/` folder is 2.9 MB, 2.0 MB of it the video.

## 3. Viewports and states I looked at

Contact sheets and single frames, reviewed by eye, for every page at **1440×900, 1280×720, 768×1024 and 390×844**, plus **375×667** (iPhone SE) and **844×390** (landscape phone) for the papers scene. Fixed from the screenshots:

- tablet margin notes wrapping mid-phrase ("Days 1-" / "90", "You decide here" on three lines);
- the method photo filling a whole tablet screen, and the forgetting curve unreadable at 390px (it now bleeds to the edges with larger labels) (round 01: the method section, photo and curve have since been removed);
- "1-to-1" and "A-Level" breaking at the hyphen;
- "You decide here" sitting inside step 3 instead of between steps 2 and 3;
- the curve's axis label colliding with the first review tick;
- the About portrait and team photo out of balance (the presenting photo is now a 4:3 crop);
- "only foreign" reading as one word once the loop was drawn;
- the scene note running into the paper stack;
- the pinned scene cut off in landscape (it now pins only on screens at least 560px tall);
- the FAQ repeating the struggles layout.

**Reduced motion** (`prefers-reduced-motion: reduce`, 1440 and 390): no pinning, papers side by side in their finished state with the old totals and grades struck through (round 01), plan fully ticked, every loop drawn, no transitions. **No JavaScript:** the same static final state; the video keeps native controls; every review shows; FAQ works (native `<details>`); the phone "Menu" becomes a link to the footer navigation. **Live resize across 560px of height:** the scene reverts to static and rebuilds (gsap.matchMedia).

## 4. Interaction tests (`_scratch/interact.mjs`): 25 of 25 pass

Mobile menu opens, sets `aria-expanded`, moves focus in, traps Tab, closes on Esc and returns focus · the header CTA is hidden while the hero CTA shows, reappears in the papers scene, hides again at the closing CTA, and is always hidden on book.html · never more than one primary button on screen anywhere on the home page at 1440 (sampled every 450px) · 2px focus outline on keyboard focus · the skip link is the first tab stop and jumps to `#main` · the lesson video plays with controls after its button is pressed · FAQ opens · the Results filter shows 24 / 11 / 8 and updates `aria-pressed` and the live count · the Calendly iframe loads calendly.com/bhavishacvalgi · the fallback link is present · every internal link and anchor resolves · every image loads and has alt text and width/height.

## 5. BRIEF.md §8 hard rules

| Rule | Status | Evidence |
|---|---|---|
| No WhatsApp, SMS or email screenshots; testimonials typeset | PASS | Every review is HTML text; no screenshot is in `site/images` |
| No invented facts (prices, ratings, numbers, names, contacts, results) | PASS | CLAIMS.md traces every claim. The exam-paper questions and working are illustration, labelled on the page ("The papers are illustrations. The grades and the words are the students' own.") |
| No fake product UI or mock screenshots with made-up data | PASS | No portal or dashboard. The papers are the concept the brief asks for (§0e) and are labelled as illustrations |
| No emoji, gradient text, glow, glassmorphism, keyword-in-accent headlines, six-identical-cards grid, sideways star carousel | PASS | The only gradient is inside the client's logo mark; the header is 94% opaque paper with no blur; all headlines are one ink colour |
| British English, zero em dashes, none of the banned words | PASS | Text scan of all six pages: 0 em/en dashes, no US spellings, no banned words except "truly" inside Kaushik's verbatim review (#31), which must stay as written |
| WCAG 2.2 AA contrast | PASS | Audit: 0 failures; every pair with its ratio in DESIGN-SPEC §2.2 (lowest body text: ink-3 on paper-3, 5.47:1) |
| Semantic HTML | PASS | header / nav / main / footer landmarks; one h1 per page; sections labelled by their headings; steps as `<ol>`; FAQ as `<details>`; quotes as `<figure><blockquote><figcaption>`; filter as `role="group"` buttons with `aria-pressed` |
| Alt text on every photo | PASS | Images test; decorative SVG is `aria-hidden`; each exam paper is `role="img"` with a description of what is marked |
| Keyboard-usable, visible focus | PASS | Section 4 |
| `prefers-reduced-motion` respected | PASS | Section 3 |
| Performance: static, no build step, optimised photos, lazy-loading | PASS | Section 2 |

## 6. BRIEF.md §0 checks

| Check | Status |
|---|---|
| §0c hero: WHO and WHAT in the headline at 107px ("1-to-1 GCSE and A-Level tutoring."), OUTCOME and HOW in the first line under it (90-day plan, target grade, two live online lessons a week, expert tutor, how examiners mark), CTA with a free/no-obligation note beside it | PASS. Subtext 24 words (limit 25) |
| §0b one CTA label everywhere, "Book a free consultation" (book.html: "Pick a time") | PASS |
| §0b three steps with the approved content, "you only commit after the second" | PASS |
| §0e signature: papers marked in violet pen as you scroll; Grade 1 → "Pass" (no number invented); Grade 6 → 8 in five weeks; then the 95% record | PASS (round 01: each paper now starts weak and is corrected as you scroll; see §0) |
| §0f logo lockup: client's mark, CLASS `#3B82F6` / HERO `#8B5CF6` in Sora 800, thin rule between; mark 60px in an 88px header | PASS |
| §0f buttons `#2563EB` or darker | PASS: blue-9 is `#1E63EA` (luminance 0.151 vs 0.153), 5.16:1 with its label |
| §0f-2 colour: blue, violet, navy ink on warm paper; no new hue families; nothing childish | PASS. Photos carry their own natural colour (wood, a lanyard); no UI element uses another hue |
| §0g banned patterns: floating card over the hero photo, pill/eyebrow carrying the offer, three equal icon tiles, gradient CTA banner, three identical feature cards, accent keyword in a headline, star carousel, fake product UI, WhatsApp screenshots, gradient blobs behind photos, the CTA repeated more than once per screen | PASS on all eleven. On the last: the header button steps aside while another booking button is visible. The footer's plain "Book a free consultation" nav link (specified in COPY.md) can share the final screen with the closing CTA; it is a text link in the footer nav, not a second button |

## 7. design-taste-frontend pre-flight (§14)

| # | Check | Result |
|---|---|---|
| 1 | Brief inference declared | PASS: DESIGN-SPEC §1 ("marketing site for a founder-led UK tutoring business… revision-notebook concept") |
| 2 | Dials explicit and reasoned | PASS: VARIANCE 6, MOTION 5, DENSITY 3, with reasons |
| 3 | Design system chosen or aesthetic labelled honestly | PASS: native HTML/CSS/JS, aesthetic labelled "revision notebook", GSAP only for one scene |
| 4 | Redesign mode detected, audit done | PASS: overhaul; both old sites reviewed from the screenshots in `reference/old-sites/` (BRIEF §3 audit) |
| 5 | Zero em dashes | PASS: 0 on every page (audit + text scan) |
| 6 | Page theme lock | PASS: one light theme; section grounds are all warm paper tints |
| 7 | Colour consistency lock | PASS: blue = action, violet = pen, on every page |
| 8 | Shape consistency lock | PASS: 8px controls, 2px paper; documented in the spec |
| 9 | Button contrast | PASS: 5.16:1 (hover 6.65:1) |
| 10 | CTA labels never wrap at desktop | PASS: every button has `white-space: nowrap`, and each sat on one line in every screenshot from 390 to 1440 |
| 11 | Form contrast | N/A: the only form is Calendly's, inside its iframe, themed to our ink and blue |
| 12 | Serif discipline | N/A: no serif |
| 13 | Premium-consumer beige/brass palette | PASS: none; paper neutrals are near-white with chroma under 0.012 and there is no brass or espresso |
| 14 | Italic descender clearance | PASS: italics are only in body-size quotes with line-height 1.3-1.55 |
| 15 | Hero fits the viewport | PASS: headline 2 lines at 768+, 3 at 390; CTA bottom at 621px (1440×900) and 443px (390×844). Subtext is 24 words: over the skill's 20, inside the brief's 25, and the brief wins |
| 16 | Hero top padding ≤ 96px | PASS: 48px |
| 17 | Hero stack ≤ 4 text elements | PASS: headline, subtext, CTA, and the short note beside the CTA, which brief §0c asks for. No eyebrow |
| 18 | Eyebrow count | PASS: 0 uppercase eyebrows (the only uppercase text is Nitin Parmar's signature) |
| 19 | Split-header ban | PASS: struggles pairs its heading with the list itself; no floating explainer paragraphs |
| 20 | Zigzag cap | PASS: never more than two image+text splits in a row |
| 21 | No duplicate CTA intent | PASS: one booking label; "Read every review" and "More about Bhavisha" are different intents |
| 22 | Logo wall | N/A |
| 23 | Bento background diversity | N/A: no bento |
| 24 | "Trusted by" wall | N/A |
| 25 | Copy self-audit | PASS: every string re-read. Found and fixed: a sentence invented in Bhavisha's voice ("Teaching is a calling for me…"), an embellishment ("tutoring stayed part of my week"), an unsupported claim ("Booking takes about a minute"), "promise" in an FAQ question (banned by OFFER.md), "three techniques" introducing four items, and a video caption that called the clip a Class Hero lesson |
| 26 | Motion motivated | PASS: every animation has a reason in DESIGN-SPEC §5 |
| 27 | One marquee max | PASS: none |
| 28 | Navigation one line, height | DEVIATION (brief): one line; 88px tall against the skill's 80px cap, because brief §0f asks for an 84-96px header after the client said the last one was too small |
| 29 | No layout family repeated | PASS after one fix (FAQ restacked); nine home sections, eight families |
| 30 | Bento rhythm | N/A |
| 31 | Long lists use the right component | PASS: FAQ as an accordion; 24 reviews in two masonry columns with a filter (round 01: the grade-movements rows were removed) |
| 32 | Real images, no div screenshots | PASS: five real photos and the real video (round 01: the one generated notebook photo was removed with the method section) |
| 33 | No pills over images | PASS |
| 34 | No decorative photo credits | PASS: captions are functional ("Bhavisha Valgi, founder and lead tutor") |
| 35 | No version footers | PASS |
| 36 | No micro-meta sentences under headings | PASS |
| 37 | No decorative text strip at hero bottom | PASS |
| 38 | No floating top-right sub-text | PASS |
| 39 | No filled-track progress bars | PASS: the plan uses empty squares that fill with ticks, not a bar |
| 40 | No locale/time strips | PASS |
| 41 | No scroll cues | PASS |
| 42 | No version labels in hero | PASS |
| 43 | No section-number eyebrows | PASS: the step numerals are a real sequence (the brief's three steps) |
| 44 | No decorative dots | PASS |
| 45 | No top+bottom border on every row | PASS: one hairline between rows |
| 46 | Content density | PASS: section intros ≤ 25 words; no data tables |
| 47 | Quotes ≤ 3 lines, clean attribution | DEVIATION (brief): short quotes on home run 3-5 lines at desktop and the Results page shows every review in full, because the brief requires verbatim quotes ("never invent or polish a quote") and COPY.md's own home quotes are this long. Cuts are marked "…"; attributions use no dashes |
| 48 | Motion claimed = shown | PASS |
| 49 | GSAP pin pattern | PASS: CSS sticky stage with a ScrollTrigger scrub from "top top" to "bottom bottom"; no half-pinned states |
| 50 | No scroll listeners | PASS: grep finds none; IntersectionObserver and ScrollTrigger only |
| 51 | Reduced motion | PASS |
| 52 | Dark mode | DEVIATION (brief): light only. The brief fixes a warm white ground, and the paper concept does not survive inversion; `color-scheme: light` is declared |
| 53 | Mobile collapse explicit | PASS: every multi-column section declares its layout below 768/1024px (DESIGN-SPEC §7) |
| 54 | Viewport stability | PASS: `svh` with a `vh` fallback; no `h-screen` |
| 55 | Animation cleanup | PASS: gsap.matchMedia reverts the scene's sets, tweens and triggers when it stops matching |
| 56 | Empty / loading / error states | PASS where they exist: the video has a poster and a download link inside `<video>`; the scheduler has `noscript` and an always-visible fallback link; the filter never returns zero results |
| 57 | Cards omitted where possible | PASS: no cards; groups are separated by space and single hairlines |
| 58 | Icons from a library, no hand-rolled SVG | DEVIATION (concept): the pen marks (ticks, loops, strikes, handwriting) are hand-drawn SVG paths, because the brief's concept is a marking pen and no icon set draws one. The only other glyphs are a two-line menu icon, a close cross, a play triangle and a CSS plus sign |
| 59 | Motion isolated in client components | N/A: no React |
| 60 | No AI tells | PASS: no Inter, no AI-purple glow, no three equal cards, real names only |
| 61 | Core Web Vitals plausible | PASS: measured (Section 2) |
| 62 | One design system | PASS |

## 8. What I could not verify

- **Other browsers and real devices.** Everything ran in headless Chromium on macOS. I did not run Safari, Firefox, iOS Safari or Android Chrome. Known risks are covered with fallbacks: hex for OKLCH, plain `rgb()` alpha instead of `color-mix()`, `overflow-x: hidden` before `clip`, `vh` before `svh`. The pinned scene uses CSS `position: sticky` plus GSAP, which both engines support, but its feel on an iPhone is untested.
- **Frame budget on a low-end phone.** 16.8ms was measured in desktop Chromium, including at 390×844; CPU-throttled scrolling was not measured.
- **Screen readers.** Structure, labels, focus order and names were checked in code and by keyboard. No VoiceOver or NVDA session was run.
- **A real Calendly booking.** Not submitted, per the house rules. The iframe loads the right page, but it currently shows "Virtue Led Learning" and a "30 Minutes" event (CLAIMS.md, blocking item 2).
- **The video's audio.** I could only see it. The caption's topic comes from the whiteboard; "with sound" comes from the file having an audio track.
- **Photo identity, consent and facts marked CONFIRM** in CLAIMS.md: the six-photo question, children's-name consent, the developer-draft credentials, and the consultation length.
- **Lighthouse.** It is not installed and the rules forbid downloads, so LCP and CLS were measured with PerformanceObserver under CDP throttling instead of a Lighthouse score.
- **Legal pages.** The privacy page is a placeholder, and cookie consent for the Calendly embed needs the client's decision (CLAIMS.md, blocking items 4 and 6).

## 9. Housekeeping

- The local server used for testing (`127.0.0.1:8123`, serving `site/`) is stopped at the end of the run. A different server was already listening on port 8000 from another folder (`/Users/edwinchen/Work/classhero-site/site`). It was not started by this run, so I left it alone, and nothing in this run read from it.
- Image generation: 1 of the 8 allowed images was used (`_scratch/gen/desk-notebook.png`, cropped for the method section). Round 01 removed it from the site; the source stays in `_scratch/gen/`.
- Round 01: the test server on `127.0.0.1:8124` was stopped at the end of the run.
- All scratch work, screenshots and test scripts are in `_scratch/`; audit reports in `_audit/`.
