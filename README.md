# wrbell.github.io

Portfolio site for Willem Bell — [wrbell.github.io](https://wrbell.github.io/)

Status (2026-10-04): live from `main`; CI passes there (run 37139478652:
1202 passed, 418 skipped by design, 0 failed). Stale specs: none.

Course: none.

Agent file: [AGENTS.md](AGENTS.md) holds the rules for AI coding agents.

## Current Features

- Single-page portfolio with subpages (resume, cases, notebook, plus six project detail pages under `projects/`)
- Refined + Editorial hybrid aesthetic — Fraunces italic display serif, JetBrains Mono eyebrows/metadata, Inter prose
- Dark theme accent `#00e5a0` / light theme accent `#006e4a`
- Self-hosted Inter + JetBrains Mono + Fraunces (`assets/fonts/`)
- Light/dark theme toggle with `localStorage` persistence + `prefers-color-scheme` first-visit fallback
- Single-view layout (no view toggle) — sections: Hero, §01 About, §02 Selected work, §03 Ledger, §04 Stack, Contact footer
- Asymmetric 6-column work grid (1 flagship + 2 halves + 4 small cards)
- Ledger-style experience rows (`<time datetime>` ISO ranges)
- Mobile (<900px): horizontal anchor-chip strip below the hero replaces the desktop nav links — no hamburger
- Project detail subpages share `projects/case-study.css` (Direction-B "engineering log" aesthetic with status pill, ASCII pipeline, problem → architecture → decisions → outcome)
- Custom 404 page in matching palette with telemetry panel
- Print-optimized `resume.html` with `@page` letter sizing
- `cases.html` shell for four supply chain case competitions (PDFs land in `assets/cases/` later)
- `notebook.html` shell for dated short-form posts
- `robots.txt` + `sitemap.xml` (including all subpages)
- Open Graph + Twitter card meta tags (image at `assets/og-image.png`)
- Accessibility: skip-to-content link, focus-visible outlines, `prefers-reduced-motion`, semantic `<time>` + `role="img"` on placeholders
- Scroll-triggered fade-in (IntersectionObserver, tightened to 200ms)
- JSON-LD `Person` schema
- Auto-deploy via GitHub Pages on push to `main`

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full categorized backlog. Highlights:

### Content (high priority)
- [ ] Differentiate the three Pannier Lab ledger entries
- [ ] Real headshot (replaces removed viewfinder placeholder if/when re-added)
- [ ] Real screenshots / hardware photos for each project card and detail page
- [x] `assets/og-image.png` (1200×630) — regenerate with `node scripts/og-image.mjs`
- [ ] Four case competition PDFs into `assets/cases/`
- [ ] Real notebook entries (page is unlinked until then)

### Features
- [ ] Lightweight analytics (Plausible snippet)
- [ ] Contact form (Formspree/Netlify) vs mailto only

## Tech Stack

HTML · CSS · JavaScript · GitHub Pages

## Local Development

No build step required.

```bash
npx serve .              # local server at http://localhost:3000
npm test                 # Playwright suite, 10 browser projects
```

## Recreate

| Command | What it does | Limit |
| --- | --- | --- |
| `npm run build` | Minifies the pages into `dist/` for the size budget | The deploy uploads the source pages, not `dist/` |
| `node scripts/og-image.mjs` | Renders `assets/og-image.png` and `assets/og-card.png` | Needs the Playwright Chromium browser |
| `npm test` | Runs the Playwright suite | Visual baselines match only on Linux |
| `bash tools/check_resume_hash.sh` | Compares the hosted resume PDF with `tools/resume-approved.sha256` | Does not build the PDF; the source build is TBD (Willem decides) |

## Deliverables

| File | SHA-256 | Submitted |
| --- | --- | --- |
| `assets/willem-bell-resume.pdf` | `5df00664f16677d0ffebafef1b898588e2a9dd72971acc5c5549d71204e1ae70` | TBD (in git since `c233dc2`, 2026-04-17) |

The site itself deploys from `main`; each deploy is a GitHub Actions run.

## License

No `LICENSE` file is in this repository.

`SPDX-License-Identifier: TBD (Willem decides)`
