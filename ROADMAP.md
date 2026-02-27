# Roadmap — wrbell.github.io

## Winter 2026 — End of Semester (April)

### Content (user provides, Claude assists)
- [ ] Replace all lorem ipsum — About section, Experience ×8, Research ×3, Supply Chain ×4, Extracurricular ×4
- [ ] Replace `[TAG]` placeholders with real technology tags
- [ ] Write About section in own voice — SpaceX/Tesla arc, ME+CS dual degree, what drives you
- [ ] Experience bullets: action verb + technical scope + measurable result (respect NDAs)
- [ ] Differentiate the 3 Pannier Lab entries — show progression, distinct contributions
- [ ] Add CS coursework to Education (algorithms, data structures, AI, etc.)

### Assets (user provides)
- [ ] Headshot photo → `assets/headshot.jpg` (uncomment `<img>` tag, remove placeholder)
- [ ] Resume PDF → `assets/willem-bell-resume.pdf`
- [ ] Presentation PDFs → `assets/colorado-state-rams.pdf`, `kozy-shack.pdf`, `3m-fulfillment.pdf`, `quantum-frontiers.pdf` (or remove dead links)
- [ ] og:image (1200×630) for social sharing → `assets/og-image.png`

### Features (Claude can build)
- [ ] Lightweight analytics (Plausible snippet — one script tag, free tier)
- [ ] `og:image` + `twitter:image` meta tags (once asset exists)
- [ ] Enrich `description` meta tag with keywords (robotics, controls, FEA, Python, ML)
- [ ] Repo description + topics via `gh` CLI
- [ ] Skills proficiency grouping ("daily driver" vs "familiar")

### Bugs (Claude can fix)
- [ ] Fix hamburger menu on iPhone/mobile — breaks layout and interaction on open

### Testing (Claude can build)
- [ ] Edition-gated content test (`?edition=fall` shows/hides cards)
- [ ] Resume modal mobile test (<768px direct navigation)

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
