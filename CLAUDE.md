# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **wrbell.github.io**, a GitHub Pages personal site for Willem Bell. The repository is hosted at `wrbell/wrbell.github.io` and deploys automatically via GitHub Pages from the `main` branch.

## Current State (v2026.5 redesign)

The site is built as `index.html` (single-page) plus a small set of subpages. All inline CSS/JS, no frameworks or build tools. Refined + Editorial hybrid aesthetic: Fraunces italic display serif for the giant name wordmark and section titles, JetBrains Mono for eyebrows/metadata/tags, Inter for prose. Dark theme accent `#00e5a0`, light theme accent `#006e4a`. All three font families are self-hosted from `assets/fonts/`.

Single-view layout (no view toggle) with four anchored sections plus a contact footer:
- **Hero** — giant "Willem Bell." Fraunces wordmark, vitals sidebar (Currently / Graduating / Based / Stack today), Email/Resume/GitHub/LinkedIn CTAs
- **#about** — dossier sidebar + three prose paragraphs (currently Lorem, pending real copy)
- **#work** — asymmetric 6-column work grid (`span-6` flagship + `span-4` second + `span-2/3` smaller); each card links to a project subpage in `projects/`
- **#ledger** — labeled "Experience" — ledger-style rows with `<time datetime>` ISO ranges
- **#stack** — three proficiency tiers (Daily driver / Familiar / Learning) with color-coded domain pills + filled-dot proficiency indicator
- **#contact** — site footer with email + social + footer nav (resume / cases / notebook)

Subpages:
- `resume.html` — print-optimized single-page resume (Cmd+P / "Print / Save PDF")
- `cases.html` — 2×2 supply chain case competition shell
- `notebook.html` — dated short-form post feed shell
- `projects/case-study.css` — shared "engineering log" template stylesheet
- `projects/{stark-translate,fast-fem,w26-cobot-axis,me440-vibrations,me379-fluids-lab}.html` — five flagship project detail pages (all use `case-study.css`)

Mobile (<900px): desktop nav links hide, a horizontal anchor-chip row below the hero appears for section navigation. No hamburger.

### Key files
- `index.html` — the main page (all HTML, CSS, and JS inline)
- `404.html` — custom 404 page with dark/light theme support
- `resume.html`, `cases.html`, `notebook.html` — top-level subpages (each is self-contained)
- `projects/` — case-study subpages + the shared `case-study.css`
- `robots.txt` + `sitemap.xml` — SEO basics (sitemap lists all subpages)
- `tests/smoke.spec.ts`, `tests/a11y.spec.ts`, `tests/console-errors.spec.ts`, `tests/visual.spec.ts` — **stale post-redesign**, scheduled for rewrite in a follow-up PR; CI tests will fail until then
- `ROADMAP.md` — categorized backlog with semester milestones
- `build.js` — minification build script (html-minifier-terser → dist/) — minifies index, 404, resume, cases, notebook, and all five `projects/*.html`
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
All tests must pass on all 10 browser projects. **Note:** the existing specs are stale post v2026.5 redesign — they reference the old chrono/section-toggle selectors and will fail until rewritten in a follow-up PR.

### 2. Visual breakpoint sweep
Screenshot the hero and a section header at key breakpoints (375, 768, 1024, 1280px) in both Chromium and WebKit. Verify:
- **375px**: Mobile anchor chips visible, desktop nav links hidden, wordmark legible without clipping, vitals stack to 1 or 2 cols, asymmetric work grid collapses to 1-col
- **768px**: Mobile chips still visible (breakpoint is 900), hero grid stacked
- **1024px**: Mobile chips hidden, all desktop nav links visible, asymmetric work grid at full 6-col
- **1280px**: Full spacing, nothing cramped, work grid centered with breathing room

### 3. Console errors
```bash
npx playwright test tests/console-errors.spec.ts
```

### 4. Light mode check
Verify light mode at 768px and 1280px — contrast issues and element overlap often only appear in light mode. WCAG AA requires 4.5:1 for normal text — pay particular attention to `.tag`, `.card .lane`, `.card .meta`, and `.btn.primary`.

### 5. Visual regression tests
`tests/visual.spec.ts` baselines are stale post v2026.5 redesign. Regenerate on a Linux runner (GitHub Actions or Docker) once the spec is rewritten against the new selectors: `npx playwright test tests/visual.spec.ts --update-snapshots`, then commit the new `-linux.png` baselines.

## Deployment

Deployment to GitHub Pages is gated on CI. The `deploy.yml` workflow triggers only after the CI workflow passes on `main`. If any CI check fails, the site does not deploy. GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch").
