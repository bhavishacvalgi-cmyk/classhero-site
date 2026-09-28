# Feedback round 02 (Eddie + Bhavisha, 2026-09-28)

Overall: Eddie loves the exam-paper animation. This round is one colour change on the papers plus copy from Bhavisha. Keep everything else from v4.1 exactly as it is: the concept, the layout, the header, the three steps, the photos and the audit-clean state. Round 01's changes and the three CSS fixes in CHANGES.md stay.

Bhavisha's copy is her own words. Use it verbatim except for British spelling, punctuation and the house rules (no em or en dashes). Do not add claims she did not make.

## 1. Exam papers: red for the failing state, blue for the outcome
The before → after story should read in colour too.

- **Before state (red):** everything that marks the weak paper is in a red marking pen: the crosses, the low per-question marks, the old totals (12/80, 38/80) and the old grades (the Grade 1 on paper 1, the Grade 6 on paper 2).
- **After state (blue):** everything that marks the improved paper is in blue: the ticks, the corrected marks, the new totals (44/80, 61/80), "Pass" and its circle, the "8" and its circle, and "in 5 weeks". The strike-throughs over the old totals and grades are drawn in blue too (the correction), and the struck text underneath stays red.
- The student's own working stays in its current ink. The scroll-scrubbed animation, its timing and the reduced-motion / no-JS fallback (after state, old grades visible in red under blue strikes) stay as they are.
- Scope: this colour rule applies **only inside the two exam papers**. The violet pen stays everywhere else (margin rule, step rings, margin notes, the circled 95%, the Results page). Add one red token to the palette for this, a clear marking-pen red that holds at least 3:1 against the paper sheet, and document the exception in DESIGN-SPEC.md §2 (blue normally means actions only; on the papers it is the "after" pen).

## 1b. Home · hero headline is too long
The hero headline "1-to-1 GCSE and A-Level tutoring." is too long. Remove "1-to-1" so it reads **"GCSE and A-Level tutoring."** Keep the rest of the hero (subtext, CTA, photo) as it is, and do not move "1-to-1" into the subtext. Check the headline's line breaks at 1440, 1024 and 390 still look intentional, and update the page title / meta descriptions only if they repeat the headline word for word.

## 2. Home · the struggles section ("Working hard, and the grades still aren't moving?")
Keep the heading and the intro paragraph. Replace the three items with these, in this order:

1. **Gaps from earlier years.**
   Most students who are stuck aren't stuck on today's topic. They're missing something from a year or two back. We find those gaps early and fill them, so new topics finally have something to build on.
2. **Confidence and exam nerves.**
   Plenty of students decide they're "just not a maths person" and stop trying. We start where they feel comfortable, build small wins each week, and practise under exam conditions so the real thing feels familiar.
3. **Motivation and accountability.**
   Keep the current text exactly: "Lots of students know they need to work but can't get started, or can't keep going. We build the habits with them and check in every week, so the effort turns into progress."

"Exam technique." and "Lessons they've switched off from." are removed.

## 3. Home + About · replace "Hi, I'm Bhavisha." with her "Why I started" story
On the home page, the "Hi, I'm Bhavisha." section's heading and text become the story below. Keep the section's photo, the lesson clip and its layout; adjust the layout only as far as the longer text needs. On the About page, her story section uses the same text, so the two pages never tell different versions. Keep the About page's other sections (motto, team, Nitin Parmar's reference) unless they now repeat or contradict the story.

Heading: **Why I started Class Hero.**

> I started Class Hero at 17, during the pandemic, with one mission: to help students in Wembley, where I grew up, keep their grades on track when school was disrupted.
>
> For me, education was a way out. My parents were factory workers who never had the chance to finish secondary school, and life at home was hard. After we lost my mum, things became even harder. My dad struggled with depression, and my sister and I drifted apart.
>
> School became my safe place. I was lucky to attend one of the best state schools in the country, where I sat my first GCSE in Year 8, went on to achieve 10 A and A* grades, took part in the UKMT Maths Challenge, and gave a LAMDA public speaking piece on homelessness.
>
> Since then, I've spent over six years tutoring in tuition centres and privately, gained eight months' experience in schools, and studied the theory and pedagogy of teaching at the University of Warwick. I've seen first-hand what works, and Class Hero exists to give every student the kind of support my family couldn't afford when I was growing up.

Claims that change with this:
- **Remove "16 GCSEs" everywhere** (home credentials, About credentials, About meta description, and anything similar). It came from the developer's draft and is not confirmed. Where a credential list needs a school line, use "10 A and A* grades at GCSE".
- Any credential lists that restate the story (six years, Economics specialist) can stay if they agree with it. "Six years" becomes "over six years" wherever it appears.

## 4. Home · FAQ ("Questions parents ask.")
Final list, in this order:

1. **How much does it cost?** It depends on the student's current grades and what they need, so we go through it on the free consultation. There's no charge for that call.
2. **Why a 90-day minimum?** Ninety days is the time it takes for real results to show. It's long enough to learn the technique, practise it on exam questions and see it in the marks.
3. **Are lessons online?** Yes. Every lesson is live and 1-to-1 on our online learning platform, so students can learn from anywhere.
4. **Do you give progress reports or updates after sessions?** Yes. Everything is on our platform, where you'll have your own login.
5. **Which subjects do you teach?** Maths, English, Science and Economics, across all exam boards. Economics is Bhavisha's specialist subject, and we match every student to a tutor who knows their subject and board.
6. **Who will actually be teaching my child, and what are their qualifications?** Keep the current answer exactly: "Bhavisha, or a tutor she has trained personally in the Class Hero method. We make the match in step 2, the trial lesson."
7. **Do you have experience with SEN students (ADHD, dyslexia, autism)?** Yes. Our tutors have experience with SEND students, and we use research-backed methods.
8. **Will my child definitely reach their target grade?** Keep as it is.

Removed: "What happens in the free consultation?" and "Is the trial lesson free?".

Knock-on copy (keep the site consistent with these answers):
- **Subjects:** replace "the major GCSE and A-Level subjects" (or similar) everywhere, including About, with Maths, English, Science and Economics, all exam boards.
- **Parent updates:** where the site says parents get "a short written summary after every lesson" (home meta description, step 3, About), keep the per-lesson update but say it lives on the platform with the parent's own login, e.g. "a written update after every lesson, on your own parent login". Keep it short.

## Client facts confirmed this round (update CLAIMS.md)
- Subjects: Maths, English, Science, Economics; all exam boards.
- Lessons happen only on Class Hero's online platform; parents have their own login and see updates there.
- Pricing depends on the student's grades; discussed on the call. Still no prices on the site.
- 90 days: her reason is that it is the time needed for results to show.
- SEND: tutors have SEND experience and use research-backed methods.
- Her story (all facts in §3) is her own, supplied 2026-09-28: started at 17 in the pandemic, Wembley, first GCSE in Year 8, 10 A/A* grades, UKMT, LAMDA, over six years tutoring, eight months in schools, University of Warwick (teaching theory and pedagogy).
- "16 GCSEs" is withdrawn.
- Still open: the tutors' qualifications (question kept, answer unchanged), and consent is still needed for children's names.

## Do not change
- The hero (apart from §1b), header, nav sizes, the three steps and 90-day plan, the reviews, the Results and Book pages (beyond the knock-on copy above), fonts, spacing scale, the CTA label.

## Then
Re-run the audit on every page and the checks in QA.md. Look at your own screenshots at 1440 and 390, especially the paper scene at several scroll positions (the red → blue change must read clearly at the start, midway and end states, and in the static fallback), the struggles section, the new story section on home and About, and the FAQ. Run a text scan for "16 GCSE", "major GCSE", em/en dashes and the removed FAQ questions. Update DESIGN-SPEC.md, QA.md, CLAIMS.md and CHANGES.md.
