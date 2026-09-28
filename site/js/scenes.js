/* Class Hero: scroll scenes. Runs only when the visitor allows motion; otherwise every final state is already in the HTML. */
(function () {
  'use strict';
  var html = document.documentElement;
  if (!html.classList.contains('motion')) return;
  if (!window.gsap || !window.ScrollTrigger) { html.classList.remove('motion'); return; }
  window.__chScenes = true;

  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  ST.config({ ignoreMobileResize: true });

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* A pen stroke is hidden by pushing its dash past the end, then drawn by bringing it back to 0. */
  var hide = function (paths) { gsap.set(paths, { strokeDasharray: '1 1.1', strokeDashoffset: 1.05 }); };
  var draw = function (tl, path, at, dur, ease) {
    tl.to(path, { strokeDashoffset: 0, duration: dur, ease: ease || 'power1.inOut' }, at);
  };

  /* ---------------------------------------------------------------- hero: the pen underlines the goal */
  var underline = $('[data-draw="hero"]');
  if (underline) {
    hide(underline);
    var go = function () { gsap.to(underline, { strokeDashoffset: 0, duration: 0.75, ease: 'power2.inOut', delay: 0.35 }); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  }

  /* ---------------------------------------------------------------- proof: two papers go from worse to better */
  /* Each paper starts as the first attempt (crosses, low marks, the old total and grade). As you scroll, question by
     question the wrong working fades, the correct working and answer are written in stroke by stroke, the cross gives
     way to a tick and the mark goes up; then the total and grade are struck through and the new ones written.
     Pinned only on screens tall enough to hold a paper and its words (same query as the CSS). gsap.matchMedia reverts
     every set, tween and trigger made inside when a condition stops matching, so the static finished papers return. */
  var proof = $('#proof');
  if (proof) {
    gsap.matchMedia().add({ tall: '(min-height: 560px)', wide: '(min-width: 1024px)' }, function (ctx) {
      if (!ctx.conditions.tall) return;
      var desk = ctx.conditions.wide;
      var p1 = $('.paper--1', proof), p2 = $('.paper--2', proof), stack = $('.stack', proof);
      var b1 = $('.beat--1', proof), b2 = $('.beat--2', proof), b3 = $('.beat--3', proof);
      var rec = $('[data-draw="record"]', proof);
      hide($$('.post path', proof).concat(rec ? [rec] : []));
      gsap.set($$('.pre', proof), { opacity: 1 });

      gsap.set(p1, { rotation: -1.5, transformOrigin: '50% 60%' });
      gsap.set(p2, { yPercent: 118, rotation: 7, transformOrigin: '50% 60%' });
      gsap.set(stack, { opacity: 0.001, yPercent: 3, rotation: 2 }); // painted from the start, so nothing rasterises cold mid-scroll
      gsap.set([b2, b3], { autoAlpha: 0, y: 14 });

      var tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: $('.proof__track', proof), start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true }
      });
      // Write strokes one after another across `dur`, like a pen: each stroke overlaps the next a little.
      var write = function (paths, at, dur, ease) {
        if (!paths.length) return at;
        var step = dur / paths.length;
        paths.forEach(function (p, i) { tl.to(p, { strokeDashoffset: 0, duration: Math.max(step * 1.5, 0.04), ease: ease || 'power1.inOut' }, at + i * step); });
        return at + dur;
      };
      var strokes = function (root, sel) { return $$(sel + ' path', root); };
      // One question: the wrong attempt fades, the working and answer are written, the cross gives way to a tick,
      // and the mark in the margin box goes up.
      var question = function (q, at) {
        var preWork = $('.pre-work', q), preCross = $('.pre-cross', q), preNum = $('.pre-num', q);
        if (preWork) tl.to(preWork, { opacity: 0, duration: 0.2, ease: 'power1.in' }, at);
        var t = write(strokes(q, '.post-work'), at + (preWork ? 0.14 : 0), 0.3);
        t = write(strokes(q, '.post-ans'), t + 0.02, 0.2);
        if (preCross) tl.to(preCross, { opacity: 0, duration: 0.14, ease: 'power1.in' }, t);
        write(strokes(q, '.post-tick'), t + 0.05, 0.14, 'power2.out');
        tl.to(preNum, { opacity: 0, duration: 0.12, ease: 'power1.in' }, t + 0.15);   // the old mark cross-fades into the new
        write(strokes(q, '.post-mark'), t + 0.15, 0.12);
        return t + 0.3;
      };
      // The total and grade: struck through, the new ones written under the box, the grade circled.
      var result = function (paper, at) {
        var t = write(strokes(paper, '.tot-strike'), at, 0.14, 'power2.in');
        t = write(strokes(paper, '.tot-new'), t + 0.04, 0.3);
        t = write(strokes(paper, '.grd-strike'), t + 0.12, 0.14, 'power2.in');
        t = write(strokes(paper, '.grd-new'), t + 0.06, 0.34);
        t = write(strokes(paper, '.grd-loop'), t + 0.02, 0.36);
        var note = strokes(paper, '.grd-note');
        if (note.length) t = write(note, t + 0.06, 0.34);
        return t;
      };

      // paper 1: the failing paper holds for a moment, then is corrected question by question
      var t = 0.7;
      $$('.q', p1).forEach(function (q) { t = question(q, t) + 0.08; });
      t = result(p1, t + 0.1) + 0.45;
      // paper 2 lands on top
      tl.to(b1, { autoAlpha: 0, y: -14, filter: 'blur(4px)', duration: 0.4, ease: 'power1.in' }, t)
        .to(p1, { xPercent: desk ? -6 : -3, yPercent: 1.5, rotation: -4, scale: 0.97, duration: 0.8, ease: 'power2.inOut' }, t)
        .to(p2, { yPercent: 0, rotation: 1.5, duration: 0.8, ease: 'power3.out' }, t + 0.05)
        .fromTo(b2, { autoAlpha: 0, y: 14, filter: 'blur(4px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power1.out' }, t + 0.45);
      // paper 2: the mixed Grade 6 paper holds, then is corrected
      t += 0.85 + 0.45;
      $$('.q', p2).forEach(function (q) { t = question(q, t) + 0.08; });
      t = result(p2, t + 0.1) + 0.45;
      // both papers go onto the pile; the record takes the words
      tl.to(b2, { autoAlpha: 0, y: -14, filter: 'blur(4px)', duration: 0.4, ease: 'power1.in' }, t)
        .to([p1, p2], { yPercent: '+=5', xPercent: '+=3', scale: 0.9, duration: 0.8, ease: 'power2.inOut' }, t)
        .to(stack, { opacity: 1, yPercent: 5, xPercent: 3, scale: 0.9, rotation: 1, duration: 0.8, ease: 'power2.inOut' }, t)
        .fromTo(b3, { autoAlpha: 0, y: 14, filter: 'blur(4px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power1.out' }, t + 0.4);
      if (rec) draw(tl, rec, t + 0.9, 0.6);
      tl.to({}, { duration: 0.8 });
    });
  }

  /* ---------------------------------------------------------------- steps: numerals circled, the margin line traced */
  var steps = $('[data-steps]');
  if (steps) {
    var loops = $$('[data-draw="step"]', steps);
    hide(loops);
    loops.forEach(function (p) {
      ST.create({
        trigger: p.closest('.step'), start: 'top 72%', once: true,
        onEnter: function () { gsap.to(p, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }); }
      });
    });
    var line = $('.steps__progress');
    if (line) {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: steps, start: 'top 60%', end: 'bottom 60%', scrub: 0.4 }
      });
    }
  }

  /* ---------------------------------------------------------------- the plan fills in, lesson by lesson */
  var plan = $('[data-plan]');
  if (plan) {
    var ticks = $$('[data-draw="plan"]', plan);
    hide(ticks);
    var ptl = gsap.timeline({ scrollTrigger: { trigger: plan, start: 'top 82%', end: 'bottom 48%', scrub: 0.5 } });
    ticks.forEach(function (t, i) { ptl.to(t, { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut' }, i * 0.55); });
  }

  /* Recalculate once fonts and images have settled so pinned lengths are right. */
  window.addEventListener('load', function () { ST.refresh(); });
})();
