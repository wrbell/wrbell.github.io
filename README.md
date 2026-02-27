# wrbell.github.io

Personal portfolio site for Willem Bell — [wrbell.github.io](https://wrbell.github.io/)

## Current Features

- Zero-dependency single-page portfolio (one `index.html`, inline CSS/JS, no build tools)
- "Mission Control" dark theme (`#00e5a0` accent, `#0a0a12` background)
- Self-hosted JetBrains Mono + Inter (`assets/fonts/`)
- Light/dark theme toggle with `localStorage` persistence
- Chrono/section view toggle with `localStorage` persistence (chrono is default for first visitors)
- 6 content sections: Experience, Projects, Supply Chain Cases, Extracurricular, Skills, Education
- Chrono timeline view with 6 filter buttons (All, Experience, Project, Research, Supply Chain Cases, Coursework) and semester sub-labels
- Experience section with lane labels: Industry (6 entries), Research (3 entries), Campus (2 entries)
- Projects section with lane labels: Personal, Research, Coursework
- Supply Chain Cases section with 4 competition cards (nav label: "Case Work")
- Featured project with ASCII architecture diagram (stark-translate)
- Expandable project details on flagship projects
- Coursework group card (expand/collapse in chrono view)
- Tag filtering with clear button
- Edition-gated preview (`?edition=fall`)
- Resume modal with PDF preview (lazy-loaded)
- Custom 404 page with dark/light theme
- `robots.txt` + `sitemap.xml`
- Back-to-top button (scroll trigger + "T" keyboard shortcut)
- Side-index navigation (right rail)
- `content-visibility: auto` optimization
- Responsive: mobile-first, tablet (768px+), desktop (1200px+)
- Accessibility: skip-to-content link, focus-visible outlines, `prefers-reduced-motion`, semantic HTML
- Print stylesheet with light-theme override
- Scroll-triggered fade-in animations (IntersectionObserver)
- Frosted-glass fixed nav with smooth-scroll anchors
- Card hover effects (glow, lift, accent border reveal)
- Open Graph meta tags
- 14 Playwright smoke tests
- Auto-deploy via GitHub Pages on push to `main`

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full categorized backlog. Highlights:

### Content (high priority)
- [ ] Replace all lorem ipsum (About, Experience, Research, Supply Chain, Extracurricular)
- [ ] Replace `[TAG]` placeholders with real technology tags
- [ ] Write About section in own voice
- [ ] Experience bullets: action verb + technical scope + measurable result
- [ ] Differentiate 3 Pannier Research entries
- [ ] Upload real resume PDF and headshot photo

### Features
- [ ] Skills proficiency grouping ("daily driver" vs "familiar")
- [ ] Lightweight analytics (Plausible snippet)
- [ ] `og:image` + `twitter:image` meta tags (once asset exists)
- [ ] `<time datetime>` elements for timeline dates
- [ ] Contact form (Formspree/Netlify) vs mailto only

### Completed
- [x] Chrono/timeline default view with 6 filter buttons and semester sub-labels
- [x] Custom 404 page, `robots.txt` + `sitemap.xml`
- [x] Expandable project details on flagship projects
- [x] Tag clear button
- [x] Back-to-top keyboard shortcut ("T")
- [x] Color-coded lane dots
- [x] Side-index navigation with breathing room
- [x] `content-visibility: auto` optimization
- [x] Footer CTA, print stylesheet improvements
- [x] Timeline filter buttons, year markers sticky on scroll
- [x] Hero social links as icon buttons
- [x] Supply Chain Case metadata on all cards
- [x] Resume download tracking, resume modal focus trapping
- [x] "Open to opportunities" badge, graduation date badge
- [x] Coursework group card (expand/collapse in chrono)
- [x] Light-mode tag contrast, chrono filter horizontal scroll (mobile)
- [x] Favicon, apple-touch-icon, touch targets ≥ 44px, safe area insets
- [x] Heading hierarchy fix, descriptive aria-labels
- [x] `prefers-color-scheme` for first visitors, smooth theme transitions
- [x] ASCII art mobile font-size, backdrop-filter fallback
- [x] Coursework links mobile layout, landscape mode
- [x] Font versioning for cache busting

## Tech Stack

HTML · CSS · JavaScript · GitHub Pages

## Local Development

No build step required.

```bash
npx serve .              # local server at http://localhost:3000
npx playwright test      # run 14 smoke tests
```
