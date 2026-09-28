# Feedback round 01 (Eddie + client, 2026-09-28)

Overall: "Definitely looking better." Keep the concept, the colours, the hero, the header, the three steps and the paper craft. Four changes, and nothing else changes.

Note: after your build, Claude made three small CSS fixes directly (listed in CHANGES.md: solid header background, `max-width: none` on the step-marker ring SVGs, `z-index: 2` on the step markers). Keep them.

## 1. The navigation links are too small
The header links "How it works · Results · About" read as too small next to the big logo and headline. Make them clearly larger and easier to read on desktop (around 18-20px, weight 500-600, matching the header's scale), keeping the active underline. Check the header still fits on one line at 1024px and that the mobile menu is unaffected.

## 2. The exam papers must tell the story: from worse to better
Right now paper 1 says "Grade 1" but every answer on it is ticked and correct. That contradicts the story. **A Grade 1 is a fail.** Each paper has to start as a genuinely weak paper and visibly become a strong one as you scroll.

- **Paper 1 (the Year 10 student, "On a Grade 1 in Year 10. Now doing A-Levels."):**
  - **Start:** the paper looks like a failing paper. Most answers are wrong or left blank, the working is muddled or missing, and it's marked in the violet pen with crosses and low marks per question. It has a low total and the grade box shows 1.
  - **As you scroll:** it becomes a passing paper. Corrections are written in, correct working appears, crosses give way to ticks, the marks go up, the 1 is struck through, and "Pass" is written and circled.
  - **Do not show or say Grade 5** or any number for the final grade. She said she passed and is now doing A-Levels, so "Pass" is the ceiling of what we claim.
- **Paper 2 (6 → 8 in five weeks):** the same logic at a higher level.
  - **Start:** a Grade 6 paper that's a mix, some ticks and some crosses and lost marks.
  - **End:** a Grade 8 paper with nearly all ticks, higher marks, the 6 struck through, "8" circled, "in 5 weeks".
- Keep the marks, totals and grades internally consistent and plausible, like a real marked GCSE paper, and keep the maths correct on the "after" state (and plausibly wrong on the "before" state).
- The motion must read clearly as **before → after**, driven by scroll as now, with the same reduced-motion and no-JS fallback. For the static fallback, show the finished "after" state with the struck-through old grade visible, so the improvement still reads.
- The caption "The papers are illustrations. The grades and the words are the students' own." stays.

## 3. Remove the method section entirely
Delete the whole "How our students study less and remember more." section: the forgetting-curve chart, the active recall / blurting / spaced repetition / think like an examiner blocks, the notebook photo, and the "You deserve a social life…" line. The page should go straight from the section before it to "Hi, I'm Bhavisha." Remove the section's now-unused CSS, JS and images, and any nav or anchor links that pointed to it. Make sure the spacing and flow between the neighbouring sections still look intentional.

## 4. Results page: remove the grade-movements section
On results.html, delete the "Grade movements, and who reported them." section and all its animation. After the page's intro, go straight to the reviews (the existing reviews section is good as it is). Remove the section's unused CSS and JS. Keep the 95% statement in the intro.

## Then
Re-run the audit on every page and the checks in QA.md. Look at your own screenshots at 1440 and 390, especially the paper scene at several scroll positions (the start state must clearly look like a failing / weaker paper), and update DESIGN-SPEC.md, QA.md, CLAIMS.md and CHANGES.md.
