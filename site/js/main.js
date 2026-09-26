// Class Hero. The three-step section: on wide screens it pins and shows one step at a time.
// Scroll position (via IntersectionObserver on three sentinels, no scroll listeners), the tabs and
// the Next buttons all drive the same state. Below 1100px it stays a plain stacked list.
(() => {
  const section = document.querySelector('.steps');
  if (!section) return;
  const steps = [...section.querySelectorAll('.step')];
  const tabs = [...section.querySelectorAll('.step-tab')];
  const sentinels = [...section.querySelectorAll('.steps-sentinels > div')];
  const track = section.querySelector('.steps-track');
  const wide = window.matchMedia('(min-width: 1100px)');
  let current = 0, io = null;

  function show(i) {
    current = i;
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
      t.classList.toggle('is-done', k < i);
    });
  }

  function goTo(i) {
    if (!section.classList.contains('is-pinned')) {
      steps[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const start = track.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
    const span = track.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: start + span * ((i + 0.5) / 3), behavior: reduce ? 'auto' : 'smooth' });
    show(i);
  }

  function setup() {
    if (io) { io.disconnect(); io = null; }
    if (wide.matches) {
      section.classList.add('is-pinned');
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) show(sentinels.indexOf(e.target)); });
      }, { rootMargin: '-50% 0px -50% 0px' });
      sentinels.forEach((s) => io.observe(s));
      show(current);
    } else {
      section.classList.remove('is-pinned');
      steps.forEach((s) => s.classList.add('is-active'));
    }
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => goTo(i));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3;
      tabs[n].focus(); goTo(n);
    });
  });
  section.querySelectorAll('.step-next').forEach((b) => b.addEventListener('click', () => goTo(+b.dataset.go)));
  wide.addEventListener('change', setup);
  setup();
})();

// The grades scene: two exam papers get marked in the brand's violet pen as you scroll.
// CSS already shows the finished state, so no-JS, reduced motion and narrow screens get a
// complete static layout; only wide screens with motion allowed get the pinned, scrubbed version.
(() => {
  const section = document.querySelector('.grades');
  if (!section || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    section.classList.add('is-pinned');
    const q = (s) => section.querySelector(s);
    const qa = (s) => section.querySelectorAll(s);
    const p1 = q('.p1'), p2 = q('.p2');
    const count = q('.count');
    const n = { v: 0 };

    // starting poses
    gsap.set(p1, { xPercent: -50, yPercent: -50, rotateX: 28, rotateZ: -9, y: 60, scale: 0.9, transformPerspective: 1600 });
    gsap.set(p2, { xPercent: -50, yPercent: -50, rotateX: 18, rotateZ: 10, y: '110vh', x: 60, transformPerspective: 1600 });
    gsap.set(qa('.pt path'), { strokeDashoffset: 100 });
    gsap.set(qa('.strike path, .ring path'), { strokeDashoffset: 100 });
    gsap.set(qa('.g-new'), { autoAlpha: 0, scale: 0.6, rotate: -8 });
    gsap.set(qa('.beat'), { autoAlpha: 0, y: 24 });
    gsap.set(q('.b1'), { autoAlpha: 1, y: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: { trigger: q('.grades-track'), start: 'top top+=72', end: 'bottom bottom', scrub: 0.8 },
    });
    const mark = (paper, at) => {
      tl.to(paper.querySelectorAll('.pt path'), { strokeDashoffset: 0, duration: 0.05, stagger: 0.03 }, at)
        .to(paper.querySelector('.strike path'), { strokeDashoffset: 0, duration: 0.05 }, at + 0.2)
        .to(paper.querySelector('.g-new'), { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.05, ease: 'back.out(2)' }, at + 0.24)
        .to(paper.querySelector('.ring path'), { strokeDashoffset: 0, duration: 0.07, ease: 'none' }, at + 0.27);
    };
    // paper 1 settles onto the desk, then gets marked
    tl.to(p1, { rotateX: 0, rotateZ: -3, y: 0, scale: 1, duration: 0.12 }, 0);
    mark(p1, 0.08);
    // paper 2 lands on top of it
    tl.to(q('.b1'), { autoAlpha: 0, y: -24, duration: 0.05 }, 0.42)
      .to(p1, { rotateZ: -7, x: -40, y: -10, scale: 0.94, duration: 0.12 }, 0.42)
      .to(p2, { y: 16, x: 30, rotateX: 0, rotateZ: 3, duration: 0.12, ease: 'power3.out' }, 0.42)
      .to(q('.b2'), { autoAlpha: 1, y: 0, duration: 0.05 }, 0.48);
    mark(p2, 0.5);
    // both papers fan out; the record counts up
    tl.to(q('.b2'), { autoAlpha: 0, y: -24, duration: 0.05 }, 0.84)
      .to(p1, { rotateZ: -10, x: -70, y: 10, duration: 0.1 }, 0.84)
      .to(p2, { rotateZ: 6, x: 90, y: 30, duration: 0.1 }, 0.84)
      .to(q('.b3'), { autoAlpha: 1, y: 0, duration: 0.05 }, 0.86)
      .fromTo(n, { v: 0 }, { v: 95, duration: 0.1, ease: 'power1.out', onUpdate: () => { count.textContent = Math.round(n.v); } }, 0.86)
      .to({}, { duration: 0.04 }, 0.96);

    return () => { section.classList.remove('is-pinned'); count.textContent = '95'; };
  });
})();
