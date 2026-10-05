# CI checks and the pre-push sweep

This file holds the CI and pre-push details that were in `CLAUDE.md` before
the 2026-10-04 standards rollout. [AGENTS.md](../../AGENTS.md) links here.

## Checks on each pull request (ruleset `Protect main`)

Six checks run on every pull request (`ci.yml`). The `Protect main` ruleset
requires three of them: HTML Validation, Lighthouse CI and Link Check.
The six checks:

- **HTML Validation**: validates the HTML markup. CSS errors are ignored,
  because the vnu.jar CSS grammar is out of date.
- **Lighthouse CI**: 3 runs each for mobile and desktop. It asserts
  performance, accessibility, best practices, SEO and the Core Web Vitals
  (LCP, CLS, TBT). Only the root-level pages are audited (`index`, `404`,
  `cases`, `notebook`, `resume`); `projects/*.html` and `cases/*.html` are
  not. The desktop config sets the full Lighthouse desktop throttling
  preset (`rttMs 40`, `throughputKbps 10240`, `cpuSlowdownMultiplier 1`).
  A CPU multiplier alone leaves the network at the default slow-4G mobile
  profile, which held `index.html` at exactly 0.90 with no headroom. LHCI
  asserts on the best of the 3 runs, so a pull request can pass and `main`
  can still fail on a borderline score.
- **Link Check**: checks that every link resolves.
- **Playwright**: 10 browser projects: chromium-desktop, chromium-wide,
  webkit-desktop, firefox-desktop, iphone-safari, iphone-landscape,
  ipad-safari, ipad-landscape, chromium-half, android-chrome.
- **Security Audit**: `npm audit --audit-level=high`.
- **Size Budget**: `index.html` source under 150 KB, minified under 90 KB.
  The same job runs `tools/check_resume_hash.sh` as a non-blocking step.

`scripts/ci-local.sh` runs the same six checks locally and in parallel.
`scripts/ci-local.sh --bootstrap` downloads lychee and vnu.jar into
`.ci-tools/` (ignored by git).

## Pre-push sweep

Before you push a branch, run these checks locally. CI catches functional
regressions, but not visual or layout problems.

1. **Playwright, all projects**: `npm test`.
2. **Visual breakpoint sweep**: screenshot the hero and one section header
   at 375, 768, 1024 and 1280 px in Chromium and in WebKit. Verify:
   - 375 px: mobile anchor chips show, desktop navigation links are
     hidden, the wordmark is legible and not clipped, the vitals stack to
     1 or 2 columns, the work grid collapses to 1 column.
   - 768 px: mobile chips still show (the breakpoint is 900 px), the hero
     grid is stacked.
   - 1024 px: mobile chips are hidden, all desktop navigation links show,
     the work grid is the full 6 columns.
   - 1280 px: full spacing, nothing cramped, the work grid is centered.
3. **Console errors**: `npx playwright test tests/console-errors.spec.ts`.
4. **Light mode**: check light mode at 768 px and 1280 px. Contrast and
   overlap problems often show only in light mode. WCAG AA needs 4.5:1 for
   normal text. Check `.tag`, `.card .lane`, `.card .meta` and
   `.btn.primary` closely.
5. **Visual regression baselines**: see the next section.

## Visual regression baselines

The `tests/visual.spec.ts` baselines are Linux renders (`*-linux.png`). You
cannot regenerate them on macOS or Windows, and the spec fails locally off
Linux. Delete any `*-darwin.png` file that it writes.

A change to the `index.html` layout changes the four `index-full-*`
baselines. A new page needs two new `<label>-hero-dark-*` baselines. To
regenerate them, push the branch, then:

```bash
gh workflow run update-snapshots.yml --ref <branch>
gh run watch                      # then, with the run id:
gh run download <run-id> -n visual-snapshots -D /tmp/snaps
```

Copy only the PNG files that differ into `tests/visual.spec.ts-snapshots/`
and commit them. `update-snapshots.yml` uses the same browser install as
the Playwright job in `ci.yml`. Keep animated content out of the hero
viewport, because the hero is what gets snapshotted.
