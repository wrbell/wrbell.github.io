# Roadmap — wrbell.github.io

## Content (deferred — keeping lorem ipsum for now)
- [ ] Replace all lorem ipsum (About, Experience ×8, Research ×3, Coursework ×4, Supply Chain ×4, Extracurricular ×4)
- [ ] Replace `[TAG]` placeholders on Colorado State Rams, Quantum Frontiers, DfM, Senior Design cards
- [ ] Write compelling About section in own voice — SpaceX/Tesla arc, ME+CS dual degree, what drives you
- [ ] Experience bullets: action verb + technical scope + measurable result (respect NDAs)
- [ ] Differentiate the 3 Pannier Lab entries — show progression, distinct contributions
- [ ] Add CS coursework to Education (algorithms, data structures, AI, etc.)
- [ ] Consider adding GPA / honors / dean's list to Education if strong
- [ ] Footer CTA — "Looking for a new grad role." is a statement, not a call-to-action. Consider more inviting language

## Assets (deferred — need real files)
- [ ] Headshot photo → `assets/headshot.jpg` (uncomment `<img>` tag, remove placeholder)
- [ ] Resume PDF → `assets/willem-bell-resume.pdf`
- [ ] Presentation PDFs → `assets/colorado-state-rams.pdf`, `kozy-shack.pdf`, `3m-fulfillment.pdf`, `quantum-frontiers.pdf` (or remove dead links)
- [ ] og:image (1200×630) for social sharing previews → `assets/og-image.png`
- [ ] Add `og:image` + `twitter:image` meta tags once asset exists

## Features (future)
- [ ] Screenshot / diagram / GIF slots for flagship projects (ANSYS meshes, Whisper pipeline, cobot axis)
- [ ] Cross-section tag filtering (clicking "Python" in Projects could also highlight Experience)
- [ ] Contact form (Formspree / EmailJS for static GH Pages)
- [ ] Blog / technical writing section
- [ ] Testimonials / recommendations
- [ ] RSS feed (if blog added)
- [ ] PWA manifest
- [ ] Custom domain (willembell.com)

## Design (future polish)
- [ ] Alternating section background tints for stronger visual separation
- [ ] Headshot viewfinder brackets — styled placeholder graphic instead of "Your Photo" text
- [ ] WCAG AA contrast audit for all light mode text-on-background combinations

## Accessibility (future)
- [ ] Chrono filter toolbar — should support arrow-key navigation between buttons per ARIA toolbar pattern
- [ ] Color-only badge differentiation — add subtle icon or shape alongside color
- [ ] Skip link could target more landmarks ("Skip to projects", "Skip to contact")
- [ ] `contenteditable` guard on keyboard shortcut 't' (currently only guards INPUT/TEXTAREA)

## Testing (future)
- [ ] Edition-gated content test (`?edition=fall` shows/hides cards)
- [ ] Resume modal on mobile test (<768px should navigate directly, no modal)
- [ ] Mobile nav link click → section scroll + menu close
- [ ] Visual regression tests (screenshot comparison, light/dark, desktop/mobile)
- [ ] Lighthouse CI mobile-specific config
- [ ] Tag filtering on competition cards (competition lane has styling overrides)

## Performance (future)
- [ ] `loading="lazy"` on images when project screenshots are added
- [ ] `<link rel="preconnect">` for external domains if analytics/CDN added
- [ ] Consider splitting CSS/JS into separate files when index.html grows past ~150KB
- [ ] Responsive images (`srcset` + WebP/AVIF) for project screenshots
- [ ] Bump font cache buster `?v=1` → `?v=2` when fonts are updated

## Code Quality (future)
- [ ] Standardize on `const`/`let` — mixed `var` and `const`/`let` in JS
- [ ] CSS font-size scale system — sizes are hardcoded (`0.875rem`, `0.75rem`, etc.) across dozens of rules
- [ ] Organize JS into IIFE-scoped sections as it grows
- [ ] Consider splitting into separate CSS/JS files with a simple build step

## Infra (future)
- [ ] `description` meta tag — could include more keywords (robotics, controls, FEA, Python, ML)
- [ ] Print stylesheet — `a[href^="http"]::after` URLs can get ugly for long GitHub URLs
- [ ] Repo description: "Willem Bell — Mechanical & Software Engineer | SpaceX ×4, Tesla 4680, UM-Dearborn"
- [ ] Repo topics: `portfolio`, `mechanical-engineering`, `aerospace`, `spacex`, `tesla`, `resume`
