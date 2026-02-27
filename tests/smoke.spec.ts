import { test, expect } from "@playwright/test";

test.describe("Tag filtering", () => {
  test("toggles active/dimmed classes on click", async ({ page }) => {
    await page.goto("/");

    // Pick the first tag inside a project card
    const tag = page.locator(".project-card .tag, .project-featured .tag").first();
    const tagText = (await tag.textContent())!.trim();

    await tag.click();

    // The clicked tag should be active
    await expect(tag).toHaveClass(/\bactive\b/);

    // Cards that contain the tag should NOT be dimmed
    const matchingCard = tag.locator("closest=.project-card, .project-featured");
    // Use a broader check: at least one card is dimmed, the parent card is not
    const allCards = page.locator(".project-card, .project-featured");
    const cardCount = await allCards.count();

    // At least one card should be dimmed (assumes multiple cards with different tags)
    const dimmedCards = page.locator(".project-card.dimmed, .project-featured.dimmed");
    const nonDimmedCards = page.locator(
      ".project-card:not(.dimmed), .project-featured:not(.dimmed)"
    );

    // The card containing our clicked tag should not be dimmed
    // Verify by checking that the tag's ancestor card lacks .dimmed
    const parentCard = page.locator(".project-card, .project-featured").filter({
      has: page.locator(`.tag.active`),
    });
    await expect(parentCard.first()).not.toHaveClass(/\bdimmed\b/);

    // At least one card should have the dimmed class (if there are cards without this tag)
    if (cardCount > 1) {
      expect(await dimmedCards.count()).toBeGreaterThan(0);
    }

    // Click the same tag again to deactivate
    await tag.click();

    // All active and dimmed classes should be removed
    await expect(page.locator(".tag.active")).toHaveCount(0);
    await expect(page.locator(".dimmed")).toHaveCount(0);
  });
});

test.describe("Resume modal lifecycle", () => {
  test("opens on click, closes on Escape, closes on backdrop click", async ({
    page,
  }) => {
    // Use desktop viewport so the modal intercept is active (>= 768px)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const modal = page.locator("#resume-modal");
    const resumeBtn = page.locator("#resume-btn");

    // Modal should start closed
    await expect(modal).not.toHaveClass(/\bopen\b/);
    await expect(modal).toHaveAttribute("aria-hidden", "true");

    // Open modal
    await resumeBtn.click();
    await expect(modal).toHaveClass(/\bopen\b/);
    await expect(modal).toHaveAttribute("aria-hidden", "false");

    // Body should have overflow hidden
    const bodyOverflow = await page.evaluate(
      () => document.body.style.overflow
    );
    expect(bodyOverflow).toBe("hidden");

    // Close with Escape
    await page.keyboard.press("Escape");
    await expect(modal).not.toHaveClass(/\bopen\b/);
    await expect(modal).toHaveAttribute("aria-hidden", "true");

    // Body overflow should be restored
    const bodyOverflowAfter = await page.evaluate(
      () => document.body.style.overflow
    );
    expect(bodyOverflowAfter).toBe("");

    // Re-open, then close via backdrop click
    await resumeBtn.click();
    await expect(modal).toHaveClass(/\bopen\b/);

    // Backdrop sits behind the modal content; dispatch click directly.
    await page.locator(".resume-modal-backdrop").dispatchEvent("click");
    await expect(modal).not.toHaveClass(/\bopen\b/);
    await expect(modal).toHaveAttribute("aria-hidden", "true");
  });
});

test.describe("localStorage persistence", () => {
  test("theme and chrono view survive page reload", async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto("/");

    // Default should be dark (no data-theme attribute)
    const htmlEl = page.locator("html");
    await expect(htmlEl).not.toHaveAttribute("data-theme", "light");

    // Switch to light mode
    await page.locator(".theme-toggle").click();
    await expect(htmlEl).toHaveAttribute("data-theme", "light");

    // Enable chrono view
    await page.locator(".view-toggle").click();
    await expect(page.locator("body")).toHaveClass(/\bchrono-view\b/);

    // Reload the page
    await page.reload();

    // Theme should persist
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    // Chrono view should persist
    await expect(page.locator("body")).toHaveClass(/\bchrono-view\b/);

    // Timeline section should be visible
    await expect(page.locator("#timeline")).toBeVisible();
  });
});

test.describe("Timeline filter buttons", () => {
  test("filters cards by type and resets with All", async ({ page }) => {
    await page.goto("/");

    // Switch to chrono view
    await page.locator(".view-toggle").click();
    await expect(page.locator("body")).toHaveClass(/\bchrono-view\b/);

    // Should have 6 filter buttons
    const filters = page.locator(".chrono-filter");
    await expect(filters).toHaveCount(6);

    // "Experience" should be active by default
    await expect(
      page.locator('.chrono-filter[data-filter="experience"]')
    ).toHaveClass(/\bactive\b/);

    // Only Experience badges should be visible by default
    const visibleBadges = page.locator(
      ".chrono-card:not(.chrono-hidden) .chrono-badge"
    );
    const visibleCount = await visibleBadges.count();
    expect(visibleCount).toBeGreaterThan(0);
    for (let i = 0; i < visibleCount; i++) {
      await expect(visibleBadges.nth(i)).toHaveText("Experience");
    }

    // Some cards should be hidden
    const hiddenCards = page.locator(".chrono-card.chrono-hidden");
    expect(await hiddenCards.count()).toBeGreaterThan(0);

    // Click "All" to show everything
    await page.locator('.chrono-filter[data-filter="all"]').click();

    // No cards or years should be hidden
    await expect(page.locator(".chrono-card.chrono-hidden")).toHaveCount(0);
    await expect(page.locator(".chrono-year.chrono-hidden")).toHaveCount(0);

    // Click "Experience" to re-filter
    await page.locator('.chrono-filter[data-filter="experience"]').click();

    // Only Experience badges should be visible again
    const reFilteredBadges = page.locator(
      ".chrono-card:not(.chrono-hidden) .chrono-badge"
    );
    const reFilteredCount = await reFilteredBadges.count();
    expect(reFilteredCount).toBeGreaterThan(0);
    for (let i = 0; i < reFilteredCount; i++) {
      await expect(reFilteredBadges.nth(i)).toHaveText("Experience");
    }
  });
});

test.describe("Chrono details link navigation", () => {
  test("navigates from chrono card to section card", async ({ page }) => {
    await page.goto("/");

    // Switch to chrono view
    await page.locator(".view-toggle").click();
    await expect(page.locator("body")).toHaveClass(/\bchrono-view\b/);

    // Show all cards first (Experience filter is active by default)
    await page.locator('.chrono-filter[data-filter="all"]').click();

    // Click the first visible chrono-details-link (skip edition-gated cards)
    const link = page.locator(".chrono-card:not([data-edition]) > .chrono-details-link").first();
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();

    await link.click();

    // Should switch to section view
    await expect(page.locator("body")).not.toHaveClass(/\bchrono-view\b/);

    // Target element should exist and eventually be visible
    const targetId = href!.slice(1);
    const target = page.locator(`#${targetId}`);
    await expect(target).toBeAttached();
  });
});

test.describe("Chrono group card", () => {
  test("expands and collapses coursework list", async ({ page }) => {
    await page.goto("/");
    await page.locator(".view-toggle").click();
    await expect(page.locator("body")).toHaveClass(/\bchrono-view\b/);

    // Show coursework (Experience filter is active by default)
    await page.locator('.chrono-filter[data-filter="coursework"]').click();

    const toggle = page.locator(".chrono-group-toggle");
    const list = page.locator("#cw-group-list");

    // List starts hidden
    await expect(list).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    // Expand
    await toggle.click();
    await expect(list).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    // Has 3 visible course items (CFD hidden by edition gate)
    await expect(list.locator(".chrono-group-item:not([data-edition])")).toHaveCount(3);

    // Collapse
    await toggle.click();
    await expect(list).toBeHidden();
  });
});

test.describe("Mobile navigation toggle", () => {
  test("opens and closes nav, responds to Escape", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const navToggle = page.locator(".nav-toggle");
    const navLinks = page.locator(".nav-links");

    // Click to open
    await navToggle.click();
    await expect(navLinks).toHaveClass(/\bopen\b/);
    await expect(navToggle).toHaveAttribute("aria-expanded", "true");

    // Click to close
    await navToggle.click();
    await expect(navLinks).not.toHaveClass(/\bopen\b/);
    await expect(navToggle).toHaveAttribute("aria-expanded", "false");

    // Re-open, then press Escape to close
    await navToggle.click();
    await expect(navLinks).toHaveClass(/\bopen\b/);
    await page.keyboard.press("Escape");
    await expect(navLinks).not.toHaveClass(/\bopen\b/);
    await expect(navToggle).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Back-to-top button", () => {
  test("appears on scroll, scrolls to top on click", async ({ page }) => {
    await page.goto("/");

    const backToTop = page.locator(".back-to-top");

    // Should not be visible initially
    await expect(backToTop).not.toHaveClass(/\bvisible\b/);

    // Scroll past 500px
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(backToTop).toHaveClass(/\bvisible\b/);

    // Click to scroll to top
    await backToTop.click();
    await page.waitForFunction(() => window.scrollY < 10);

    // visible class should be removed
    await expect(backToTop).not.toHaveClass(/\bvisible\b/);
  });
});

test.describe("Theme toggle interaction", () => {
  test("switches between dark and light mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    const htmlEl = page.locator("html");
    const themeToggle = page.locator(".theme-toggle");

    // Default dark — no data-theme attribute
    await expect(htmlEl).not.toHaveAttribute("data-theme", "light");

    // Click to switch to light
    await themeToggle.click();
    await expect(htmlEl).toHaveAttribute("data-theme", "light");

    // Click to switch back to dark
    await themeToggle.click();
    await expect(htmlEl).not.toHaveAttribute("data-theme");
  });
});

test.describe("Chrono view re-entry defaults to Experience", () => {
  test("resets to Experience filter when re-entering chrono", async ({
    page,
  }) => {
    await page.goto("/");

    const viewToggle = page.locator(".view-toggle");
    const expFilter = page.locator(
      '.chrono-filter[data-filter="experience"]'
    );
    const allFilter = page.locator('.chrono-filter[data-filter="all"]');

    // Enter chrono view
    await viewToggle.click();
    await expect(page.locator("body")).toHaveClass(/\bchrono-view\b/);

    // Experience should be active
    await expect(expFilter).toHaveClass(/\bactive\b/);

    // Click "All"
    await allFilter.click();
    await expect(allFilter).toHaveClass(/\bactive\b/);
    await expect(expFilter).not.toHaveClass(/\bactive\b/);

    // Toggle back to sections
    await viewToggle.click();
    await expect(page.locator("body")).not.toHaveClass(/\bchrono-view\b/);

    // Re-enter chrono
    await viewToggle.click();
    await expect(page.locator("body")).toHaveClass(/\bchrono-view\b/);

    // Experience should be active again, All should not
    await expect(expFilter).toHaveClass(/\bactive\b/);
    await expect(allFilter).not.toHaveClass(/\bactive\b/);
  });
});

test.describe("Nav scroll offset", () => {
  test("scrolled section is not hidden behind fixed nav", async ({
    page,
  }) => {
    await page.goto("/");

    const navLink = page.locator('a[href="#skills"]').first();
    await navLink.click();

    // Wait for smooth scroll to complete
    await page.waitForTimeout(800);

    const skillsTop = await page
      .locator("#skills")
      .evaluate((el) => el.getBoundingClientRect().top);
    const navHeight = await page
      .locator("nav")
      .evaluate((el) => el.getBoundingClientRect().height);

    // The section top should be at or below the nav bottom
    expect(skillsTop).toBeGreaterThanOrEqual(navHeight - 2);
  });
});

test.describe("Supply Chain Cases filter", () => {
  test("shows exactly 4 Supply Chain Cases cards", async ({ page }) => {
    await page.goto("/");

    // Enter chrono view
    await page.locator(".view-toggle").click();
    await expect(page.locator("body")).toHaveClass(/\bchrono-view\b/);

    // Click Supply Chain Cases filter
    await page
      .locator('.chrono-filter[data-filter="supply chain cases"]')
      .click();

    // Exactly 4 visible cards
    const visibleCards = page.locator(".chrono-card:not(.chrono-hidden)");
    await expect(visibleCards).toHaveCount(4);

    // All visible cards should have "Supply Chain Cases" badge
    const badges = page.locator(
      ".chrono-card:not(.chrono-hidden) .chrono-badge"
    );
    const count = await badges.count();
    expect(count).toBe(4);
    for (let i = 0; i < count; i++) {
      await expect(badges.nth(i)).toHaveText("Supply Chain Cases");
    }
  });
});

test.describe("Tag clear button", () => {
  test("appears on tag activation, clears filter on click", async ({
    page,
  }) => {
    await page.goto("/");

    const clearBtn = page.locator(".tag-clear-btn");

    // Should start hidden
    await expect(clearBtn).toBeHidden();

    // Click a tag to activate filtering
    const tag = page
      .locator(".project-card .tag, .project-featured .tag")
      .first();
    await tag.click();
    await expect(tag).toHaveClass(/\bactive\b/);

    // Clear button should be visible
    await expect(clearBtn).toBeVisible();

    // Click the clear button
    await clearBtn.click();

    // All active and dimmed classes should be removed
    await expect(page.locator(".tag.active")).toHaveCount(0);
    await expect(page.locator(".dimmed")).toHaveCount(0);

    // Clear button should be hidden again
    await expect(clearBtn).toBeHidden();
  });
});

test.describe("Project details expand", () => {
  test("toggles detail content on click", async ({ page }) => {
    await page.goto("/");

    // Wait for the section to be visible
    await page.evaluate(() => window.scrollTo(0, 600));

    const details = page.locator(".project-details").first();
    const toggle = details.locator(".project-details-toggle");
    const body = details.locator(".project-details-body");

    // Details should start closed
    await expect(body).toBeHidden();

    // Click to open
    await toggle.click();
    await expect(body).toBeVisible();

    // Click to close
    await toggle.click();
    await expect(body).toBeHidden();
  });
});
