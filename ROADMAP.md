# Roadmap — wrbell.github.io

## Fall 2026 — Before graduation (December)

### Content (user provides, Claude assists)
- [ ] Starlink (Bastrop, May–Aug 2026) bullets — ledger, timeline, and `resume.html` have title + dates only
- [ ] Regenerate `assets/willem-bell-resume.pdf` with the Starlink role
- [ ] Regenerate `assets/og-image.png` — still says "Currently SpaceX Starfactory" / "Available · May 2027", and the URL overlaps the Currently value
- [ ] Senior Design (ME 4671) card update once past proposal stage
- [ ] Confirm stark-translate dates (card/resume say 2024–present, timeline card says 2026)
- [ ] Real diagrams for project-page placeholders (fast-fem, stark-translate, cobot axis, ME 440)
- [ ] First notebook entries (`notebook.html` is unlinked until then)

---

## Future (post-April)

### Content
- [ ] Consider adding GPA / honors / dean's list to Education if strong
- [ ] Brief "what I did" summaries for project cards missing them

### Features
- [ ] Screenshot / diagram / GIF slots for flagship projects (ANSYS meshes, Whisper pipeline, cobot axis)
- [ ] Cross-section tag filtering (clicking "Python" in Projects could also highlight Experience)
- [ ] Contact form (Formspree / EmailJS for static GH Pages)
- [ ] Blog / technical writing section
- [ ] Testimonials / recommendations
- [ ] RSS feed (if blog added)
- [ ] PWA manifest
- [ ] Custom domain (willembell.com)
- [ ] `<time datetime>` elements for timeline dates
- [ ] Skills section compact strip near top of page

### Design
- [ ] Alternating section background tints for stronger visual separation
- [ ] Headshot viewfinder brackets — styled placeholder graphic instead of "Your Photo" text
- [ ] WCAG AA contrast audit for all light mode text-on-background combinations
- [ ] Profile photo optimization — `srcset`, lazy loading, WebP
- [ ] Section ordering (Skills/Education higher?)
- [ ] Skills section redesign (tag pills vs bullets)

### Accessibility
- [ ] Chrono filter toolbar — arrow-key navigation between buttons per ARIA toolbar pattern
- [ ] Color-only badge differentiation — add subtle icon or shape alongside color
- [ ] Skip link could target more landmarks ("Skip to projects", "Skip to contact")
- [ ] `contenteditable` guard on keyboard shortcut 't' (currently only guards INPUT/TEXTAREA)
- [ ] Timeline semantic structure (`div` → `ol`) — screen readers would benefit, but high-risk refactor

### Testing
- [ ] Mobile nav link click → section scroll + menu close
- [ ] Visual regression tests (screenshot comparison, light/dark, desktop/mobile)
- [ ] Lighthouse CI mobile-specific config
- [ ] Tag filtering on competition cards (competition lane has styling overrides)

### Performance
- [ ] `loading="lazy"` on images when project screenshots are added
- [ ] `<link rel="preconnect">` for external domains if analytics/CDN added
- [ ] Consider splitting CSS/JS into separate files when index.html grows past ~150KB
- [ ] Responsive images (`srcset` + WebP/AVIF) for project screenshots
- [ ] Bump font cache buster `?v=1` → `?v=2` when fonts are updated
- [ ] Minify CSS/JS

### Code Quality
- [ ] Standardize on `const`/`let` — mixed `var` and `const`/`let` in JS
- [ ] CSS font-size scale system — sizes are hardcoded (`0.875rem`, `0.75rem`, etc.) across dozens of rules
- [ ] Organize JS into IIFE-scoped sections as it grows
- [ ] Consider splitting into separate CSS/JS files with a simple build step

### Infra
- [ ] Print stylesheet — `a[href^="http"]::after` URLs can get ugly for long GitHub URLs
- [ ] Company logos for experience cards (SpaceX, Tesla, DTE)
- [ ] Project thumbnails/screenshots

---

## Completed
- [x] About section in own voice; plain-language copy pass (Sep 2026)
- [x] Fall 2026 content live (Senior Design, CFD, current courses) — `?edition=fall` gate retired in the v2026.5 redesign
- [x] Resume PDF, headshot, og:image, supply chain case pages
- [x] Custom 404 page (`404.html`)
- [x] `robots.txt` + `sitemap.xml`
- [x] Expandable project details on flagship projects
- [x] Tag clear button
- [x] Back-to-top keyboard shortcut ("T")
- [x] Color-coded lane dots
- [x] Light-mode tag contrast
- [x] Chrono filter horizontal scroll (mobile)
- [x] Semester sub-labels in chrono view
- [x] `content-visibility: auto` optimization
- [x] Footer CTA
- [x] Print stylesheet improvements
- [x] Side-index breathing room
- [x] Timeline filter buttons (6: All, Experience, Project, Research, Supply Chain Cases, Coursework)
- [x] Year markers sticky on scroll in timeline
- [x] Hero social links as icon buttons
- [x] Supply Chain Case metadata on all cards
- [x] Resume download tracking (analytics event)
- [x] "Open to opportunities" badge — "Open to new grad roles"
- [x] "UM-Dearborn" badge — replaced with graduation date ("BSE Dec 2026")
- [x] Coursework group card (expand/collapse in chrono)
- [x] Content duplication resolved — chrono compact overview with "View details" links
- [x] Consolidate Supply Chain Cases — own section, no duplication
- [x] 8 nav items resolved (Research folded into Experience, replaced with Case Work)
- [x] Complete coursework list in Education section (6 courses with catalog links)
- [x] Favicon + apple-touch-icon (180×180)
- [x] Touch targets ≥ 44px + safe area insets
- [x] Heading hierarchy fix (chrono h4 → h3)
- [x] Descriptive aria-labels on View Code links
- [x] Resume modal focus trapping
- [x] `prefers-color-scheme` for first-time visitors
- [x] Smooth theme transition CSS
- [x] Mobile tap highlight fix
- [x] ASCII art mobile font-size + dark mode color boost
- [x] Side-index nav label fix
- [x] Coursework links mobile layout — single column on mobile
- [x] Landscape mode — compact hero and sections
- [x] Backdrop-filter fallback
- [x] Font versioning for cache busting
