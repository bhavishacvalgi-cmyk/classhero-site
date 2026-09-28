# Class Hero website: run, deploy, maintain

A static site in `site/`: plain HTML, CSS and JavaScript, no build step. Everything a browser needs is in the folder, except three things loaded from CDNs: Google Fonts (Sora, Hanken Grotesk), GSAP 3.13 with ScrollTrigger from jsDelivr (home page only), and Calendly's widget (Book page only).

## Run it locally

```bash
cd site && python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/. Any static server works; opening the files straight from disk mostly works too, but the Calendly embed and fonts behave best over http.

## Deploy

**Netlify:** drag the `site/` folder onto app.netlify.com/drop, or connect the repo with publish directory `site` and no build command. `site/_headers` sets cache and security headers; `404.html` is picked up automatically.

**Vercel:** `cd site && npx vercel` (or import the repo with root directory `site`, framework "Other", no build command). `site/vercel.json` sets the same headers.

Before go-live: work through the blocking list at the top of `CLAIMS.md` (photos, Calendly page name, consultation length, privacy policy, consent), and point `classhero.co.uk` at the host. Canonical URLs, Open Graph tags, `robots.txt` and `sitemap.xml` already assume that domain.

## The pages

| Page | What it does |
|---|---|
| `index.html` | The whole argument on one page. Hero (who, what, outcome, how, one CTA) · the marked exam papers (the signature scroll scene) and the 95% record · the three struggles · the three steps with the 90-day plan written out · "Why I started Class Hero." (Bhavisha's story) with the lesson clip · four reviews · eight FAQs · closing CTA |
| `about.html` | Bhavisha's story (the same text as on home) with margin notes, her motto, qualifications, the team, the lesson clip, Nitin Parmar's reference |
| `results.html` | The 95% record, then all 24 usable reviews verbatim with a Parents / Students filter |
| `book.html` | What happens on the call, then the inline Calendly scheduler (calendly.com/bhavishacvalgi) with a plain link fallback |
| `privacy.html` | Placeholder, clearly marked, until the client supplies a policy |
| `404.html` | Not-found page with links back |

## Files

```
site/
  index.html, about.html, results.html, book.html, privacy.html, 404.html
  css/site.css        all styles; tokens at the top (colour ramps, type scale, spacing)
  js/site.js          header state, one-CTA-per-screen hand-off, mobile menu, video button, results filter
  js/scenes.js        GSAP scroll scenes (home page only); skipped entirely under reduced motion
  images/             WebP photos at 2-3 sizes, the CH mark (SVG), tick mask, favicons, share image
  video/              the lesson clip, re-encoded (2.0 MB, H.264, faststart)
  robots.txt, sitemap.xml, _headers (Netlify), vercel.json (Vercel)
```

## The design system in brief
Full detail and every contrast ratio: `DESIGN-SPEC.md`.

- **Concept:** a well-made revision notebook. Faint pale-blue squared paper, a violet margin rule, navy ink type, and a violet marking pen that ticks, strikes and circles only where something is true.
- **Colour:** blue for actions only (buttons, links, focus); violet for the pen only (ticks, circles, strikes, margin notes, the margin rule); navy ink for text; warm paper neutrals for grounds. The blue-to-violet gradient exists only inside the logo mark. One exception, inside the two exam papers only: the weak first attempt is marked in red (`--pen-red`, the site's only red) and the improved paper in blue (`--blue-9`), so the before → after reads in colour (DESIGN-SPEC §2).
- **Type:** Sora 600 for headings (800 only in the CLASS/HERO wordmark), Hanken Grotesk 400/600 (and italic for quotes) for text. One modular scale, fluid between 390px and 1440px; every size on the site is a step.
- **Space:** 4px base scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128); sections 128 / 96 / 64px padding by breakpoint. A margin column (160px on desktop) holds real annotations only.
- **Shape:** 8px radius on controls, 2px on paper things (sheets, photos, video). One soft shadow for paper, nothing else casts one.
- **Motion:** the exam papers are scrubbed to scroll (pinned only on screens at least 560px tall); pen strokes draw once when they enter; everything else is still. Reduced motion and no-JavaScript both show every final state.

## Editing

- **Copy:** edit the HTML directly. Keep the CTA label "Book a free consultation" everywhere (it is "Pick a time" only on the Book page). Keep reviews verbatim; add any new fact to `CLAIMS.md`.
- **Header and footer** are repeated in each HTML file. Change all six files, or edit `_scratch/partials/` and run `node _scratch/papers/inject.mjs`, which rewrites the header, footer and the generated SVG regions between the `<!-- @name -->` markers.
- **The exam papers, pen marks and plan** are static inline SVG in `index.html`. The papers (each with a before and an after state) come from `_scratch/papers/build2.mjs`, the pen marks and plan from `marks.mjs`, the slip from `build.mjs`; `inject.mjs` writes them into the page (handwriting and pen strokes are seeded, so they rebuild identically). These are optional dev-time helpers, not a build step.
- **Photos:** export WebP at the sizes already used (see `srcset`) and keep `width`/`height` attributes so nothing shifts while loading.
- **Checks:** `node _tools/website_audit.mjs http://127.0.0.1:8000/index.html --spec DESIGN-SPEC.md --out _audit` (repeat for each page) measures spacing, type scale, fonts, contrast, overflow, the hero CTA and frame times against the spec.
