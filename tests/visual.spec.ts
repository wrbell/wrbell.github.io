import { test, expect } from "@playwright/test";

const screenshotOpts = { maxDiffPixelRatio: 0.02 };

test.describe("Visual regression", () => {
  test("hero section — dark mode @chromium-desktop", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "visual baselines are chromium-desktop only");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Wait for typing animation to finish
    await page.waitForTimeout(3000);
    const hero = page.locator(".hero");
    await expect(hero).toHaveScreenshot("hero-dark-desktop.png", screenshotOpts);
  });

  test("chrono view with Experience filter — dark mode @chromium-desktop", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "visual baselines are chromium-desktop only");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Ensure chrono view is active with Experience filter (default)
    const viewToggle = page.locator(".view-toggle");
    const body = page.locator("body");
    if (!(await body.evaluate((el) => el.classList.contains("chrono-view")))) {
      await viewToggle.click();
    }
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("chrono-experience-dark-desktop.png", {
      ...screenshotOpts,
      fullPage: true,
    });
  });

  test("full page — dark mode @iphone-safari", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "iphone-safari", "mobile baseline is iphone-safari only");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
    await expect(page).toHaveScreenshot("full-dark-mobile.png", {
      ...screenshotOpts,
      fullPage: true,
    });
  });

  test("404 page — dark mode @chromium-desktop", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "visual baselines are chromium-desktop only");
    await page.goto("/404.html");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("404-dark-desktop.png", screenshotOpts);
  });
});
