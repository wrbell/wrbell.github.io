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

    // "All" should be active by default
    await expect(filters.first()).toHaveClass(/\bactive\b/);

    // Click "Experience" filter
    await page.locator('.chrono-filter[data-filter="experience"]').click();

    // Only Experience badges should be visible
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

    // Some year markers may be hidden
    const hiddenYears = page.locator(".chrono-year.chrono-hidden");
    const hiddenYearCount = await hiddenYears.count();
    // Just verify the count is a number (may be 0 if all years have experience cards)
    expect(hiddenYearCount).toBeGreaterThanOrEqual(0);

    // Click "All" to reset
    await page.locator('.chrono-filter[data-filter="all"]').click();

    // No cards or years should be hidden
    await expect(page.locator(".chrono-card.chrono-hidden")).toHaveCount(0);
    await expect(page.locator(".chrono-year.chrono-hidden")).toHaveCount(0);
  });
});
