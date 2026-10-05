# Site structure

This file holds the site layout notes that were in `CLAUDE.md` before the
2026-10-04 standards rollout. [AGENTS.md](../../AGENTS.md) links here.

## Pages

The site is `index.html` (one page) plus a small set of subpages. Each page
holds its own CSS and JS inline. There is no framework and no source build
step: `build.js` only minifies pages into `dist/` for the size budget.

The design is a hybrid of the "Refined" and "Editorial" styles:

- Fraunces italic display serif for the name wordmark and section titles.
- JetBrains Mono for eyebrows, metadata and tags.
- Inter for prose.
- Dark theme accent `#00e5a0`; light theme accent `#006e4a`.
- All three font families are self-hosted in `assets/fonts/`.

`index.html` has one view (no view toggle). Its anchored sections:

- **Hero**: the "Willem Bell." Fraunces wordmark, a vitals sidebar
  (Currently / Graduating / Based / Stack today), and the
  Email / Resume / GitHub / LinkedIn buttons.
- **#about**: a dossier sidebar, three prose paragraphs and a "Recently"
  feed.
- **#work**: an asymmetric 6-column work grid (`span-6` flagship, `span-4`
  second, `span-2/3` smaller). Each card links to a page in `projects/`.
- **#ledger**: labeled "Experience". Ledger-style rows with
  `<time datetime>` ISO ranges.
- **#timeline**: a horizontal scrolling career timeline, color-coded by
  lane.
- **#stack**: three proficiency tiers (Daily driver / Familiar / Learning)
  with color-coded domain pills and a filled-dot proficiency indicator.
- **#contact**: the footer with email, social links and footer navigation
  (resume / resume PDF / cases / work).

Below 900 px the desktop navigation links hide, and a horizontal row of
anchor chips below the hero gives section navigation. There is no
hamburger menu.

Subpages:

- `resume.html`: a print-optimized one-page resume (Cmd+P or the
  "Print / Save PDF" button).
- `cases.html`: the 2x2 supply chain case competition page. The four case
  detail pages are in `cases/`.
- `notebook.html`: a dated short-form post feed. It is not linked from the
  navigation or the sitemap until it has entries.
- `projects/{stark-translate,fast-fem,w26-cobot-axis,me440-vibrations,me379-fluids-lab,me4301-cfd}.html`:
  the six flagship project detail pages. They share
  `projects/case-study.css` (the "engineering log" template).

## Key files

- `index.html`: the main page (all HTML, CSS and JS inline).
- `404.html`: the custom 404 page, with dark and light themes.
- `resume.html`, `cases.html`, `notebook.html`: top-level subpages. Each one
  is self-contained.
- `projects/`: the case-study subpages and the shared `case-study.css`.
- `robots.txt` and `sitemap.xml`: SEO basics. The sitemap lists the
  subpages.
- `tests/*.spec.ts`: the Playwright specs. See the Tests section of
  [AGENTS.md](../../AGENTS.md).
- `ROADMAP.md`: the categorized backlog.
- `build.js`: the minification script (html-minifier-terser into `dist/`).
- `releaseplan.md`: the launch plan.
- `scripts/og-image.html` and `scripts/og-image.mjs`: the source and the
  renderer for `assets/og-image.png` and `assets/og-card.png`.
- `ref/`: reference resumes, not deployed. This folder was never tracked in
  this repository. The only copy is in an older local clone, which the
  standards decision D14 moves to the collection archive.

## Version history note

The `v2026.5` redesign branch name refers to the design bundle name, not to
the version scheme in [AGENTS.md](../../AGENTS.md).
