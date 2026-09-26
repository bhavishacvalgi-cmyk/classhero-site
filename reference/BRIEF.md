# Class Hero: website brief

> Written 2026-09-26 by Claude (for Eddie Chen, Legacy AI), after inspecting both current sites in a headless browser (computed fonts, colours and copy extracted, full-page screenshots at 1440 and 390 in `reference/old-sites/`) and reading the client's brand kit (`brand/branding-kit-v1.png`). Everything below is either measured from those sites or stated by the client. Anything uncertain is marked **CONFIRM**.

---

## 1. The business

- **Class Hero** is a UK online tutoring business for **GCSE and A-Level students** (also KS3 and some 11+). Founder and lead tutor: **Bhavisha Valgi** ("Miss Valgi" to students). She leads a small team of tutors she has trained in her method.
- **Offer:** live, interactive online lessons with a heavy exam focus, taught by current expert tutors. The promise on the current site: *improve grades in 90 days without the stress of figuring out how*.
- **Subjects stated:** GCSE Maths and English, A-Level Maths and Economics (developer draft). Testimonials also mention KS3 Maths, Science, creative writing and 11+. **CONFIRM** the subject list.
- **Lessons:** the developer draft says "live 1-to-1". The live site says "live interactive online lessons" without saying 1-to-1 or group. **CONFIRM**; until confirmed, say "live online lessons" and "1-to-1 support".
- **Proof claims:** live site: "over 100 students, 95% achieving their aspirational grades". Developer draft: "95% of 112 students hit their target grade". The two numbers differ. **CONFIRM**; use "over 100 students" (the client's own wording) until confirmed.
- **Credentials (developer draft, About page):** six years of professional tutoring (companies and private); sat both GCSE specifications (A*-U and 9-1), 16 GCSEs in total; tutored through her own A-Levels, university and jobs; began full-time private tutoring during COVID because of the learning gaps it opened.
- **Primary action:** book a free call. Booking link: **https://calendly.com/bhavishacvalgi** (from the developer draft).
- **No known:** prices, phone, email, address, exam boards, company number. Do not invent any of them. Leave clearly marked placeholders where a real site would need them (e.g. a privacy policy link).

## 2. Who the site is for

Two readers, one decision:

1. **Parents** (they pay and they book the call). They want: proof other parents trust her, grade movements, organisation (homework, feedback, communication), and a calm, credible business. Most of the strongest testimonials are from parents.
2. **Students** (Gen Z, 14-18). They want: to stop feeling lost, lessons that are not boring, less stress, a tutor who gets them. The live site's copy speaks to students ("You deserve a social life and a full night's rest").

Write for the parent first and let the student feel seen. British English throughout (maths, programme, organised, Year 11).

## 3. The two current sites, and what is wrong with each

### 3a. Live site: classhero.co.uk (GoHighLevel funnel page)
Measured: one long page, 7,312px tall. Montserrat for everything. Black cards, amber `#F7B31D` pill buttons, no navigation, no page title, no alt text on any of its 27 images. A clip-art logo (a caped figure holding a book). About 20 screenshots of WhatsApp chats, emails and review cards stacked in two columns.

- **Keep:** her voice and story; the three struggles (lack of motivation and accountability, poor exam technique, not enjoying classes); the method with names (active recall, blurting, spaced repetition; "think like an examiner"; "study smarter, not harder"); the line about deserving a social life and a full night's rest; the sheer volume of real proof.
- **Lose:** the WhatsApp and email screenshots (**the client says they look informal and unprofessional**; transcribed as text in `reference/testimonials-verbatim.md`); the clip-art logo; the 30-word headline; three identical "BOOK A CALL NOW" bars; all-black cards.

### 3b. Developer's draft: classhero-uk.vercel.app (Next.js)
Eddie's verdict, and the measurements agree: **generic, AI vibe-coded.** Specifically:

- **The palette is the Tailwind default palette.** Blue `#3B82F6` is Tailwind blue-500, the violet is violet-600, the ink `#0F172A` is slate-900, grey `#64748B` is slate-500, the ground `#F5F6FA` is a cool grey. (The brand kit's hexes are also Tailwind defaults, because ChatGPT generated it. See §4.)
- **Sora + Inter**, straight from the brand kit, at template sizes: every H2 is 42px bold, every card title 18px, every body 15px grey.
- **Template layout, section after section:** a small uppercase violet eyebrow, then a 42px H2, then a grid. Six identical bordered cards numbered 01-06. A "Typical tutor vs Class Hero" comparison table. A sideways testimonial carousel with star ratings on every card (**most of the source testimonials have no stars**; do not add ratings that do not exist). A dark CTA band that repeats the hero ("No more guesswork." with the keyword in blue).
- **Keyword-in-accent-colour headlines** ("without the *guesswork*"), a classic generated-site tell.
- **Fake product UI:** a whole dark section of "student portal" mockups with invented data (Algebra II recording, 42 min, Grade 7, 14 of 22 topics) for a portal that does not exist yet ("Coming soon"). Div-drawn screenshots with made-up content. Do not do this. If the portal is mentioned at all, it is one honest line.
- **Stock hero:** text left, a rounded photo right, a small floating card overlapping it.
- **What it got right:** navigation (Home / Who We Are / Results / Book a call), a tighter headline ("Improve your grades in 90 days, without the guesswork" is a fair base), real photos of Bhavisha, a teaching video, the credentials list, typed-out testimonials.

### 3c. The proof, and the traps in it
`reference/testimonials-verbatim.md` transcribes every screenshot from the live site (32 real testimonials from students, parents and one referee letter) and ranks the strongest eight. Read its "Do not use" section. Four traps:

- **Green WhatsApp bubbles are Bhavisha's own messages.** "Phoebe: 30-40% to 75%" (#25) and "Bhumi: Grade 5 to 7" (#16) are her lesson reports to parents, not testimonials. The developer's draft presented them as student quotes. They can appear as "from a lesson report" results, never as a client quote.
- **Two quotes on the developer's draft exist in no screenshot** ("Brandon", Grade 2 to 5 in 3 months, and a second "Simran" review). Leave them out until the client supplies the originals.
- **#22 is about a male tutor** ("the way he explains"). It is a team testimonial, not a Bhavisha one.
- **Children are named** in several screenshots (Amelia, Suraj, Rosa, Mona, Bhumi, Phoebe, Bernie, Taleen). Without family consent, credit quotes by role ("Parent of a Year 8 student", "Year 11 student") and remove children's names from the quote text using [brackets]. List every name used in `CLAIMS.md` as CONFIRM consent.

The strongest student story is Taleen's (#26): Grade 1 in Year 10 to passing GCSE Maths and starting A-Levels. The strongest parent-reported movement is Rosa B to A and Mona C to B in a month (#32).

## 4. The brand kit, read critically

`brand/branding-kit-v1.png` was generated by ChatGPT. **The client likes its colour scheme (blue + violet) and describes the feel she wants as "warm but professional".** Treat the kit as direction, not as a spec.

| Kit says | Use it like this |
|---|---|
| Wordmark: CLASS (blue) over HERO (violet), geometric bold sans, the A drawn as a caret with a tick through it | **Keep the idea.** It is a raster image, not a vector. Rebuild it as a clean inline SVG wordmark in the display face (CLASS blue, HERO violet, the tick in the A), plus the "CH" submark with the tick for the favicon. Mark it as interim until the client supplies a vector logo. The tick is the brand's one real motif: use it for list bullets, progress, and confirmation states. |
| Palette: `#3B82F6` primary blue, `#60A5FA` sky, `#8B5CF6` violet, `#0F172A` deep navy, `#64748B` slate, `#F5F6FA` off-white | **Keep the hues, tune the values.** These are raw Tailwind defaults, which is exactly why the developer's draft looks like every other Tailwind site. Build proper ramps (OKLCH) around the blue and the violet. **Warmth comes from the neutrals and the photography, not from changing the hue**: a warm paper ground instead of cool grey, warm-tinted navy ink, warm greys. Blue is the action colour (buttons, links). Violet is reserved for brand moments (HERO, the tick, progress marks). The blue-to-violet gradient appears in the kit's mission band; use it at most once, flat, never on text and never as a glow. Every text colour must pass WCAG AA on its ground (check blue on white: `#3B82F6` is only ~3.7:1, so body links and small text need a darker blue from the ramp). |
| Type: Sora Bold headings, Inter Regular body | **Keep Sora for display** (it matches the geometric wordmark). Inter is the ChatGPT default body face and half of why the draft looks generated; keep it only if you can justify it in the spec. A warmer humanist or grotesque text face from Google Fonts (e.g. Figtree, Hanken Grotesk, Instrument Sans, Onest) is a better fit for "warm". Two families maximum. |
| Icons: thin line icons (cap, chart, target, person, star, shield) | Fine as direction. Draw a small consistent inline-SVG set; no icon fonts, no emoji. Use sparingly. |
| Imagery: students studying, a tutor on a video call, a branded notebook, a laptop with a chart | Direction for mood. **Real photos of Bhavisha come first** (`assets/photos/`). Generated images, if used, are for atmosphere only (a desk, a notebook, a revision session from behind) and must never be captioned or placed so they read as real Class Hero students or next to a testimonial. |
| UI: filled blue "Book a Free Call" + outline "Learn How It Works"; three small feature tiles | One primary filled button per view; secondary actions quieter. Avoid the three-tile row as a default layout. |
| Tagline: **Better grades. Greater confidence. Brighter futures.** | Keep. It is the client's. |
| Mission: *Empowering students to reach their full potential through expert tutoring, mindset coaching and personalised academic support.* | Keep the substance; the wording may be tightened. |

## 5. The feel

**Warm but professional.** A calm, well-organised study room on a bright morning: paper, ink, one blue pen, a violet highlighter, a tick in the margin. Confident and reassuring to a parent, not childish, not corporate, not a SaaS landing page. Motion is calm and purposeful. Nothing bounces, glows or sparkles.

## 6. Pages and content

Build a small multi-page static site: **Home, About (Meet Bhavisha), Results, Book a call.** Suggested content, which the builder may re-order and improve:

- **Home:** navigation with the wordmark and one primary "Book a free call" · hero (the 90-day promise, a proof line, the CTA, a large real photo of Bhavisha) · proof immediately after the hero (measured grade movements from real testimonials) · who it is for (the three struggles) · the method (study smarter; think like an examiner; expert growth-mindset tutors) with the signature interaction (§7) · meet Bhavisha (short story + the teaching video) · selected testimonials, typeset · how to start (book the call, get a plan, start lessons) · FAQ (answer only from facts in this brief; mark unknowns for the client) · final CTA · footer with the tagline.
- **About:** the full story and credentials, her team and how they are trained, the teaching video, the photos.
- **Results:** every usable testimonial from `reference/testimonials-verbatim.md`, typeset as quotes with who said it (parent / student), subject and level, and the grade movement where stated. A grade-movement summary. Filtering by parent/student or subject is welcome.
- **Book a call:** what happens on the call, then the Calendly scheduler (https://calendly.com/bhavishacvalgi; the inline embed widget from assets.calendly.com is fine) with a plain link fallback.

## 7. Signature interaction (the equivalent of the VEYRIN watch)

One memorable, on-brand piece that also explains the product. Two candidates; pick one (or both, if each earns its place) and make it excellent:

- **The forgetting curve.** A scroll-scrubbed SVG chart: a memory curve drops away after a lesson; each spaced-repetition review (drawn as the brand tick) lifts it and flattens it, until the topic is secure by exam day. It explains active recall and spaced repetition better than any paragraph, and nobody else in this market has it.
- **The grade journey.** A 1-9 grade scale where the real movements from the testimonials climb into place (Grade 5 to 7, Grade 6 to 8, 30-40% to 75%), each attached to its quote.

It must be smooth on a laptop and a phone, degrade to a static final state under `prefers-reduced-motion`, and stay readable without JavaScript.

## 8. Hard rules

- No WhatsApp, SMS or email screenshots anywhere on the site. Testimonials are typeset text.
- No invented facts: no prices, star ratings, student numbers, names, contact details or results that are not in this brief or the testimonials file. Every factual claim on the site goes into `CLAIMS.md` with its source, for the client to confirm.
- No fake product UI or mock screenshots with made-up data.
- No emoji, no gradient text, no glow, no glassmorphism, no keyword-in-accent-colour headlines, no six-identical-cards grid, no sideways star carousel.
- Copy: British English, concrete, zero em dashes, none of: elevate, seamless, unlock, unleash, empower (in body copy), revolutionise, journey (as a metaphor), "in today's fast-paced world".
- Accessibility: WCAG 2.2 AA contrast, semantic HTML, alt text on every photo, keyboard-usable, visible focus, `prefers-reduced-motion` respected.
- Performance: static files, no build step, fast on a phone (optimise the photos to WebP/AVIF at sensible sizes; lazy-load below the fold).
