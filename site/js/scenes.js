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

  /* ---------------------------------------------------------------- proof: two papers marked, then the record */
  /* Pinned only on screens tall enough to hold a paper and its words (same query as the CSS). gsap.matchMedia
     reverts every set/tween/trigger made inside when a condition stops matching, so the static layout returns intact. */
  var proof = $('#proof');
  if (proof) {
    gsap.matchMedia().add({ tall: '(min-height: 560px)', wide: '(min-width: 1024px)' }, function (ctx) {
      if (!ctx.conditions.tall) return;
      var desk = ctx.conditions.wide;
      var p1 = $('.paper--1', proof), p2 = $('.paper--2', proof), stack = $('.stack', proof);
      var b1 = $('.beat--1', proof), b2 = $('.beat--2', proof), b3 = $('.beat--3', proof);
      var byStep = function (paper) {
        return $$('.marks .pen', paper).sort(function (a, b) { return a.dataset.step - b.dataset.step; });
      };
      var m1 = byStep(p1), m2 = byStep(p2);
      var rec = $('[data-draw="record"]', proof);
      hide(m1.concat(m2, rec ? [rec] : []));

      gsap.set(p1, { rotation: -1.5, transformOrigin: '50% 60%' });
      gsap.set(p2, { yPercent: 118, rotation: 7, transformOrigin: '50% 60%' });
      gsap.set(stack, { opacity: 0.001, yPercent: 3, rotation: 2 }); // painted from the start, so nothing rasterises cold mid-scroll
      gsap.set([b2, b3], { autoAlpha: 0, y: 14 });

      var tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: $('.proof__track', proof), start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true }
      });
      // paper 1: four ticks, the old grade struck, "Pass" written and circled
      m1.slice(0, 4).forEach(function (p, i) { draw(tl, p, 0.4 + i * 0.45, 0.32); });
      draw(tl, m1[4], 2.35, 0.28, 'power2.in');
      draw(tl, m1[5], 2.75, 0.75);
      draw(tl, m1[6], 3.6, 0.55);
      // paper 2 lands on top
      tl.to(b1, { autoAlpha: 0, y: -14, filter: 'blur(4px)', duration: 0.4, ease: 'power1.in' }, 4.35)
        .to(p1, { xPercent: desk ? -6 : -3, yPercent: 1.5, rotation: -4, scale: 0.97, duration: 0.8, ease: 'power2.inOut' }, 4.35)
        .to(p2, { yPercent: 0, rotation: 1.5, duration: 0.8, ease: 'power3.out' }, 4.4)
        .fromTo(b2, { autoAlpha: 0, y: 14, filter: 'blur(4px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power1.out' }, 4.8);
      // paper 2: four ticks, 6 struck, 8 written and circled, "in 5 weeks"
      m2.slice(0, 4).forEach(function (p, i) { draw(tl, p, 5.4 + i * 0.4, 0.3); });
      draw(tl, m2[4], 7.05, 0.26, 'power2.in');
      draw(tl, m2[5], 7.4, 0.5);
      draw(tl, m2[6], 7.95, 0.45);
      if (m2[7]) draw(tl, m2[7], 8.45, 0.5);
      // both papers go onto the pile; the record takes the words
      tl.to(b2, { autoAlpha: 0, y: -14, filter: 'blur(4px)', duration: 0.4, ease: 'power1.in' }, 9.2)
        .to([p1, p2], { yPercent: '+=5', xPercent: '+=3', scale: 0.9, duration: 0.8, ease: 'power2.inOut' }, 9.2)
        .to(stack, { opacity: 1, yPercent: 5, xPercent: 3, scale: 0.9, rotation: 1, duration: 0.8, ease: 'power2.inOut' }, 9.2)
        .fromTo(b3, { autoAlpha: 0, y: 14, filter: 'blur(4px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power1.out' }, 9.6);
      if (rec) draw(tl, rec, 10.1, 0.6);
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

  /* ---------------------------------------------------------------- forgetting curve: drawn once */
  var curve = $('[data-curve]');
  if (curve) {
    var line2 = $('[data-draw="curve"]', curve);
    var cticks = $$('[data-draw="curve-tick"]', curve);
    hide([line2].concat(cticks));
    var ctl = gsap.timeline({ paused: true });
    ctl.to(line2, { strokeDashoffset: 0, duration: 2, ease: 'power1.inOut' }, 0);
    [0.52, 0.86, 1.28].forEach(function (at, i) { if (cticks[i]) ctl.to(cticks[i], { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, at); });
    ST.create({ trigger: curve, start: 'top 70%', once: true, onEnter: function () { ctl.play(); } });
  }

  /* Recalculate once fonts and images have settled so pinned lengths are right. */
  window.addEventListener('load', function () { ST.refresh(); });
})();
