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
