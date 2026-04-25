import { test, expect } from "@playwright/test";
import { PAGES, VISUAL_PROJECTS, presetTheme, freezeAnimations } from "./helpers";

/**
 * Visual regression baselines. Limited to chromium-desktop + iphone-safari
 * because PNG snapshots are platform-specific and these are the two viewports
 * most representative of the audience. Baselines must be regenerated on a
 * Linux runner (CI or `WSL2 + xvfb`) with `npx playwright test
 * tests/visual.spec.ts --update-snapshots` and the resulting *-linux.png
 * files committed to the repo.
 */
test.describe("Visual regression", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      !VISUAL_PROJECTS.includes(testInfo.project.name),
      `visual baselines only on: ${VISUAL_PROJECTS.join(", ")}`,
    );
    await presetTheme(page, "dark");
  });

  for (const pageInfo of PAGES) {
    test(`${pageInfo.label} — hero (dark)`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await page.locator(pageInfo.hero).waitFor({ state: "visible" });
      await freezeAnimations(page);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${pageInfo.label}-hero-dark.png`, {
        fullPage: false,
        animations: "disabled",
        maxDiffPixelRatio: 0.01,
      });
    });
  }

  test("index — full page (dark)", async ({ page }) => {
    await page.goto("/");
    await page.locator("main h1").waitFor({ state: "visible" });
    await freezeAnimations(page);
    // Ensure scroll-reveal IntersectionObserver has had a chance to mark
    // every below-the-fold element as visible.
    await page.evaluate(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    });
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("index-full-dark.png", {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
  });

  test("index — full page (light)", async ({ page }) => {
    await presetTheme(page, "light");
    await page.goto("/");
    await page.locator("main h1").waitFor({ state: "visible" });
    await freezeAnimations(page);
    await page.evaluate(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    });
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("index-full-light.png", {
      fullPage: true,
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
  });

  test("404 — light", async ({ page }) => {
    await presetTheme(page, "light");
    await page.goto("/404.html");
    await page.locator("h1.headline").waitFor({ state: "visible" });
    await freezeAnimations(page);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("404-light.png", {
      fullPage: false,
      animations: "disabled",
      maxDiffPixelRatio: 0.01,
    });
  });
});
