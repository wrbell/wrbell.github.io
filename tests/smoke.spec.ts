import { test, expect } from "@playwright/test";
import {
  PAGES,
  PROJECT_PAGES,
  INDEX_ANCHORS,
  presetTheme,
} from "./helpers";

/* ------------------------------------------------------------------ */
/* Per-page baseline                                                   */
/* ------------------------------------------------------------------ */

test.describe("Per-page baseline", () => {
  for (const pageInfo of PAGES) {
    test(`${pageInfo.label} — page renders with primary heading`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));

      await page.goto(pageInfo.path);
      await expect(page.locator(pageInfo.hero)).toBeVisible();
      await page.waitForLoadState("networkidle");

      expect(errors, `unhandled page errors:\n${errors.join("\n")}`).toEqual([]);
    });

    if (pageInfo.hasThemeToggle) {
      test(`${pageInfo.label} — theme toggle flips and persists across reload`, async ({ page }) => {
        // Force a known starting state without addInitScript (which would re-fire
        // on reload and clobber the persisted toggle below).
        await page.context().addCookies([]);
        await page.goto(pageInfo.path);
        await page.evaluate(() => localStorage.removeItem("theme"));
        await page.emulateMedia({ colorScheme: "dark" });
        await page.reload();
        await page.locator(pageInfo.hero).waitFor({ state: "visible" });
        await expect(page.locator("html")).not.toHaveAttribute("data-theme", "light");

        await page.locator(".theme-toggle").first().click();
        await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
        await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("light");

        await page.reload();
        await page.locator(pageInfo.hero).waitFor({ state: "visible" });
        await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

        await page.locator(".theme-toggle").first().click();
        await expect(page.locator("html")).not.toHaveAttribute("data-theme", "light");
      });
    } else if (pageInfo.label !== "resume") {
      test(`${pageInfo.label} — stored theme is honoured by inline bootstrap script`, async ({ page }) => {
        await presetTheme(page, "light");
        await page.goto(pageInfo.path);
        await page.locator(pageInfo.hero).waitFor({ state: "visible" });
        await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      });
    }
  }
});

/* ------------------------------------------------------------------ */
/* Index-specific structure + interactions                             */
/* ------------------------------------------------------------------ */

test.describe("Index — structure and CTAs", () => {
  test.beforeEach(async ({ page }) => {
    await presetTheme(page, "dark");
    await page.goto("/");
    await page.locator("main h1").waitFor({ state: "visible" });
  });

  test("renders hero, all four sections, and contact footer", async ({ page }) => {
    await expect(page.locator("main h1")).toBeVisible();
    for (const id of INDEX_ANCHORS) {
      await expect(page.locator(`section#${id}`)).toBeAttached();
      await expect(page.locator(`section#${id} h2`)).toBeAttached();
    }
    await expect(page.locator("footer#contact")).toBeAttached();
  });

  test("hero CTA stack: Email is mailto, Resume targets resume.html", async ({ page }) => {
    const email = page.locator(".hero-cta a.btn.primary");
    await expect(email).toHaveAttribute("href", "mailto:wrbell@umich.edu");
    const resume = page.locator(".hero-cta a", { hasText: "Resume" });
    await expect(resume).toHaveAttribute("href", "resume.html");
    await expect(resume).toHaveAttribute("target", "_blank");
  });

  test("five work cards link to project subpages", async ({ page }) => {
    // .card-cta also covers the "Code ↗" GitHub links (.muted variant) — filter
    // those out so we count only the case-study CTAs.
    const ctas = page.locator(".work-grid .card-cta:not(.muted)");
    await expect(ctas).toHaveCount(5);
    const expected = new Set(PROJECT_PAGES.map((p) => p.path.replace(/^\//, "")));
    const actual = new Set<string>();
    for (const href of await ctas.evaluateAll((els) => els.map((e) => e.getAttribute("href") ?? ""))) {
      actual.add(href);
    }
    expect(actual).toEqual(expected);
  });

  test("deploy-date placeholder gets replaced with a real date", async ({ page }) => {
    const text = (await page.locator("#deploy-date").textContent())?.trim() ?? "";
    expect(text).not.toBe("today");
    expect(text).toMatch(/\d{4}/);
  });

  test("ledger entries each render an ISO <time> range", async ({ page }) => {
    const times = page.locator(".ledger .entry time[datetime]");
    const count = await times.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const dt = await times.nth(i).getAttribute("datetime");
      expect(dt, `time at index ${i}`).toMatch(/^\d{4}-\d{2}/);
    }
  });

  test("stack section shows three proficiency tiers with skills", async ({ page }) => {
    const tiers = page.locator("#stack .skills-tier");
    await expect(tiers).toHaveCount(3);
  });

  test("footer Direct column links resolve to expected subpages", async ({ page }) => {
    const direct = page.locator(".footer-col", { hasText: "Direct" });
    // Design trimmed the Direct column to email + resume + the in-page work
    // anchor (cases / notebook are still reachable from #work cards).
    await expect(direct.locator('a[href="mailto:wrbell@umich.edu"]')).toBeVisible();
    await expect(direct.locator('a[href="resume.html"]')).toBeVisible();
    await expect(direct.locator('a[href="#work"]')).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/* Index — desktop navigation                                          */
/* ------------------------------------------------------------------ */

test.describe("Index — desktop navigation", () => {
  test.beforeEach(async ({ page }) => {
    const vw = page.viewportSize()?.width ?? 0;
    test.skip(vw < 900, "desktop nav links are hidden below 900px");
    await page.goto("/");
    await page.locator("main h1").waitFor({ state: "visible" });
  });

  test("desktop nav link click smooth-scrolls to section", async ({ page }) => {
    const beforeY = await page.evaluate(() => window.scrollY);
    await page.locator('.site-nav-links a[href="#ledger"]').click();
    await page.waitForFunction(() => {
      const el = document.getElementById("ledger");
      if (!el) return false;
      return Math.abs(el.getBoundingClientRect().top) < 200;
    }, undefined, { timeout: 5000 });
    const afterY = await page.evaluate(() => window.scrollY);
    expect(afterY).toBeGreaterThan(beforeY + 200);
  });

  test("mobile anchor chips are hidden on desktop", async ({ page }) => {
    await expect(page.locator(".mobile-anchors")).toBeHidden();
  });
});

/* ------------------------------------------------------------------ */
/* Index — mobile navigation                                           */
/* ------------------------------------------------------------------ */

test.describe("Index — mobile navigation", () => {
  test.beforeEach(async ({ page }) => {
    const vw = page.viewportSize()?.width ?? 0;
    test.skip(vw >= 900, "mobile chips only display below 900px");
    await page.goto("/");
    await page.locator("main h1").waitFor({ state: "visible" });
  });

  test("mobile anchor chip rail is visible", async ({ page }) => {
    await expect(page.locator(".mobile-anchors")).toBeVisible();
  });

  test("mobile chip click scrolls to its section", async ({ page }) => {
    const before = await page.evaluate(() => window.scrollY);
    await page.locator('.mobile-anchors a[href="#stack"]').click();
    await page.waitForFunction(() => {
      const el = document.getElementById("stack");
      if (!el) return false;
      return Math.abs(el.getBoundingClientRect().top) < 250;
    }, undefined, { timeout: 5000 });
    const after = await page.evaluate(() => window.scrollY);
    expect(after).toBeGreaterThan(before + 200);
  });

  test("desktop nav links are hidden on mobile", async ({ page }) => {
    await expect(page.locator('.site-nav-links a[href="#ledger"]')).toBeHidden();
  });
});

/* ------------------------------------------------------------------ */
/* Project subpages — case-study scaffold                              */
/* ------------------------------------------------------------------ */

test.describe("Project subpages — case-study scaffold", () => {
  for (const pageInfo of PROJECT_PAGES) {
    test(`${pageInfo.label} — back link returns to /#work`, async ({ page }) => {
      await page.goto(pageInfo.path);
      const back = page.locator("a.back");
      await expect(back).toBeVisible();
      await expect(back).toHaveAttribute("href", "../#work");
    });

    test(`${pageInfo.label} — status badge with dot is rendered in hero`, async ({ page }) => {
      await page.goto(pageInfo.path);
      const badge = page.locator(".hero .badge");
      await expect(badge).toBeVisible();
      await expect(badge.locator(".dot")).toBeAttached();
    });

    test(`${pageInfo.label} — at least four numbered case-study sections`, async ({ page }) => {
      // me379-fluids-lab is intentionally a placeholder ("just wrapped, writeup
      // landing soon") — uses <section class="content"> instead of the standard
      // numbered .sect blocks. Other case studies must still have the four-
      // section problem/architecture/decisions/outcome scaffold.
      test.skip(
        pageInfo.label === "me379-fluids-lab",
        "me379 is a placeholder pending writeup",
      );
      await page.goto(pageInfo.path);
      const sectionHeads = page.locator("section.sect .head");
      const count = await sectionHeads.count();
      expect(count).toBeGreaterThanOrEqual(4);
      const first = (await sectionHeads.first().textContent())?.toLowerCase() ?? "";
      expect(first).toContain("§01");
    });

    test(`${pageInfo.label} — clock element is present`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await expect(page.locator("#clock")).toBeAttached();
    });
  }
});

/* ------------------------------------------------------------------ */
/* Subpage-specific assertions                                         */
/* ------------------------------------------------------------------ */

test.describe("Resume", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume.html");
    await page.locator("h1.name").waitFor({ state: "visible" });
  });

  test('"Site" back link points to /', async ({ page }) => {
    const back = page.locator('a[href="/"]').first();
    await expect(back).toBeVisible();
  });

  test("renders multiple resume entries", async ({ page }) => {
    const entries = page.locator(".entry");
    const count = await entries.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });
});

test.describe("Cases", () => {
  test("renders four case-competition articles", async ({ page }) => {
    await page.goto("/cases.html");
    await page.locator(".hero h1").waitFor({ state: "visible" });
    await expect(page.locator(".grid article.case")).toHaveCount(4);
  });

  test("back link returns home", async ({ page }) => {
    await page.goto("/cases.html");
    const back = page.locator(".topbar a.back").first();
    await expect(back).toBeVisible();
    const href = await back.getAttribute("href");
    expect(href, "back href should resolve to root").toMatch(/^(\.?\/|\/)$/);
  });
});

test.describe("Notebook", () => {
  test("renders at least one entry article", async ({ page }) => {
    await page.goto("/notebook.html");
    await page.locator(".hero h1").waitFor({ state: "visible" });
    const entries = page.locator("article.entry");
    expect(await entries.count()).toBeGreaterThanOrEqual(1);
  });
});

test.describe("404", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/404.html");
    await page.locator("h1.headline").waitFor({ state: "visible" });
  });

  test("telemetry panel is populated", async ({ page }) => {
    const ts = (await page.locator("#vec-ts").textContent())?.trim() ?? "";
    expect(ts).not.toBe("—");
    expect(ts.length).toBeGreaterThan(3);
  });

  test('"Home" link points to /', async ({ page }) => {
    const home = page.locator('a[href="/"]').first();
    await expect(home).toBeVisible();
  });
});
