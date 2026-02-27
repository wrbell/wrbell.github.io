# wrbell.github.io

Personal portfolio site for Willem Bell — [wrbell.github.io](https://wrbell.github.io/)

## Current Features

- Zero-dependency single-page portfolio (one `index.html`, inline CSS/JS, no build tools)
- "Mission Control" dark theme (`#00e5a0` accent, `#0a0a12` background)
- JetBrains Mono + Inter via Google Fonts
- 6 content sections: Experience, Projects, Research, Extracurricular, Skills, Education
- 6 professional experience entries (SpaceX ×4, Tesla 4680, DTE Energy)
- Featured project with ASCII architecture diagram (stark-translate)
- Responsive: mobile-first, tablet (768px+), desktop (1200px+)
- Accessibility: skip-to-content link, focus-visible outlines, `prefers-reduced-motion`, semantic HTML
- Print stylesheet with light-theme override
- Scroll-triggered fade-in animations (IntersectionObserver)
- Frosted-glass fixed nav with smooth-scroll anchors
- Card hover effects (glow, lift, accent border reveal)
- Open Graph meta tags
- Auto-deploy via GitHub Pages on push to `main`

## Roadmap

### Content (high priority)
- [ ] Replace ALL lorem ipsum (About, timeline entries, experience, project cards)
- [ ] Replace all `[TAG]` placeholder pills with real technology tags
- [ ] Write real About section (2 paragraphs)
- [ ] Bullet points for experience descriptions (currently paragraphs)
- [ ] Quantifiable impact / metrics in experience entries
- [ ] Brief "what I did" summaries for project cards missing them
- [ ] Differentiate 3 Pannier Research entries (identical placeholder text)
- [ ] Upload real resume PDF (`assets/willem-bell-resume.pdf`)

### Image assets (blocked on files)
- [ ] Add headshot photo (`assets/headshot.jpg`)
- [ ] `og:image` / `twitter:image` — needs 1200×630 PNG for social sharing previews
- [ ] Profile photo optimization — `srcset`, lazy loading, WebP (image is currently commented out)
- [ ] Hero photo styled fallback — initials circle when photo missing

### Architectural decisions (need user input)
- [ ] Content duplication — Timeline shows same content as Experience/Projects/Research sections. Options: make Timeline primary, or condensed overview with "see more" links
- [ ] Consolidate Supply Chain Cases — appear in both Timeline and Research
- [ ] 8 nav items — borderline too many. Could fold Research into Experience, Extracurricular into About
- [ ] Timeline entry density — some entries (individual coursework finals) may not warrant full cards. Could group: "Winter 2026 Coursework" as one expandable card
- [ ] Timeline semantic structure (`div` → `ol`) — screen readers would benefit, but high-risk refactor

### Feature requests
- [ ] Timeline filter buttons (by type: Experience/Project/Research/Competition/Coursework)
- [ ] Year markers sticky on scroll in timeline
- [ ] Skills proficiency indicators (dots, bars, or "daily driver" vs "familiar" grouping)
- [ ] Skills section compact strip near top of page
- [ ] Hero social links as icon buttons instead of text
- [ ] Supply Chain Case metadata ("1-week sprint / 4-person team") on all project cards
- [ ] Resume download tracking (analytics event)
- [ ] "Open to opportunities" badge — add target role/area
- [ ] "UM-Dearborn" badge — replace with graduation date ("Dec 2026")
- [ ] Footer CTA — make more specific than "Let's build something"

### Low-priority polish
- [ ] Dark mode tag pill colors — verify readability in both modes
- [ ] ASCII art in dark mode — verify box-drawing chars visible
- [ ] Coursework links mobile layout — 6 items stacking; could use 2-column grid
- [ ] Landscape mode — test timeline/experience usability
- [ ] Color blindness testing — especially for category color coding
- [ ] Minify CSS/JS
- [ ] GitHub Pages caching — fingerprinted filenames for long cache
- [ ] DOM depth / paint performance — 20+ timeline cards with nested elements
- [ ] Browser testing — Safari (iOS + macOS), Samsung Internet, Chrome Android
- [ ] Add GPA if strong (>3.5)
- [ ] Add honors/awards/Dean's list if applicable
- [ ] Custom domain (`willembell.com` or `wrbell.dev`)
- [ ] Lightweight analytics (Plausible, Umami, or Cloudflare)

### Completed
- [x] Complete coursework list in Education section (6 courses with catalog links)
- [x] Add favicon
- [x] Apple-touch-icon (180×180)
- [x] Touch targets ≥ 44px
- [x] Safe area insets for notched devices
- [x] Heading hierarchy fix (chrono h4 → h3)
- [x] Descriptive aria-labels on View Code links
- [x] Resume modal focus trapping
- [x] Respect `prefers-color-scheme` for first-time visitors
- [x] Smooth theme transition CSS
- [x] Mobile tap highlight fix
- [x] ASCII art mobile font-size
- [x] Side-index nav label fix

## Tech Stack

HTML · CSS · JavaScript · Google Fonts · GitHub Pages

## Local Development

No build step required — just open `index.html` in a browser.
