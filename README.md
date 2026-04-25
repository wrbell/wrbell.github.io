# wrbell.github.io

Personal portfolio site for Willem Bell — [wrbell.github.io](https://wrbell.github.io/)

## Current Features

- Single-page portfolio with five subpages (resume, cases, notebook, plus five project detail pages under `projects/`)
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
- Open Graph + Twitter card meta tags (image at `assets/og-card.png` once produced)
- Accessibility: skip-to-content link, focus-visible outlines, `prefers-reduced-motion`, semantic `<time>` + `role="img"` on placeholders
- Scroll-triggered fade-in (IntersectionObserver, tightened to 200ms)
- JSON-LD `Person` schema
- Auto-deploy via GitHub Pages on push to `main`

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full categorized backlog. Highlights:

### Content (high priority)
- [ ] Replace About lorem with three real paragraphs
- [ ] Differentiate the three Pannier Lab ledger entries
- [ ] Real `willem-bell-resume.pdf` at a stable URL
- [ ] Real headshot (replaces removed viewfinder placeholder if/when re-added)
- [ ] Real screenshots / hardware photos for each project card and detail page
- [ ] `assets/og-card.png` (1200×630)
- [ ] Four case competition PDFs into `assets/cases/`
- [ ] Real notebook entries (or remove the sample entry when ready)

### Features
- [ ] Lightweight analytics (Plausible snippet)
- [ ] Contact form (Formspree/Netlify) vs mailto only

## Tech Stack

HTML · CSS · JavaScript · GitHub Pages

## Local Development

No build step required.

```bash
npx serve .              # local server at http://localhost:3000
npx playwright test      # tests stale post v2026.5 redesign — being rewritten
```
