# Changes after the unattended build

## 2026-09-27 (Claude, Eddie review)
- Header background made solid: at 94% opacity, scrolling content showed through the header.
- Step margin rings: added `max-width: none`, because the global `svg { max-width: 100% }` squashed the 56px ring into its 40px marker, so it did not circle the number.
- Step markers: `z-index: 2`, so the violet margin rule no longer runs through the step number.

## 2026-09-28 (Claude, feedback round 01: Eddie + client)
Four changes; nothing else changed. The three 2026-09-27 CSS fixes above (solid header, `max-width: none` on the step rings, `z-index: 2` on the step markers) are kept. An earlier attempt at this round was cut off by a network error. This entry covers the finished round: that attempt's work was checked against the files on disk and completed.

1. **Nav links larger.** Header links "How it works · Results · About" go from 15px to 20px (Hanken 600), because they read as too small beside the 60px mark and the headline. 20px is the one documented size outside the type scale (`--nav-size`, DESIGN-SPEC §3.1), and the audit tokens gained 20 at 1440 to match. The violet active/hover underline is kept. The header stays on one line at 1024 (162px clear of the lockup) and the mobile menu is unchanged.
2. **Exam papers now go from worse to better.** Paper 1 showed "Grade 1" with every answer ticked, which contradicted the story: a Grade 1 is a fail. Both papers are rebuilt with a before and an after state (`_scratch/papers/build2.mjs`, injected into index.html), and `js/scenes.js` scrubs between them question by question: the wrong working fades, the correct working and answer are written in, the cross gives way to a tick, the mark goes up. Then the total and grade are struck and the new ones written and circled.
   - Paper 1 (Foundation) starts failing: three wrong answers crossed, one blank, 12/80, Grade 1. It ends passing: all corrected and ticked, 44/80, the 1 struck, "Pass" circled. No grade number is claimed.
   - Paper 2 (Higher) starts as a mixed Grade 6: two ticks, two crosses, 38/80. It ends at a Grade 8: every answer ticked, 61/80, 6 struck, 8 circled, "in 5 weeks".
   - Reduced motion, no JS and short screens show the finished after state with the old totals and grades visible under their strike-throughs. The caption is unchanged.
3. **Method section removed** ("How our students study less and remember more.": the forgetting curve, the four techniques, the generated notebook photo, "You deserve a social life…"). Its markup, CSS, JS (the curve animation), image and the dead helper rules it used are gone, and no links pointed to it. #how-it-works now runs straight into "Hi, I'm Bhavisha." with the standard section rhythm on the same squared ground.
4. **Results: grade-movements section removed** with its CSS and pen animation. The page goes from the intro (95% record kept) straight to the reviews. Its stale share description was rewritten. Because the review filter now sits higher on the page, its space is held from the first paint when JS is on, which keeps Results CLS at 0 (it measured 0.002 without this).

Docs: DESIGN-SPEC.md (§1, §3.1, §5, §7, §8, §9, §10 tokens), QA.md (new §0 re-check, plus stale lines marked "round 01"), CLAIMS.md (paper rows rewritten; removed claims listed at the end) and RUN.md updated. All six pages audit CLEAN at 1440 and 390, and the interaction suite passes 25 of 25.
