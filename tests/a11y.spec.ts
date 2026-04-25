import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PAGES, AXE_PROJECTS, presetTheme, freezeAnimations } from "./helpers";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

/**
 * Axe-core scan against every shipped page in both themes. axe rules are
 * deterministic across browsers, so we limit execution to a desktop +
 * mobile project to keep CI runtime sane while still catching viewport-
 * dependent contrast / touch-target / overlap regressions.
 */
test.describe("Accessibility — WCAG 2.1 AA", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(
      !AXE_PROJECTS.includes(testInfo.project.name),
      `axe scans only run on: ${AXE_PROJECTS.join(", ")}`,
    );
  });

  for (const pageInfo of PAGES) {
    for (const theme of ["dark", "light"] as const) {
      test(`${pageInfo.label} (${theme}) — no violations`, async ({ page }) => {
        await presetTheme(page, theme);
        await page.emulateMedia({ colorScheme: theme });
        await page.goto(pageInfo.path);
        await page.locator(pageInfo.hero).waitFor({ state: "visible" });
        await freezeAnimations(page);

        const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
        expect(
          results.violations,
          results.violations
            .map((v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`)
            .join("\n"),
        ).toEqual([]);
      });
    }
  }

  test("reduced motion on index — no violations", async ({ page }) => {
    await presetTheme(page, "dark");
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("main h1").waitFor({ state: "visible" });

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });
});
