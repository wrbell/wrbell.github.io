# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **wrbell.github.io**, a GitHub Pages personal site for Willem Bell. The repository is hosted at `wrbell/wrbell.github.io` and deploys automatically via GitHub Pages from the `main` branch.

## Current State

The site is a single-page portfolio built as a single `index.html` file with inline CSS and JS — no frameworks or build tools. It uses a "Mission Control" dark theme with accent color `#00e5a0`. Fonts (JetBrains Mono + Inter) are self-hosted from `assets/fonts/`.

Two view modes toggled by a view-toggle button (persisted in localStorage):
- **Section view** — 6 content sections: Experience, Projects, Supply Chain Cases, Extracurricular, Skills, Education
- **Chrono view** — timeline with filter buttons (Experience, Project, Research, Supply Chain Cases, Coursework)

The **Experience** section uses 3 lane labels: Industry (6 entries), Research (3 Pannier Lab entries), Campus (2 SI entries). The **Supply Chain Cases** section (nav label "Case Work") has 4 competition cards. There is no standalone Research section — research entries live in the Experience Research lane.

### Key files
- `index.html` — the entire site (all HTML, CSS, and JS inline)
- `tests/smoke.spec.ts` — Playwright smoke tests
- `assets/headshot.jpg` — headshot photo (placeholder, to be provided)
- `assets/willem-bell-resume.pdf` — resume PDF (placeholder, to be provided)
- `ref/` — reference resumes (not deployed)

### CI checks (branch protection)
Four required status checks run on every PR:
- **HTML Validation** — validates `index.html` markup
- **Lighthouse CI** — performance/accessibility audit
- **Link Check** — verifies all links resolve
- **Playwright** — smoke tests for interactive JS features (`npx playwright test`)

Auto-merge is enabled. When creating PRs, always enable auto-merge with `gh pr merge --auto --squash` so they merge automatically once checks pass.

## Deployment

Pushing to `main` triggers automatic deployment to GitHub Pages at https://wrbell.github.io/.
