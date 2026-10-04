# AGENTS.md

## Project

`wrbell/wrbell.github.io` (public) is Willem Bell's portfolio site on GitHub
Pages: static HTML pages with inline CSS and JS, no framework. It deploys
from `main` after CI passes. Willem reviews every merge.

Page layout, sections and key files: [docs/agents/site.md](docs/agents/site.md).

### Site facts

Site facts come from `../resume-2027/data/facts.yaml` (the sibling
`resume-2027` repository, local and private). Do not invent dates, titles or
counts. When a fact is not in that file, write TBD and ask Willem.

Do not replace the hosted resume `assets/willem-bell-resume.pdf` unless
Willem names the build. When he does, update `tools/resume-approved.sha256`
in the same commit. `tools/check_resume_hash.sh` compares the two.

## Commands

```sh
npm ci                                   # install dev dependencies
npx playwright install --with-deps chromium webkit firefox
npx serve . -l 3000 --no-clipboard       # local server, Playwright baseURL
npm test                                 # Playwright, all 10 projects
npx playwright test tests/console-errors.spec.ts
npm run build                            # minify pages into dist/
scripts/ci-local.sh                      # the six CI checks, locally
bash tools/check_resume_hash.sh          # hosted resume PDF vs approved hash
node scripts/og-image.mjs                # regenerate og-image.png, og-card.png
python3 tools/agents_md_lint.py          # AI file check
python3 tools/check_docs.py              # README check
pre-commit run --files <changed files>   # hooks on the files you changed
```

## Code style

Follow the config files. Do not paste a style guide into this file.

- TypeScript (Playwright specs and config):
  `enforcement/typescript/eslint.config.mjs` and
  `enforcement/typescript/.prettierrc.json`
- Editor defaults: `.editorconfig`
- Markdown: `enforcement/markdownlint/.markdownlint-cli2.yaml`
- YAML: `enforcement/yamllint/.yamllint.yml`
- Shell: `enforcement/shellcheck/.shellcheckrc`
- Spelling: `enforcement/cspell/cspell.json`
- Commit messages: `enforcement/commitlint/commitlint.config.js`
- Secrets scan: `enforcement/gitleaks/.gitleaks.toml`

Keep each page self-contained: its HTML, CSS and JS stay in the page file.
Keep the fonts self-hosted in `assets/fonts/`.

Collection standards live in the private repository `wrbell/standards`.
When a standards file and this file disagree, this file wins.
Say that in the pull request body.

## Tests

`npm test` must pass in CI. Stale specs are listed in `README.md` under
Status and are skipped with `test.skip`.

Some tests skip by design on some browser projects (axe scans, visual
baselines, desktop navigation versus mobile chips). A skip like that is not
a stale spec.

Before you push a branch, do the pre-push sweep: `npm test`, the visual
breakpoint sweep, the console-error spec, the light-mode check and the
visual baselines. The steps and the baseline regeneration workflow are in
[docs/agents/ci-and-checks.md](docs/agents/ci-and-checks.md).

The visual baselines are Linux renders. Do not commit a `*-darwin.png`
file. Keep animated content out of the hero viewport.

Give each task a check you can run. Do not hard-code a value or a special
case to pass a test. If a test is wrong, say so.

### CI and deployment

Six required checks run on every pull request (`ci.yml`): HTML Validation,
Lighthouse CI, Link Check, Playwright, Security Audit and Size Budget.
Details: [docs/agents/ci-and-checks.md](docs/agents/ci-and-checks.md).
`standards.yml` runs the collection standards jobs.

`deploy.yml` runs only after the CI workflow passes on `main`. If a CI
check fails, the site does not deploy. The GitHub Pages source is "GitHub
Actions", not "Deploy from a branch".

## Pull requests and commits

Use a Conventional Commit subject. Keep each change near 100 lines. List
each assumption and each open tradeoff in the pull request body. A new
dependency needs a reason in the pull request. Do not edit files outside
the task.

Auto-merge is enabled. When you create a pull request, enable auto-merge
with `gh pr merge --auto --squash` so that it merges once the required
checks pass. This is the named, CI-gated merge path for this repository.
It replaces the collection default of draft pull requests.

Version scheme: `year.ISOweek.ISOday` (for example `v2026.9.5`), with a
`.2` patch suffix for a second release on the same day. GitHub Releases
are tagged on `main` after each pull request merges.

Apart from that auto-merge path, do not force-push, rewrite history,
delete a branch, merge or publish unless Willem asks.

## Security

Do not commit a secret. Do not put a secret in a prompt or a log.
Do not use a production credential.
Run unattended mode only in a sandbox.

`npm audit --audit-level=high` must pass (the Security Audit check).

The site is public. `deploy.yml` uploads the repository root, so each
tracked file outside `.git/` and `.github/` is served on the site. Do not
commit a file that must not be public.

## Clarity

Write explanations to Willem in Simplified Technical English. Use the same style
for a pull request description, a commit message body, and prose in a README or
another doc. Aim for about 80 percent of the rules. Full compliance with
ASD-STE100 is not the goal.

The rules are in the standards repository at `standards/writing-ste/ste.md`.
The upstream skill is
[simplified-technical-english](https://github.com/0xpili/simplified-technical-english/tree/1e148d670cba46685ad2b4c3f2354a637a7fdbbe)
(MIT, commit `1e148d670cba46685ad2b4c3f2354a637a7fdbbe`). Link to that skill.
Do not copy the skill into this repository again.

Code, identifiers, math, command-line output, and quoted error text are exempt.

When structure, flow, or architecture is the point, use a mermaid diagram.
For a complex result, offer a self-contained HTML page.
That page is a throwaway file.
Do not commit it unless Willem asks.

Make a video only when Willem asks for a video.
Do not add an API key or a secret.

`scripts/ste_check.py` in the upstream skill is an optional check on docs.
Do not use it as a CI gate.

<!-- standards:begin -->
## Collection standards

Every project under `/Users/willem/Code` follows the shared standards in
`/Users/willem/Code/standards/` (index: `standards/STANDARDS.md`; future
standards: `standards/ROADMAP.md`).

- **Presentations:** build every deck from
  `standards/powerpoint template/Willem-Default.potx` (theme "Helena": Neue Haas
  Grotesk Text Pro, 16:9, teal/orange/red accent palette). Spec:
  `standards/powerpoint template/STANDARD.md`. Generate with
  `standards/powerpoint template/house_style.py` (open
  `Willem-Default-Base.pptx`, never the `.potx`) and gate with
  `standards/powerpoint template/deck_checks.py` before calling a deck done.
- **Deck rules:** no speaker notes in submitted decks; editable shapes, not
  chart images; numbered, linked superscript citations with a final References
  slide; no bottom rules, citation strips, or page counters; footer text only
  when a course or client requires it (for example `ME460 HWx`), which overrides
  the default of no footer; export the deliverable PDF with native PowerPoint
  and use LibreOffice renders only for QA.
- **Everything else:** do not invent facts, dates, or numbers; mark unknowns TBD
  and point at the source. Keep copyrighted course material out of git. This
  block is managed by `standards/tools/apply_standards.py`; edit
  `standards/ai-files/BLOCK-root.md`, not this copy.
- **AI use (school work):** no AI-generated or AI-modified images in any school
  deliverable; AI-written deliverable text only with written adviser
  pre-clearance (`docs/ai-clearances/`); never cite an AI tool as a source;
  never edit graded report text (the repo's `protected-paths.txt`; example:
  `standards/enforcement/senior-design-repo/sd-protected-paths.txt`). Log AI use
  in `docs/ai-use-log.md` and disclose it per
  `standards/standards/ai-use-disclosure/ai-use-disclosure.md`.
- **AI files:** one `AGENTS.md` (≤ 200 lines, Clarity verbatim); `CLAUDE.md` is
  `@AGENTS.md`. Gates: `standards/tools/agents_md_lint.py`, `ai_file_lint.py`.
<!-- standards:end -->
