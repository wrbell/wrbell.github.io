import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

test.describe("Accessibility — WCAG 2.1 AA", () => {
  test("dark mode (default) has no violations", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.locator("h1").waitFor({ state: "visible" });

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test("light mode has no violations", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await page.locator(".theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    // Wait for CSS transitions to fully settle
    await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; animation: none !important; }" });
    await page.waitForTimeout(100);

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });

  test("reduced motion has no violations", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator("h1").waitFor({ state: "visible" });

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    expect(results.violations).toEqual([]);
  });
});
