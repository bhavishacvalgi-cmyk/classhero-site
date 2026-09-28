# Class Hero: every factual claim on the site

Checked 2026-09-26 against the built pages in `site/`; updated 2026-09-28 after feedback round 01 (method section and Results grade movements removed, exam papers rebuilt as before → after) and again after feedback round 02 (Bhavisha's own copy: her story, the struggles, the FAQ; see "Client facts confirmed in round 02" below). Sources: `BRIEF.md` (§0 overrides the rest), `reference/OFFER.md` (including Bhavisha's answers of 2026-09-26), `reference/COPY.md`, `reference/testimonials-verbatim.md` (quoted by entry number, e.g. #26). **CONFIRM** marks anything the client must check before launch.

## Do these first (blocking before launch)

1. **CONFIRM the photos are Bhavisha.** They come from two shoots that look different: (a) `bhavisha-hallway.jpg` (home hero) and `bhavisha-final-cta.jpg` (Book page) show a woman with straight dark hair in a houndstooth jacket; (b) `bhavisha-portrait-wall.jpg` (About hero), `bhavisha-speaking.webp` (About, "presenting") and the teaching video show a woman with long, lighter, wavy hair. Every one is captioned or described as Bhavisha. If any photo is not her, swap it before launch. (`bhavisha-hero-portrait.jpg` is not used: it duplicates the About portrait.)
2. **CONFIRM the Calendly page name.** The embedded scheduler at calendly.com/bhavishacvalgi currently shows the heading "Virtue Led Learning" and an event called "30 Minutes". Parents booking a Class Hero consultation will see that name. Rename the Calendly page to Class Hero and the event to "Free consultation" in Calendly's settings (no site change needed).
3. **CONFIRM the consultation length.** The site deliberately says "a short video call" and never gives a length (BRIEF §0a). The Calendly event is set to 30 minutes; if that is right, "30 minutes" can be added to the Book page.
4. **CONFIRM a privacy policy.** `privacy.html` is a clearly marked placeholder (BRIEF §0a, §1). It lists the third parties the site loads: Calendly (Book page), jsDelivr (GSAP scripts, home page), Google Fonts (every page). A real policy is needed before launch because the site collects booking details through Calendly.
5. **CONFIRM consent for every name** listed under "Names on the site" below.
6. **CONFIRM cookie handling.** The site sets no cookies of its own, but the Calendly embed on the Book page does. Calendly's own consent banner is left on (the embed does not pass `hide_gdpr_banner`). The client should confirm with whoever advises them on UK GDPR/PECR whether a site-level cookie notice is also wanted.

## Global (every page)

| Claim on the site | Where | Source | Status |
|---|---|---|---|
| Business name "Class Hero" | all | BRIEF §1 | confirmed |
| CH hexagon mark with tick; CLASS / HERO wordmark in Sora 800, `#3B82F6` / `#8B5CF6` | header, footer, favicon, share image | `assets/logo/ch-mark.svg` (client's mark traced from the brand kit), BRIEF §0f | **CONFIRM** a master vector logo; the traced mark is interim (BRIEF §4) |
| Tagline "Better grades. Greater confidence. Brighter futures." | footer, menu | brand kit via BRIEF §4 ("Keep. It is the client's.") | confirmed |
| "© 2026 Class Hero" | footer | assumption | **CONFIRM** the legal/trading name for the copyright line; no company number is shown (none supplied, BRIEF §1) |
| One CTA label, "Book a free consultation", linking to book.html; scheduler at https://calendly.com/bhavishacvalgi | all | BRIEF §0b | confirmed |
| Domain `classhero.co.uk` in canonical URLs, Open Graph tags, `robots.txt`, `sitemap.xml` | page heads | BRIEF §3a (the live site's domain) | **CONFIRM** the new site will replace the live site on this domain |

## Home (`index.html`)

| Claim | Source | Status |
|---|---|---|
| "GCSE and A-Level tutoring." (hero headline; "1-to-1" removed from it in round 02 and still stated in the meta description, the FAQ and step 3) | BRIEF §0a (1-to-1 only), §0c; feedback round 02 §1b | confirmed |
| "A 90-day plan to reach your target grade" | BRIEF §0b, OFFER.md | confirmed |
| "two live online lessons a week" | BRIEF §0a | confirmed |
| "an expert tutor who teaches exactly how examiners mark" | OFFER.md offer statement | confirmed (approved offer) |
| "Free video call. No obligation." | BRIEF §0b (free, no obligation); COPY.md ("a relaxed video call") | confirmed |
| Hero photo captioned "Bhavisha Valgi, founder and lead tutor" | COPY.md §1; BRIEF §1 | **CONFIRM** the photo is Bhavisha (item 1 above) |
| Paper 1: "On a Grade 1 in Year 10. Now doing A-Levels." with her quote | #26 (student). Quote verbatim, one internal cut marked "…" | confirmed as a real review; credited by role. **CONFIRM** consent if the client wants to add her name |
| Paper 1 illustration: GCSE Maths Foundation practice paper, "Year 10". Starts as a failing paper (three wrong answers crossed, one blank, 1 of 8 marks on the page, total 12/80, Grade 1); ends corrected and ticked, 12 struck and 44/80 written, the 1 struck and "Pass" written and circled | BRIEF §0e and feedback round 01 ("A Grade 1 is a fail… 'Pass' is the ceiling of what we claim") | The Grade 1 and "Pass" are hers (#26). No grade number is shown or said for the end state. The questions, working, marks and totals (12/80, 44/80) are invented illustration content, chosen to be consistent with a Grade 1 and a standard pass on one 80-mark Foundation paper. The page says so under the scene: "The papers are illustrations. The grades and the words are the students' own." |
| Paper 2: "Up two grades in five weeks." with his quote | #18 (student). Quote verbatim | confirmed; GCSE is implied by the 9-1 grades, not stated (#18). **CONFIRM** it was GCSE |
| Paper 2 illustration: GCSE Maths Higher practice paper. Starts as a Grade 6 paper that is a mix (two answers ticked, two crossed, 6 of 10 marks on the page, total 38/80); ends with every answer on the page ticked, 38 struck and 61/80 written, the 6 struck and 8 written and circled, "in 5 weeks" | #18 | The 6, the 8 and "5 weeks" are his. Questions, working, marks and totals invented (same note as above), chosen to be consistent with a Grade 6 and a Grade 8 on one 80-mark Higher paper; Year left blank because it is unknown. Higher tier is an assumption that fits a 6 → 8 |
| "95% of our 112 students have reached their target grade." | BRIEF §0a, OFFER.md | confirmed 2026-09-26 |
| "Parents tell us this on the first call more than anything else." | COPY.md §3 ("the most common thing parents tell us in the first call") | approved copy |
| The three struggles, in Bhavisha's words: gaps from earlier years ("We find those gaps early and fill them"); confidence and exam nerves ("build small wins each week, and practise under exam conditions"); motivation and accountability ("check in every week", unchanged) | feedback round 02 §2 (Bhavisha's copy, used verbatim) | approved copy, client's own words |
| Step 1, Day 1: free consultation with the student and a parent; agree a target grade and the gaps; honest fit; no obligation | BRIEF §0b | confirmed |
| Step 2, Week 1: trial lesson, one hour, paid, matched tutor, a real topic from their syllabus, decide afterwards. No price shown | BRIEF §0b; OFFER.md answers (price internal only) | confirmed |
| Step 3, Days 1-90: plan built around exam board, exam dates and weakest topics; two 1-to-1 lessons a week; a written update for parents after every lesson, on their own parent login; homework and feedback every week | BRIEF §0a, §0b; COPY.md step 3 checks; OFFER.md method ("homework every lesson"); feedback round 02 (updates live on the platform, parents have their own login) | confirmed |
| "The plan has a 90-day minimum. Grades move when habits change, and habits take a term to stick." | BRIEF §0b; OFFER.md | confirmed |
| The 12-week plan phases: Weeks 1-4 technique and gaps, 5-8 exam questions under time, 9-12 past papers and review; "each square is one lesson" | COPY.md step 3 visual | **CONFIRM** this is how plans are usually structured (it is drawn as a typical plan, not a promise) |
| Home story "Why I started Class Hero." (four paragraphs; identical on About): started Class Hero at 17, during the pandemic, to help students in Wembley, where she grew up; parents were factory workers who never finished secondary school; the loss of her mum, her dad's depression, drifting apart from her sister; one of the best state schools in the country; first GCSE in Year 8; 10 A and A* grades; UKMT Maths Challenge; a LAMDA public speaking piece on homelessness; over six years tutoring in tuition centres and privately; eight months' experience in schools; studied the theory and pedagogy of teaching at the University of Warwick | Bhavisha's own text, supplied 2026-09-28 (feedback round 02 §3), used verbatim apart from curly apostrophes | confirmed by the client. "One of the best state schools in the country" is her own description and is presented as her words in a first-person story |
| Home ticked facts: over six years of tutoring; 112 students, 95% reached their target grade; 10 A and A* grades at GCSE; specialist subject Economics | her story (round 02); BRIEF §0a | confirmed |
| Lesson video captioned "Bhavisha teaching at the whiteboard: earning money, investments and compound interest. 52 seconds, with sound." | `assets/video/bhavisha-teaching.mp4`; the topic is read from the whiteboard in the video | **CONFIRM** what the session was. COPY.md calls it "a real lesson", but the clip is in person (lanyard, name badge) and may be a workshop rather than an online Class Hero lesson, so the caption does not call it a Class Hero lesson. Also confirm no other person in the room needs to consent |
| Reviews on home: Jennifer (#14), Nelson (#29), GCSE Maths student after the Higher paper (#4), Niraj (#34) | testimonials file; verbatim, cuts marked "…" | confirmed real; parents shown by the first name they used on Superprof. **CONFIRM** consent (see names) |
| FAQ (eight, in the client's order and words): cost depends on the student's current grades and needs, discussed on the free call, no charge for the call; 90 days is the time it takes for real results to show; every lesson live and 1-to-1 on our online learning platform; updates after sessions are on the platform with the parent's own login; Maths, English, Science and Economics across all exam boards, Economics her specialist subject; who teaches (Bhavisha or a tutor she trained, matched in step 2); SEN: tutors have SEND experience and use research-backed methods; no one can say for certain a student will reach the grade, and 95% of 112 have | feedback round 02 §4 (Bhavisha's answers, verbatim); BRIEF §0a-§0b for the unchanged answers | confirmed. "Will my child definitely reach their target grade?" is unchanged (COPY.md's "Can you promise a grade?" was reworded because OFFER.md bans "promise"). The qualifications question is asked but the answer still does not list tutors' qualifications: **CONFIRM** what can be said about them |
| "A short video call, with no obligation. We agree the target grade together, and if we're not the right fit, we'll tell you." | COPY.md §9, BRIEF §0b | confirmed; length not stated (item 3) |

## About (`about.html`)

| Claim | Source | Status |
|---|---|---|
| "I founded Class Hero, and I'm its lead tutor. I teach GCSE and A-Level students 1-to-1, and I train the tutors who teach with me." | BRIEF §1 (founder and lead tutor; team she has trained), §0a (1-to-1 only) | confirmed |
| Story "Why I started Class Hero.", four paragraphs, word for word the same as on home, with margin notes "At 17", "Growing up", "School", "Since then" (labels only, no new facts) | Bhavisha's own text, 2026-09-28 | confirmed by the client |
| Motto "Nothing is ever difficult, only foreign." and "She wrote that it had 'really helped' with her anxiety" | #11 (Year 8 student): "Miss goes by the philosophy 'Nothing is ever difficult, only foreign' which has really helped me anxiety" | confirmed as her words about the motto; **CONFIRM** Bhavisha is happy for it to be presented as her motto |
| Qualifications list: over six years of tutoring, in tuition centres and privately; eight months' experience in schools; studied the theory and pedagogy of teaching at the University of Warwick; 10 A and A* grades at GCSE; specialist subject Economics; 112 students, 95% | her story (round 02); BRIEF §0a | confirmed. Each item restates her story or §0a; nothing is added |
| The team is trained in a growth mindset, exam technique and the Class Hero lesson structure; teaches Maths, English, Science and Economics, across all exam boards (round 02); each student is matched to a tutor who knows their subject and board; "You'll work with me, or with a tutor I've trained personally." | BRIEF §0a; COPY.md About | confirmed |
| Photo captioned "Bhavisha presenting at an event." | `bhavisha-speaking.webp`; the testimonials file describes a live-site image as "photo of Bhavisha presenting at an event" | **CONFIRM** it is Bhavisha and the caption is right |
| Portrait captioned "Bhavisha Valgi, founder and lead tutor" | `bhavisha-portrait-wall.jpg` | **CONFIRM** it is Bhavisha |
| Video and "Class Hero lessons are 1-to-1 and live on our online learning platform, and parents get a written update after every one, on their own parent login." | BRIEF §0a; round 02 (platform, parent login) | confirmed (see the video CONFIRM above) |
| Reference: Nitin Parmar, "Mentor, and parent of a Maths student", excerpt from his signed reference letter | #1, verbatim with one cut marked "…" | real and signed; **CONFIRM** he is happy to be quoted by full name on the new site (the live site already shows the letter) |

## Results (`results.html`)

| Claim | Source | Status |
|---|---|---|
| "Every review here is real: from students, parents, family members and one referee. We've kept their words exactly as they wrote them, spelling included." | testimonials file (transcribed from the live site's screenshots) | true for the 24 reviews shown. Children's names are replaced in [brackets] and this is stated on the page |
| 95% of our 112 students | BRIEF §0a | confirmed |
| Review label "Grade 6 to Grade 8 in five weeks" | #18 | confirmed; GCSE implied (see above) |
| Review label "Grade 1 in Year 10, then passed GCSE Maths" | #26 | confirmed |
| Review label "Underachieving to above average in a year" | #14 | confirmed |
| The 24 reviews, verbatim (typos kept) | #26, #14, #18, #1, #29, #4, #34, #11, #7, #9, #24 (parent's words only), #10, #13, #35, #6, #19, #12, #28, #31 (visible text only; the original may continue past the crop), #8, #20, #30, #5, #33 | real. Not used, per the testimonials file's "Do not use" list: #2, #3, #15, #16 and #25 as quotes, #17, #21, #22 (male tutor), #23, #26's second message, #27, the results slip, and the developer draft's unverified "Brandon" and second "Simran" reviews |
| Filter counts: 11 parent reviews, 8 student reviews, 5 others (sibling and unclear reviewers, shown under All) | the list above | computed |

## Book (`book.html`)

| Claim | Source | Status |
|---|---|---|
| "A short video call with the student, a parent and a tutor. It's free, and there's no obligation." | BRIEF §0b | confirmed |
| 1 Pick a time. 2 "We'll send a confirmation with the video link." 3 Meet the student, agree a target grade, say honestly whether we're the right fit | COPY.md Book | **CONFIRM** Calendly sends a confirmation with a video link (depends on the event's location setting) |
| "Times are shown in your own time zone." | Calendly's default behaviour (it detects the visitor's time zone) | standard; no action unless the setting was changed |
| Photo captioned "Bhavisha Valgi, founder and lead tutor" | `bhavisha-final-cta.jpg` | **CONFIRM** it is Bhavisha |

## Names on the site (CONFIRM consent for each)

No child is named anywhere on the site. Students and reviewers who may be children are credited by role (BRIEF §0a). Children's names inside quotes are replaced with [brackets]: "Amelia" (#24) as [She], "Suraj" (#28) as [our son], "Bernie" (#35) as [my daughter].

| Name shown | Who | Where | Note |
|---|---|---|---|
| Bhavisha Valgi | founder | all pages | confirmed |
| Nitin Parmar | referee, parent | About, Results | full name from his signed letter |
| Jennifer | parent | Home, Results | first name as on Superprof |
| Nelson | parent | Home, Results | first name as on Superprof |
| Niraj | parent | Home, Results | first name as on Superprof; likely the same family as #27/#28, whose child is not named |
| Maria, Muhammad, David, Sheila, Kaushik | parents | Results | first names as on Superprof |

Credited by role instead of the first name on their review: Taleen (#26, "GCSE Maths student, now studying A-Levels"), Pearl (#11, "Year 8 student"), Lazio (#7, "Year 11 student"), Simran (#13, "Student"), Omra (#12, "Student"), Kevin (#8, "Student"), Zayn (#6, "Sibling of a Maths student"), and Harman (#20), Omra (#30), Nada (#5), Hinesh (#33) as "Superprof reviewer". Their names can be restored once consent is confirmed.

## Things the site deliberately does not say
- No prices anywhere, including the trial lesson (BRIEF §0a).
- No guarantee or promise of a grade (OFFER.md language rules); results are past tense and attributed.
- No star ratings, no Superprof badge (#15 is platform copy and its status is unknown).
- No phone, email, address or company number (none supplied).
- No student portal (the developer draft's "coming soon" portal is not mentioned).
- No consultation length (item 3).

## Client facts confirmed in round 02 (Bhavisha, via Eddie, 2026-09-28)
- **Subjects:** Maths, English, Science and Economics, all exam boards. This replaces "the major GCSE and A-Level subjects" everywhere (home FAQ, About team paragraph).
- **Platform:** lessons happen only on Class Hero's online learning platform; parents have their own login and see the per-lesson updates there (home meta description, step 3, FAQ, About lesson line).
- **Pricing:** depends on the student's grades; discussed on the call. Still no prices anywhere on the site.
- **90 days:** her reason is that it is the time needed for results to show (FAQ).
- **SEND:** tutors have SEND experience and use research-backed methods (FAQ).
- **Her story** (home and About), supplied 2026-09-28: started at 17 in the pandemic; Wembley; first GCSE in Year 8; 10 A/A* grades; UKMT; LAMDA; over six years tutoring; eight months in schools; University of Warwick (teaching theory and pedagogy). This resolves the earlier CONFIRMs on "six years" (now "over six years", tuition centres and privately) and "started during COVID".
- **Withdrawn:** "16 GCSEs" (and the unconfirmed "sat both GCSE specifications, A*-U and 9-1" that came with it) is gone from home, About and the About meta description; the school line is now "10 A and A* grades at GCSE".
- **Still open:** the tutors' qualifications (the FAQ question is kept, its answer is unchanged), and consent for children's names (see "Names on the site").

## Removed in feedback round 02 (2026-09-28)
- **Home struggles:** "Exam technique." and "Lessons they've switched off from." (and their claims about breaking questions down and lessons built around real exam questions).
- **Home FAQ:** "What happens in the free consultation?" and "Is the trial lesson free?" (the trial lesson is still described as one hour and paid in step 2). "How will I know it's working?" and "Who will teach my child?" were replaced by the client's questions.
- **Bhavisha's developer-draft story** on home and About: "tutoring professionally for six years, for tutoring companies and privately, across KS3, GCSE and A-Level", "started tutoring full-time during COVID… kept going through my own A-Levels, university and every job since", "lead a small team of tutors across all the major subjects", "16 GCSEs in total", "sat both GCSE specifications". The team and its training are still described on About ("The team.") and in the FAQ.
- **"A short written summary after every lesson"**, replaced by a written update on the parent's own login.

## Removed in feedback round 01 (2026-09-28)
These claims are no longer anywhere on the site, so they need no sign-off for launch:
- **Home, method section:** the re-reading/"research shows" line, the four techniques (active recall, blurting, spaced repetition, "think like an examiner"), the forgetting-curve chart, "You deserve a social life and a full night's rest.", and the AI-generated notebook photo (so the site no longer uses any generated image).
- **Results, grade movements:** B to A and C to B (#32), Grade 5 to a high Grade 7 (#16, tutor's lesson report), 30-40% to 75% (#25, tutor's lesson report). No tutor-reported figure appears on the site any more. #32's review was never in the review list; #18, #26 and #14 still appear there as reviews, with their own labels (above).
- **Paper 1's old end state** (every answer ticked on a Grade 1 paper), which contradicted the story.
