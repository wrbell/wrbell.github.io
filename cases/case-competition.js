(function () {
  'use strict';

  var SITE_ORIGIN = 'https://wrbell.github.io';

  var CASES = [
    {
      slug: 'colorado-state-rams',
      title: 'Colorado State Rams',
      kicker: 'Feb 2026 · Case competition',
      blurb: 'Fan-experience supply chain — lead presenter on in-stadium logistics.',
      tagline: 'Reimagine the fan-experience supply chain for CSU Athletics.',
      datePublished: '2026-02-01',
      role: 'Lead presenter',
      repoUrl: null,
      deckPdf: null
    },
    {
      slug: 'kozy-shack',
      title: 'Kozy Shack',
      kicker: 'Jan 2026 · 24-hour sprint',
      blurb: 'CPG cold-chain optimization — network model and margin guardrails.',
      tagline: 'Land O\'Lakes case on Kozy Shack pudding distribution.',
      datePublished: '2026-01-01',
      role: 'Strategy / modeling',
      repoUrl: null,
      deckPdf: null
    },
    {
      slug: '3m-fulfillment',
      title: '3M Fulfillment',
      kicker: 'Dec 2025 · 2-week sprint',
      blurb: 'K=8 DC MILP — 95.2% 1-day coverage at $16.5M Year 1 cost.',
      tagline: 'E-commerce fulfillment network redesign for 3M US distribution.',
      datePublished: '2025-12-01',
      role: 'Network modeling',
      repoUrl: 'https://github.com/wrbell/supply-chain-data-3m',
      deckPdf: '../assets/cases/3m/3m-fulfillment-deck.pdf'
    },
    {
      slug: 'quantum-frontiers',
      title: 'Quantum Frontiers',
      kicker: 'Nov 2025 · 2-week sprint',
      blurb: 'Rare-earth sourcing under export controls — led live panel presentation.',
      tagline: 'Semiconductor-grade rare-earth supply under geopolitical constraint.',
      datePublished: '2025-11-01',
      role: 'Lead presenter',
      repoUrl: null,
      deckPdf: null
    }
  ];

  function bySlug(slug) {
    for (var i = 0; i < CASES.length; i++) {
      if (CASES[i].slug === slug) return CASES[i];
    }
    return null;
  }

  function indexOfSlug(slug) {
    for (var i = 0; i < CASES.length; i++) {
      if (CASES[i].slug === slug) return i;
    }
    return -1;
  }

  function emitNavLinks(slug) {
    var i = indexOfSlug(slug);
    if (i < 0) return;
    var prev = CASES[(i - 1 + CASES.length) % CASES.length];
    var next = CASES[(i + 1) % CASES.length];
    var head = document.head;

    var lp = document.createElement('link');
    lp.rel = 'prev';
    lp.href = SITE_ORIGIN + '/cases/' + prev.slug + '.html';
    head.appendChild(lp);

    var ln = document.createElement('link');
    ln.rel = 'next';
    ln.href = SITE_ORIGIN + '/cases/' + next.slug + '.html';
    head.appendChild(ln);
  }

  function emitJsonLd(slug) {
    var c = bySlug(slug);
    if (!c) return;
    var data = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': c.title,
      'headline': c.tagline,
      'description': c.tagline,
      'url': SITE_ORIGIN + '/cases/' + c.slug + '.html',
      'datePublished': c.datePublished,
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

  function renderNavFooter(slug) {
    var mount = document.querySelector('[data-case-nav]');
    if (!mount) return;
    var i = indexOfSlug(slug);
    if (i < 0) return;
    var prev = CASES[(i - 1 + CASES.length) % CASES.length];
    var next = CASES[(i + 1) % CASES.length];

    function card(c, label) {
      var el = document.createElement('a');
      el.className = 'nav-card';
      el.href = './' + c.slug + '.html';
      var k = document.createElement('div');
      k.className = 'k';
      k.textContent = label + ' · ' + c.kicker;
      var h = document.createElement('h3');
      h.textContent = c.title;
      var p = document.createElement('p');
      p.textContent = c.blurb;
      el.appendChild(k);
      el.appendChild(h);
      el.appendChild(p);
      return el;
    }

    var head = document.createElement('div');
    head.className = 'nav-footer-head';
    head.textContent = 'More case competitions';

    var grid = document.createElement('div');
    grid.className = 'nav-grid';
    grid.appendChild(card(prev, 'Previous'));
    grid.appendChild(card(next, 'Next'));

    mount.appendChild(head);
    mount.appendChild(grid);
  }

  function bindProgress() {
    var bar = document.querySelector('[data-reading-progress]');
    if (!bar) return;
    function update() {
      var doc = document.documentElement;
      var scrolled = doc.scrollTop || document.body.scrollTop;
      var max = doc.scrollHeight - doc.clientHeight;
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

  function bindTheme() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var html = document.documentElement;
      var isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.removeAttribute('data-theme');
        try { localStorage.removeItem('theme'); } catch (e) {}
        btn.textContent = 'Light';
      } else {
        html.setAttribute('data-theme', 'light');
        try { localStorage.setItem('theme', 'light'); } catch (e) {}
        btn.textContent = 'Dark';
      }
    });
    if (document.documentElement.getAttribute('data-theme') === 'light') {
      btn.textContent = 'Dark';
    } else {
      btn.textContent = 'Light';
    }
  }

  function init() {
    var slug = document.body.getAttribute('data-slug');
    if (!slug) return;
    emitNavLinks(slug);
    emitJsonLd(slug);
    renderNavFooter(slug);
    bindProgress();
    bindTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
