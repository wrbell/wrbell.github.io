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

### Blocked on assets
- [ ] Verify/add PDF assets (resume, competition presentations) or remove broken links
- [ ] Company logos for experience cards (SpaceX, Tesla, DTE)
- [ ] Project thumbnails/screenshots

### Architectural decisions (need user input)
- [x] Content duplication — Timeline condensed to compact overview with "View details" links to section cards
- [x] Timeline entry density — grouped coursework into one expandable card
- [ ] Consolidate Supply Chain Cases — appear in both Timeline and Research
- [ ] 8 nav items — borderline too many. Could fold Research into Experience, Extracurricular into About
- [ ] Timeline semantic structure (`div` → `ol`) — screen readers would benefit, but high-risk refactor
- [ ] Section ordering (Skills/Education higher?)
- [ ] Skills section redesign (tag pills vs bullets)
- [ ] Alternating section backgrounds for visual separation
- [ ] Contact form (Formspree/Netlify) vs mailto only

### Feature requests
- [x] Timeline filter buttons (by type: Experience/Project/Research/Competition/Coursework)
- [x] Year markers sticky on scroll in timeline
- [ ] Skills proficiency indicators (dots, bars, or "daily driver" vs "familiar" grouping)
- [ ] Skills section compact strip near top of page
- [x] Hero social links as icon buttons instead of text
- [x] Supply Chain Case metadata ("1-week sprint / 4-person team") on all project cards
- [x] Resume download tracking (analytics event via CustomEvent + gtag)
- [x] "Open to opportunities" badge — status bar with "Open to new grad roles"
- [x] "UM-Dearborn" badge — replaced with graduation date ("BSE Dec 2026")
- [x] Footer CTA — "Looking for a new grad role."

### Technical
- [ ] Custom 404 page (`404.html`)
- [ ] `robots.txt` + `sitemap.xml`
- [ ] `<time datetime>` elements for timeline dates
- [ ] Lightweight analytics (Plausible, Umami, or Cloudflare)

### Low-priority polish
- [x] Dark mode tag pill colors — improved contrast in light mode
- [x] ASCII art in dark mode — boosted color for box-drawing chars
- [x] Coursework links mobile layout — single column on mobile (&lt;768px)
- [x] Landscape mode — compact hero and sections for landscape phones
- [x] Color blindness — text labels provide differentiation (acceptable)
- [ ] Minify CSS/JS
- [x] GitHub Pages caching — font versioning for cache busting
- [x] DOM depth / paint performance — already fine
- [x] Browser testing — backdrop-filter fallback added

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
