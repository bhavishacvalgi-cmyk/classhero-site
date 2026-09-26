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
