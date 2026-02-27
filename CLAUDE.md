# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **wrbell.github.io**, a GitHub Pages personal site for Willem Bell. The repository is hosted at `wrbell/wrbell.github.io` and deploys automatically via GitHub Pages from the `main` branch.

## Current State

The site is a single-page portfolio built as a single `index.html` file with inline CSS and JS — no frameworks or build tools. It uses a "Mission Control" dark theme with accent color `#00e5a0`. Fonts are loaded via Google Fonts CDN (JetBrains Mono + Inter).

### Key files
- `index.html` — the entire site (all HTML, CSS, and JS inline)
- `assets/headshot.jpg` — headshot photo (placeholder, to be provided)
- `assets/willem-bell-resume.pdf` — resume PDF (placeholder, to be provided)

### CI checks (branch protection)
Three required status checks run on every PR:
- **HTML Validation** — validates `index.html` markup
- **Lighthouse CI** — performance/accessibility audit
- **Link Check** — verifies all links resolve

Auto-merge is enabled. When creating PRs, always enable auto-merge with `gh pr merge --auto --squash` so they merge automatically once checks pass.

## Deployment

Pushing to `main` triggers automatic deployment to GitHub Pages at https://wrbell.github.io/.
