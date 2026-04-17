import { test, expect } from "@playwright/test";

test.describe("Smoke — v2026.5 surface", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
  });

  test("renders hero and all 5 sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("#about h2")).toBeVisible();
    await expect(page.locator("#work h2")).toBeVisible();
    await expect(page.locator("#ledger h2")).toBeVisible();
    await expect(page.locator("#timeline h2")).toBeVisible();
    await expect(page.locator("#skills h2")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("desktop nav links scroll to sections", async ({ page }, testInfo) => {
    await page.goto("/");
    const vw = page.viewportSize()?.width ?? 0;
    test.skip(vw < 900, "desktop nav links are hidden below 900px");
    await page.locator('.site-nav-links a[href="#ledger"]').click();
    await page.waitForTimeout(1000);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(100);
    const ledgerTop = await page.locator("#ledger").evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.abs(ledgerTop)).toBeLessThan(160);
  });

  test("theme toggle persists across reload", async ({ page }) => {
    await page.goto("/");
    await page.locator(".theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.locator(".theme-toggle").click();
    await expect(page.locator("html")).not.toHaveAttribute("data-theme", "light");
  });

  test("deploy date is populated", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("#deploy-date").textContent();
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(3);
    expect(text).not.toBe("today");
  });

  test("hero Resume CTA links to resume PDF", async ({ page }) => {
    await page.goto("/");
    const href = await page.locator(".hero-cta .btn.primary").getAttribute("href");
    expect(href).toMatch(/willem-bell-resume\.pdf$/);
  });

  test("horizontal timeline scrolls", async ({ page }) => {
    await page.goto("/");
    const track = page.locator(".timeline-track");
    await track.scrollIntoViewIfNeeded();
    const initial = await track.evaluate((el) => el.scrollLeft);
    await track.evaluate((el) => el.scrollBy({ left: 400, behavior: "instant" as ScrollBehavior }));
    await page.waitForTimeout(200);
    const after = await track.evaluate((el) => el.scrollLeft);
    expect(after).toBeGreaterThan(initial);
  });

  test("mobile anchor chips visible under 900px, hidden above", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(page.locator(".mobile-anchors")).toBeHidden();
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator(".mobile-anchors")).toBeVisible();
  });

  test("mobile anchor chip click scrolls to section", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.locator('.mobile-anchors a[href="#skills"]').click();
    await page.waitForTimeout(1000);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(100);
  });

  test("404 page renders with heading and home link", async ({ page }) => {
    await page.goto("/404.html");
    await expect(page.locator("h1")).toBeVisible();
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });
});
