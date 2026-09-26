/* Class Hero: page behaviour that is not animation. No scroll listeners: IntersectionObserver only. */
(function () {
  'use strict';
  var html = document.documentElement;
  var header = document.querySelector('[data-header]');

  /* Header rule appears once the page has moved off the top. */
  if (header && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
    document.body.prepend(sentinel);
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* One "Book a free consultation" per screen: the header button steps aside while another is visible. */
  var headerCta = document.querySelector('[data-header-cta]');
  var pageCtas = Array.prototype.slice.call(document.querySelectorAll('[data-cta]'));
  if (header && headerCta) {
    var setShift = function () {
      var w = headerCta.getBoundingClientRect().width;
      header.style.setProperty('--nav-shift', (w + 32) + 'px');
    };
    setShift();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setShift);
    window.addEventListener('resize', setShift);
    if (document.body.dataset.page === 'book') {
      header.classList.add('cta-hidden');
    } else if (pageCtas.length && 'IntersectionObserver' in window) {
      var visible = new Set();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
        header.classList.toggle('cta-hidden', visible.size > 0);
      }, { threshold: 0 });
      pageCtas.forEach(function (el) { io.observe(el); });
    }
  }

  /* Mobile menu: a modal sheet with a focus trap; Esc and the Close button return focus. */
  var menu = document.getElementById('menu');
  var openBtn = document.querySelector('[data-menu-open]');
  if (menu && openBtn) {
    var closeBtn = menu.querySelector('[data-menu-close]');
    var focusables = function () {
      return Array.prototype.filter.call(menu.querySelectorAll('a[href], button'), function (el) { return el.offsetParent !== null; });
    };
    var onKey = function (e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    var open = function () {
      menu.hidden = false; menu.classList.add('is-open');
      openBtn.setAttribute('aria-expanded', 'true');
      html.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
      (closeBtn || focusables()[0]).focus();
    };
    var close = function () {
      menu.hidden = true; menu.classList.remove('is-open');
      openBtn.setAttribute('aria-expanded', 'false');
      html.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      openBtn.focus();
    };
    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches && !menu.hidden) close(); });
  }

  /* Lesson video: a quiet play button over the poster; native controls once it plays. */
  document.querySelectorAll('[data-video]').forEach(function (fig) {
    var v = fig.querySelector('video');
    var frame = fig.querySelector('.lesson__frame');
    if (!v || !frame) return;
    v.removeAttribute('controls');
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'lesson__play';
    b.innerHTML = '<span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 2.5v11l9-5.5z" fill="currentColor"/></svg>Play the clip</span>';
    frame.appendChild(b);
    b.addEventListener('click', function () {
      v.setAttribute('controls', '');
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
      b.remove();
      v.focus();
    });
  });

  /* Results filter: All / Parents / Students. Without JS every review shows. */
  var filter = document.querySelector('[data-filter]');
  if (filter) {
    filter.hidden = false;
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-role]'));
    var count = document.querySelector('[data-filter-count]');
    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-show]');
      if (!btn) return;
      var show = btn.dataset.show;
      filter.querySelectorAll('button[data-show]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      var n = 0;
      items.forEach(function (it) {
        var on = show === 'all' || it.dataset.role === show;
        it.hidden = !on; if (on) n++;
      });
      if (count) count.textContent = n + (n === 1 ? ' review' : ' reviews');
    });
  }

  /* Small pen marks on inner pages draw once when they come into view (CSS does the drawing). */
  var pens = document.querySelectorAll('[data-pen]');
  if (pens.length && html.classList.contains('motion') && 'IntersectionObserver' in window) {
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-drawn'); pio.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -15% 0px' });
    pens.forEach(function (el) { pio.observe(el); });
  } else {
    pens.forEach(function (el) { el.classList.add('is-drawn'); });
  }

  /* Safety net: if the scroll-scene layer never loaded, fall back to the static layout. */
  window.addEventListener('load', function () {
    if (html.classList.contains('motion') && document.querySelector('[data-needs-gsap]') && !window.__chScenes) html.classList.remove('motion');
  });
})();
