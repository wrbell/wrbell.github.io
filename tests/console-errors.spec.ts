import { test, expect } from "@playwright/test";
import { PAGES, presetTheme } from "./helpers";

/**
 * Every page must load without console errors or uncaught page errors in
 * either theme. Runs on every browser project — these are cheap to evaluate
 * but catch broken inline scripts, font 404s, mistyped relative paths, etc.
 */
test.describe("Console errors", () => {
  for (const pageInfo of PAGES) {
    for (const theme of ["dark", "light"] as const) {
      test(`${pageInfo.label} (${theme}) — no console / page errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on("console", (msg) => {
          if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
        });
        page.on("pageerror", (err) => {
          errors.push(`pageerror: ${err.message}`);
        });

        await presetTheme(page, theme);
        await page.goto(pageInfo.path);
        await page.locator(pageInfo.hero).waitFor({ state: "visible" });
        await page.waitForLoadState("networkidle");

        expect(errors, `errors on ${pageInfo.path} (${theme}):\n${errors.join("\n")}`).toEqual([]);
      });
    }
  }
});
