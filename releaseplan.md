# Release Plan: v2026.27 — Public Launch

**Target:** Week of June 29, 2026 (ISO week 27)
**Goal:** Ship a portfolio that makes hiring managers reach for the "schedule interview" button within 30 seconds of landing.

---

## Current State

The site has world-class infrastructure (8 browser test matrix, visual regression, Lighthouse CWV gates, compositor-thread animations) wrapped around a content shell that is ~30% complete. The structure, navigation, filtering, and interaction design are production-ready. The content is not.

**What's real:** Skills section, education, timeline structure, 3 featured project descriptions (stark-translate, fast-fem, W26-Cobot-Axis), all social links, contact info.

**What's placeholder:** About section (100% Lorem), all 12 experience descriptions, all 4 extracurricular descriptions, 2 of 4 supply chain case descriptions, all project detail dropdowns (Problem/Approach/Outcome), 6 tag placeholders, resume PDF, headshot, og:image, presentation PDFs.

---

## Phase 0: Content Foundation (May 1 – May 18)

The site cannot go public until the About and Experience sections have real words. These are the two things every visitor reads first.

### 0a. About Section — Kill the Lorem

Write 3–4 paragraphs in first person. Structure:
1. **Who you are**: ME + CS dual degree, SpaceX/Tesla/DTE arc, Pannier Lab research
2. **What drives you**: Controls, automation, robotics — bridging the gap between mechanical design and software
3. **What you're looking for**: New grad roles in controls, automation, robotics, or adjacent
4. **What makes you different**: 5 internship rotations across launch, factory, nuclear; research across 3 lab tenures; supply chain competition wins

**File:** `index.html` — replace the 3 Lorem paragraphs under `<!-- PERSONALIZE: Update these paragraphs with your own voice -->`

### 0b. Experience Descriptions — Every Role Gets Real Bullets

Each of the 12 experience entries needs 2–3 sentences following: **action verb + technical scope + measurable result** (respect NDAs).

| Entry | Priority | Notes |
|---|---|---|
| SpaceX Starfactory (Jan–Jul 2025) | P0 | Most recent, most relevant. EPLAN, Siemens PLCs, S120, KUKA. |
| SpaceX Space Lasers (May–Aug 2024) | P0 | NX, ANSYS, vibration testing. |
| Tesla 4680 Controls (Sep 2023–Apr 2024) | P0 | DeltaV, TwinCAT, VFD. |
| SpaceX Starship Launch (May–Aug 2023) | P0 | Controls hardware, commissioning. |
| SpaceX Starship Automation (May–Aug 2022) | P0 | Cryo systems, instrumentation. |
| DTE Fermi Nuclear (May 2021–Feb 2022) | P0 | Nuclear, regulatory compliance. |
| Pannier Lab (Aug 2025–Present) | P1 | Differentiate from earlier lab tenures. |
| Pannier Lab (Sep 2024–Jan 2025) | P1 | What was distinct about this stint? |
| Pannier Lab (Jul 2021–May 2023) | P1 | Foundation work — what did you build? |
| SI Assistant Supervisor (2022–2023) | P2 | Brief is fine — leadership angle. |
| SI Leader (Jun 2020–Sep 2023) | P2 | Brief — STEM education angle. |
| TBD Summer 2026 | Skip | Edition-gated, fill when confirmed. |

**Deliverable:** Real text in all 12 entries. No Lorem anywhere in the Experience section.

### 0c. Replace Tag Placeholders

6 entries still have `[TAG]` placeholder tags:
- Colorado State Rams competition (4 tags)
- Quantum Frontiers competition (4 tags)
- Design for Manufacturing project (edition-gated, can defer)

**Deliverable:** All visible tags are real technology/skill names.

---

## Phase 1: Assets (May 18 – June 1)

### 1a. Resume PDF

Create and upload `assets/willem-bell-resume.pdf`. The hero "Resume" button and modal both link here — currently a 404.

**Deliverable:** Clicking "Resume" opens the modal with a real PDF on desktop, downloads on mobile.

### 1b. Headshot

Take or obtain a professional headshot. Upload as `assets/headshot.jpg`. Reinstate the headshot CSS and HTML that was removed in Phase 5 of the infrastructure work (the CSS was deleted intentionally — it needs to be re-added alongside the image).

**Image requirements:**
- Minimum 560×680px (2x the CSS dimensions of 280×340)
- Create WebP alternative: `assets/headshot.webp`
- Add `srcset` for responsive loading
- Add `loading="lazy"` (below fold on mobile, visible on desktop)

**Deliverable:** Hero section shows portrait with viewfinder bracket styling.

### 1c. Open Graph Image

Create `assets/og-image.png` (1200×630). This is what appears when the site is shared on LinkedIn, Twitter, Slack.

Design: dark background (#0a0a12), name in Inter Bold, tagline in JetBrains Mono, accent color #00e5a0. Simple, branded, professional.

**Deliverable:** Uncomment the `og:image` and `twitter:image` meta tags. Sharing the URL on LinkedIn shows a branded preview instead of nothing.

### 1d. Presentation PDFs

Upload competition presentation decks:
- `assets/colorado-state-rams.pdf`
- `assets/kozy-shack.pdf`
- `assets/3m-fulfillment.pdf`
- `assets/quantum-frontiers.pdf`

If any decks are confidential or unavailable, remove the download link from the corresponding card rather than leaving a dead link.

**Deliverable:** Every "View Presentation" link either downloads a real PDF or doesn't exist.

---

## Phase 2: Deep Content (June 1 – June 15)

### 2a. Project Detail Dropdowns

The 3 featured projects (stark-translate, fast-fem, W26-Cobot-Axis) each have expandable "Problem / Approach / Technical Decisions / Outcome" sections — all currently Lorem. These are the "I want to know more" moments that differentiate you from every other portfolio.

For each project, write:
- **Problem**: 1–2 sentences on what needed solving and why
- **Approach**: What you built, what stack, what architecture decisions
- **Technical Decisions**: Why this approach over alternatives, tradeoffs made
- **Outcome**: What worked, what you'd do differently, metrics if available

**Deliverable:** All 3 featured project dropdowns have real content.

### 2b. Supply Chain Case Descriptions

Fill the 4 competition cards:
- Colorado State Rams — what was the problem, what did your team propose?
- Land O'Lakes / Kozy Shack — same
- 3M Fulfillment Network — same
- Quantum Frontiers — same

Each needs 2–3 sentences. These are team competitions so frame as "we" not "I." Mention the analytical technique (PuLP, forecasting, network optimization) and the result (placed Nth, recommended by judges, etc.).

**Deliverable:** All 4 supply chain case cards have real descriptions.

### 2c. Extracurricular Descriptions

Fill the 4 extracurricular entries:
- Supply Chain Association — what do you do as Data Analysis Lead / Finance Co-Lead?
- Dearborn Electric Racing (PM) — what scope? Budget? Team size?
- UMD Racing (Frame Lead) — what did you design/build?
- Dearborn Electric Racing (DAQ Lead) — what systems? What data?

Each needs 2–3 sentences. Focus on scope and impact.

**Deliverable:** No Lorem in the Extracurricular section.

---

## Phase 3: Polish and Performance (June 15 – June 22)

### 3a. Custom Domain

Register `willembell.com` (or `willembell.dev`). Configure:
- GitHub Pages custom domain in repo settings
- CNAME file in repo root
- Update `<link rel="canonical">`, `og:url`, and structured data `url` fields
- Verify DNS propagation and HTTPS provisioning

**Deliverable:** `willembell.com` serves the portfolio with HTTPS.

### 3b. Analytics

Add Plausible analytics (free tier, privacy-friendly, no cookie banner needed):
- Single `<script>` tag in `<head>`
- `<link rel="dns-prefetch" href="https://plausible.io">` for perf
- Track custom events already wired (`trackEvent` function exists in JS)

**Deliverable:** Real-time visitor dashboard at plausible.io.

### 3c. Lighthouse Score Lock

After all content is in place, run Lighthouse and lock the scores:
- Target: Performance 95+, Accessibility 100, Best Practices 100, SEO 100
- Tighten CI thresholds: performance `minScore: 0.95`, add `categories:seo` at `1.0`
- Add FCP assertion: `first-contentful-paint` warn at 1800ms

**Deliverable:** CI rejects any PR that drops below 95/100/100/100.

### 3d. `<time datetime>` Elements

Replace plain-text dates in the timeline with semantic `<time datetime="YYYY-MM">` elements. Benefits: machine-readable dates for search engines, potential rich snippet display, accessibility for screen readers.

**Deliverable:** All timeline dates use `<time>` elements.

### 3e. Skills Section Redesign

Current: bullet lists under category headers. Upgrade to:
- Tag pills (same styling as project tags) grouped under category headings
- "Daily driver" vs "Familiar" visual distinction (bold vs muted, or filled vs outline pills)
- Clicking a skill pill could highlight all Experience/Project entries that use that tag (cross-section filtering from the ROADMAP)

**Deliverable:** Skills section uses interactive pill UI with proficiency tiers.

### 3f. ARIA Toolbar Arrow-Key Navigation

The chrono filter bar has `role="toolbar"` but no arrow-key navigation between buttons. Per ARIA toolbar pattern:
- Left/Right arrow keys move focus between filter buttons
- Home/End jump to first/last button
- Tab exits the toolbar

**Deliverable:** Keyboard-only users can navigate filter buttons with arrow keys.

---

## Phase 4: Visual Storytelling (June 22 – June 28)

### 4a. Project Screenshots / Diagrams

Add visual assets for the 3 featured projects:
- **stark-translate**: Screenshot of the live transcription UI, or a diagram of the Whisper → MarianMT → WebSocket pipeline
- **fast-fem**: ANSYS mesh screenshot, stress distribution plot, or mesh convergence graph
- **W26-Cobot-Axis**: Photo of the UR30 + 7th axis setup, or RTDE architecture diagram

Image requirements: WebP format, max 800px wide, `loading="lazy"`, `srcset` for 1x/2x.

**Deliverable:** Each featured project card has a visual that shows what you actually built.

### 4b. Alternating Section Backgrounds

Add subtle background tint differentiation between sections. The current design is monochrome dark — adjacent sections blend together visually. Options:
- Alternate between `--bg` and a 2% lighter variant
- Or use a subtle gradient divider between sections

**Deliverable:** Scrolling the page, each section is visually distinct without breaking the Mission Control theme.

### 4c. Color-Only Badge Differentiation

The chrono timeline badges (Experience, Project, Research, etc.) differentiate only by color. Add a subtle icon or shape alongside color for accessibility:
- Experience: briefcase icon
- Project: code brackets
- Research: flask/beaker
- Supply Chain Cases: truck/network
- Coursework: graduation cap

Use inline SVG (same pattern as GitHub/LinkedIn icons). 16×16px, `aria-hidden="true"`.

**Deliverable:** Badge types distinguishable by shape, not just color.

---

## Phase 5: Launch Week (June 28 – July 1)

### 5a. Final Content Review

- Read every word on the site out loud. Fix anything that sounds wrong.
- Check every link (the CI link checker will catch dead ones, but check that live links go where expected).
- Test on a real iPhone (Safari) and real Chrome Desktop — not just Playwright emulation.
- Ask 2–3 people (friend, classmate, someone in industry) to review and give honest feedback. Fix what they flag.

### 5b. SEO Prep

- Enrich `<meta name="description">` with keywords: robotics, controls, FEA, Python, ML, SpaceX, Tesla
- Submit sitemap to Google Search Console
- Verify structured data with Google's Rich Results Test
- Add `<meta name="robots" content="index, follow">`

### 5c. Social Launch

- Update LinkedIn headline and "Featured" section with the portfolio URL
- Update GitHub profile README with portfolio link
- Pin the repo on GitHub profile
- Share on relevant communities if appropriate (university career center, engineering Discord, etc.)

### 5d. Tag Release

```bash
gh release create v2026.27 --title "v2026.27 — Public Launch" --notes "First public release of wrbell.github.io portfolio."
```

---

## Success Criteria

The site is ready for public launch when ALL of these are true:

| Gate | Criteria |
|---|---|
| Zero Lorem | `grep -ri "lorem" index.html` returns nothing |
| Zero placeholder tags | `grep "\[TAG\]" index.html` returns nothing (excluding edition-gated) |
| Resume downloadable | `assets/willem-bell-resume.pdf` exists and opens correctly |
| Headshot visible | Hero section renders headshot on desktop |
| OG image works | Sharing URL on LinkedIn shows branded preview |
| All links live | CI link check passes, presentation PDFs exist or links removed |
| Lighthouse locked | Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO ≥ 95 |
| Real device tested | Verified on physical iPhone Safari + Chrome Desktop |
| Custom domain | `willembell.com` serves the site with HTTPS |
| Analytics active | Plausible dashboard shows real pageviews |
| Human reviewed | At least 2 people outside yourself have reviewed and given feedback |

---

## Timeline at a Glance

```
May           June                        July
|-- Phase 0 --|-- Phase 1 --|-- Phase 2 --|-- Phase 3 --|-- Phase 4 --|-- 5 --|
   Content       Assets        Deep          Polish        Visual       LAUNCH
   Foundation                  Content       & Perf        Story       v2026.27
                                                                       ↑
                                                                    June 29
```

---

## What's Deferred (Post-Launch)

These are good ideas from the ROADMAP that don't block launch:

- Blog / technical writing section
- Contact form (Formspree / EmailJS)
- PWA manifest
- RSS feed
- Cross-section tag filtering (clicking "Python" highlights all sections)
- Testimonials / recommendations
- Fall 2026 edition content (Senior Design, Design for Manufacturing, CFD, Summer 2026 internship)
- Timeline semantic structure refactor (`div` → `ol`)
- Print stylesheet URL truncation fix
- Company logos on experience cards
