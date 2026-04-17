# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **wrbell.github.io**, a GitHub Pages personal site for Willem Bell. The repository is hosted at `wrbell/wrbell.github.io` and deploys automatically via GitHub Pages from the `main` branch.

## Current State (v2026.5 redesign)

The site is a single-page portfolio built as a single `index.html` file with inline CSS and JS — no frameworks or build tools. Refined + Editorial hybrid aesthetic: Fraunces italic display serif for the giant name wordmark and section titles, JetBrains Mono for eyebrows/metadata/tags, Inter for prose. Dark theme accent `#00e5a0`, light theme accent `#006e4a`. All three font families are self-hosted from `assets/fonts/`.

Single-view layout (no view toggle) with 5 numbered sections:
- **Hero** — giant "Willem Bell." Fraunces wordmark, vitals sidebar (Currently / Graduating / Based / Stack today), Resume + GitHub + LinkedIn CTAs
- **§01 About** — dossier sidebar + three prose paragraphs (currently Lorem, pending real copy)
- **§02 Selected work** — asymmetric 6-column grid: 1 flagship (stark-translate with ASCII diagram) + 2 halves + 4 small cards
- **§03 Ledger** — 6 ledger-style experience rows (SpaceX Starfactory, SpaceX earlier internships, Tesla 4680, Pannier Research Lab, Supply Chain Case Competitions, Extracurricular)
- **§04 Timeline** — horizontal scroll track with 8 chronological cards (2020 SI → Dec 2026 BSE)
- **§05 Stack** — 3 columns: Mechanical/Controls (10), Software (7), ML/Research (6)

Mobile (<900px): desktop nav links hide, a horizontal anchor-chip row below the hero appears for section navigation. No hamburger.

### Key files
- `index.html` — the entire site (all HTML, CSS, and JS inline)
- `404.html` — custom 404 page with dark/light theme support
- `robots.txt` + `sitemap.xml` — SEO basics
- `tests/smoke.spec.ts` — 9 Playwright smoke tests
- `tests/a11y.spec.ts` — 3 accessibility tests (axe-core WCAG 2.1 AA)
- `tests/console-errors.spec.ts` — 2 console error detection tests (dark + 404)
- `ROADMAP.md` — categorized backlog with semester milestones
- `build.js` — minification build script (html-minifier-terser → dist/)
- `releaseplan.md` — launch plan
- `ref/` — reference resumes (not deployed)

### CI checks (branch protection)
Six required status checks run on every PR:
- **HTML Validation** — validates `index.html` markup (CSS errors ignored — vnu.jar grammar is outdated)
- **Lighthouse CI** — 3 runs each for mobile + desktop; performance/a11y/best-practices/SEO + CWV assertions (LCP, CLS, TBT)
- **Link Check** — verifies all links resolve
- **Playwright** — 10 browser projects: chromium-desktop, chromium-wide, webkit-desktop, firefox-desktop, iphone-safari, iphone-landscape, ipad-safari, ipad-landscape, chromium-half, android-chrome
- **Security Audit** — `npm audit --audit-level=high`
- **Size Budget** — source < 150 KB, minified < 90 KB

Auto-merge is enabled. When creating PRs, always enable auto-merge with `gh pr merge --auto --squash` so they merge automatically once checks pass.

## Versioning & Releases

Version scheme: `year.ISOweek.ISOday` (e.g. `v2026.9.5`), with a `.2` patch suffix for same-day releases. GitHub Releases are tagged on `main` after each PR merges. The v2026.5 redesign branch name references the design bundle name, not the scheme.

## Pre-Push Sweep

Before pushing any branch to remote, run these checks locally. CI catches functional regressions but not visual/layout issues that affect user experience.

### 1. Playwright tests (all projects)
```bash
npx playwright test
```
All tests must pass on all 10 browser projects. Do not push if any fail.

### 2. Visual breakpoint sweep
Screenshot the hero and a section header at key breakpoints (375, 768, 1024, 1280px) in both Chromium and WebKit. Verify:
- **375px**: Mobile anchor chips visible, desktop nav links hidden, wordmark legible without clipping, vitals stack to 1 or 2 cols, asymmetric work grid collapses to 1-col
- **768px**: Mobile chips still visible (breakpoint is 900), hero grid stacked
- **1024px**: Mobile chips hidden, all desktop nav links visible, asymmetric work grid at full 6-col
- **1280px**: Full spacing, nothing cramped, timeline track ~1200px wide

### 3. Console errors
```bash
npx playwright test tests/console-errors.spec.ts
```

### 4. Light mode check
Verify light mode at 768px and 1280px — contrast issues and element overlap often only appear in light mode. WCAG AA requires 4.5:1 for normal text — pay particular attention to `.tag`, `.card .lane`, `.card .meta`, and `.btn.primary`.

### 5. Visual regression tests
`tests/visual.spec.ts` was removed in the v2026.5 redesign pending regeneration of Linux-CI baselines. To re-add: author the spec, run `--update-snapshots` on a Linux runner (GitHub Actions or Docker), commit the `-linux.png` baselines, enable the spec in CI.

## Deployment

Deployment to GitHub Pages is gated on CI. The `deploy.yml` workflow triggers only after the CI workflow passes on `main`. If any CI check fails, the site does not deploy. GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch").
