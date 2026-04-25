/* ============================================================
   case-study.js — shared runtime for every projects/*.html page.

   Owns:
   - PROJECT manifest (single source of truth for slug → metadata)
   - <link rel="prev"> / <link rel="next"> based on manifest order
   - JSON-LD CreativeWork emission per page (auto-detects current slug)
   - Up-next card rendering into [data-up-next]
   - Reading-progress bar into [data-reading-progress]

   Each case-study HTML file:
   - Sets <body data-slug="..."> matching one of the slugs below.
   - Includes <div data-reading-progress></div> right after <body>.
   - Includes <div data-up-next></div> where the next-up cards should go.
   - Loads this file with <script src="case-study.js" defer></script>.
   ============================================================ */

(function () {
  'use strict';

  // ─── manifest ─────────────────────────────────────────────
  // Order matters — drives prev/next + default up-next pairing.
  var SITE_ORIGIN = 'https://wrbell.github.io';

  var PROJECTS = [
    {
      slug: 'stark-translate',
      title: 'stark-translate',
      kicker: 'F\u201925 · Personal',
      blurb: 'Live bilingual EN/ES speech-to-text. On-device Whisper + MarianMT.',
      tagline: 'Live bilingual EN/ES speech-to-text — on-device Whisper + MarianMT, no cloud.',
      datePublished: '2025-09-01',
      keywords: ['speech-to-text', 'whisper', 'marianmt', 'translation', 'python']
    },
    {
      slug: 'w26-cobot-axis',
      title: 'w26-cobot-axis',
      kicker: 'ME 472 · W\u201926',
      blurb: 'UR30 7th axis. RTDE \u2194 Klipper bridge on an RP2040.',
      tagline: 'Designing the next axis of motion for a UR30 cobot \u2014 kinematics, integration, safety case.',
      datePublished: '2026-01-01',
      keywords: ['cobot', 'ur30', 'rtde', 'klipper', 'rp2040', 'mechatronics']
    },
    {
      slug: 'fast-fem',
      title: 'fast-fem',
      kicker: 'Self-study \u00b7 2024\u201325',
      blurb: 'ANSYS \u00d7 analytic parity lab. Every sim validated.',
      tagline: 'Accelerated FEA self-study. Every ANSYS run validated against an analytic hand-calc.',
      datePublished: '2024-09-01',
      keywords: ['fea', 'ansys', 'analytical', 'mechanics-of-materials']
    },
    {
      slug: 'me440-vibrations',
      title: 'me440-vibrations',
      kicker: 'ME 440 \u00b7 W\u201926',
      blurb: 'MATLAB forced-response solver. Closed-form benchmarks.',
      tagline: 'A general-purpose forced-response solver for damped MDOF systems in MATLAB.',
      datePublished: '2026-03-01',
      keywords: ['vibrations', 'matlab', 'mdof', 'forced-response']
    },
    {
      slug: 'me379-fluids-lab',
      title: 'me379-fluids-lab',
      kicker: 'ME 379 \u00b7 Fluids Lab',
      blurb: 'Pipe flow, drag, pressure. Theory meets the test stand.',
      tagline: 'Experimental fluid mechanics \u2014 pipe flow, drag, pressure measurement, instrumented experiments.',
      datePublished: '2025-04-01',
      keywords: ['fluid-mechanics', 'experimental', 'instrumentation']
    },

  ];

  function bySlug(slug) {
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].slug === slug) return PROJECTS[i];
    }
    return null;
  }

  function indexOfSlug(slug) {
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].slug === slug) return i;
    }
    return -1;
  }

  // ─── 1 · prev / next links + canonical neighbors ──────────
  function emitNavLinks(slug) {
    var i = indexOfSlug(slug);
    if (i < 0) return;
    var head = document.head;
    var prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(i + 1) % PROJECTS.length];

    var lp = document.createElement('link');
    lp.rel = 'prev';
    lp.href = SITE_ORIGIN + '/projects/' + prev.slug + '.html';
    head.appendChild(lp);

    var ln = document.createElement('link');
    ln.rel = 'next';
    ln.href = SITE_ORIGIN + '/projects/' + next.slug + '.html';
    head.appendChild(ln);
  }

  // ─── 2 · JSON-LD CreativeWork ─────────────────────────────
  function emitJsonLd(slug) {
    var p = bySlug(slug);
    if (!p) return;
    var data = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': p.title,
      'headline': p.tagline,
      'description': p.tagline,
      'url': SITE_ORIGIN + '/projects/' + p.slug + '.html',
      'datePublished': p.datePublished,
      'keywords': p.keywords.join(', '),
      'inLanguage': 'en',
      'author': {
        '@type': 'Person',
        'name': 'Willem Bell',
        'url': SITE_ORIGIN + '/'
      },
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'wrbell.eng',
        'url': SITE_ORIGIN + '/'
      }
    };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  // ─── 3 · up-next cards ────────────────────────────────────
  function renderUpNext(slug) {
    var mount = document.querySelector('[data-up-next]');
    if (!mount) return;
    var i = indexOfSlug(slug);
    if (i < 0) return;
    // Prefer the next two in manifest order, wrapping around.
    var a = PROJECTS[(i + 1) % PROJECTS.length];
    var b = PROJECTS[(i + 2) % PROJECTS.length];

    function card(p) {
      var el = document.createElement('a');
      el.className = 'nx-card';
      el.href = './' + p.slug + '.html';
      var k = document.createElement('div');
      k.className = 'k';
      k.textContent = p.kicker;
      var h = document.createElement('h3');
      h.textContent = p.title + ' \u2192';
      var pp = document.createElement('p');
      pp.textContent = p.blurb;
      el.appendChild(k);
      el.appendChild(h);
      el.appendChild(pp);
      return el;
    }

    var head = document.createElement('div');
    head.className = 'nx-head';
    head.innerHTML = '// up <b>next</b>';

    var grid = document.createElement('div');
    grid.className = 'nx-grid';
    grid.appendChild(card(a));
    grid.appendChild(card(b));

    mount.appendChild(head);
    mount.appendChild(grid);
  }

  // ─── 4 · reading-progress bar ─────────────────────────────
  function bindProgress() {
    var bar = document.querySelector('[data-reading-progress]');
    if (!bar) return;

    function update() {
      var doc = document.documentElement;
      var scrolled = doc.scrollTop || document.body.scrollTop;
      var max = (doc.scrollHeight - doc.clientHeight);
      var pct = max > 0 ? Math.min(100, Math.max(0, (scrolled / max) * 100)) : 0;
      bar.style.transform = 'scaleX(' + (pct / 100).toFixed(4) + ')';
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  // ─── boot ────────────────────────────────────────────────
  function bindKeyboardNav(slug) {
    var i = indexOfSlug(slug);
    if (i < 0) return;
    var prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(i + 1) % PROJECTS.length];

    document.addEventListener('keydown', function (e) {
      // Don't intercept when user is typing or holding modifiers.
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

      if (e.key === 'ArrowLeft') {
        window.location.href = './' + prev.slug + '.html';
      } else if (e.key === 'ArrowRight') {
        window.location.href = './' + next.slug + '.html';
      }
    });
  }

  function boot() {
    var slug = (document.body && document.body.getAttribute('data-slug')) || '';
    if (!slug) return;
    emitNavLinks(slug);
    emitJsonLd(slug);
    renderUpNext(slug);
    bindProgress();
    bindKeyboardNav(slug);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
