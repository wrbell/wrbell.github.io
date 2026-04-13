import { test, expect } from "@playwright/test";

test.describe("Console errors", () => {
  let errors: string[];

  test.beforeEach(({ page }) => {
    errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => {
      errors.push(err.message);
    });
  });

  test("index page loads without console errors (dark mode)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("index page loads without console errors (light mode)", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.documentElement.setAttribute("data-theme", "light"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("404 page loads without console errors", async ({ page }) => {
    await page.goto("/404.html");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});
