# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **wrbell.github.io**, a GitHub Pages personal site for Willem Bell. The repository is hosted at `wrbell/wrbell.github.io` and deploys automatically via GitHub Pages from the `main` branch.

## Current State

The site is a single-page portfolio built as a single `index.html` file with inline CSS and JS — no frameworks or build tools. It uses a "Mission Control" dark theme with accent color `#00e5a0`. Fonts (JetBrains Mono + Inter) are self-hosted from `assets/fonts/`.

Two view modes toggled by a view-toggle button (persisted in localStorage):
- **Section view** — 6 content sections: Experience, Projects, Supply Chain Cases, Extracurricular, Skills, Education
- **Chrono view** (default for first-time visitors, Experience filter active) — timeline with 6 filter buttons (All, Experience, Project, Research, Supply Chain Cases, Coursework) and semester sub-labels (Fall/Winter/Summer per year)

The **Experience** section uses 3 lane labels: Industry (6 entries), Research (3 Pannier Lab entries), Campus (2 SI entries). The **Projects** section uses 3 lane labels: Personal, Research, Coursework. The **Supply Chain Cases** section (nav label "Case Work") has 4 competition cards. There is no standalone Research section — research entries live in the Experience Research lane.

### Key files
- `index.html` — the entire site (all HTML, CSS, and JS inline)
- `404.html` — custom 404 page with dark/light theme support
- `robots.txt` + `sitemap.xml` — SEO basics
- `tests/smoke.spec.ts` — 20 Playwright smoke tests
- `tests/a11y.spec.ts` — 5 accessibility tests (axe-core WCAG 2.1 AA)
- `tests/console-errors.spec.ts` — console error detection (dark + light + 404)
- `tests/visual.spec.ts` — 4 visual regression tests with baseline screenshots
- `ROADMAP.md` — categorized backlog with semester milestones
- `build.js` — minification build script (html-minifier-terser → dist/)
- `releaseplan.md` — v2026.27 public launch plan
- `ref/` — reference resumes (not deployed)

### CI checks (branch protection)
Six required status checks run on every PR:
- **HTML Validation** — validates `index.html` markup (CSS errors ignored — vnu.jar grammar is outdated)
- **Lighthouse CI** — 3 runs each for mobile + desktop; performance/a11y/best-practices/SEO + CWV assertions (LCP, CLS, TBT)
- **Link Check** — verifies all links resolve
- **Playwright** — 8 browser projects: chromium-desktop, chromium-wide, webkit-desktop, firefox-desktop, iphone-safari, iphone-landscape, ipad-safari, android-chrome
- **Security Audit** — `npm audit --audit-level=high`
- **Size Budget** — source < 150 KB, minified < 90 KB

Auto-merge is enabled. When creating PRs, always enable auto-merge with `gh pr merge --auto --squash` so they merge automatically once checks pass.

## Versioning & Releases

Version scheme: `year.ISOweek.ISOday` (e.g. `v2026.9.5`), with a `.2` patch suffix for same-day releases. GitHub Releases are tagged on `main` after each PR merges.

## Edition Gate

Content marked with `data-edition="fall"` is hidden on the live site but visible when `?edition=fall` is appended to the URL. The `hideEmptyChronoGroups()` function auto-hides semester and year labels in chrono view when all their cards are invisible after filtering.

## Pre-Push Sweep

Before pushing any branch to remote, run these checks locally. CI catches functional regressions but not visual/layout issues that affect user experience.

### 1. Playwright tests (all projects)
```bash
npx playwright test
```
All tests must pass on all 8 browser projects. Do not push if any fail.

### 2. Visual breakpoint sweep
Screenshot the nav bar and hero at key breakpoints (375, 768, 1024, 1280px) in both Chromium and WebKit. Verify:
- **375px**: Hamburger menu visible, no nav links shown, no overflow
- **768px**: All nav links visible, clear separation from brand/toggle buttons, nothing clipped
- **1024px**: Side index visible, nav links at full size
- **1280px**: Full spacing, nothing cramped

```js
// Quick sweep script (run with: node -e "..." after starting serve)
const { chromium, webkit } = require('playwright');
(async () => {
  for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
    const browser = await engine.launch();
    for (const w of [375, 768, 1024, 1280]) {
      const page = await browser.newPage({ viewport: { width: w, height: 800 } });
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: `/tmp/sweep-${name}-${w}.png` });
      await page.close();
    }
    await browser.close();
  }
})();
```

### 3. Console errors
```bash
npx playwright test tests/console-errors.spec.ts
```

### 4. Light mode check
Verify light mode at 768px and 1280px — contrast issues and element overlap often only appear in light mode.

### 5. Update visual baselines if layout changed
If any CSS layout was modified, regenerate baselines:
```bash
npx playwright test tests/visual.spec.ts --project=chromium-desktop --project=iphone-safari --update-snapshots
```
Then verify they pass without `--update-snapshots`.

## Deployment

Deployment to GitHub Pages is gated on CI. The `deploy.yml` workflow triggers only after the CI workflow passes on `main`. If any CI check fails, the site does not deploy. GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch").
