import type { Page } from "@playwright/test";

export type PageInfo = {
  /** URL path served by the local static server. */
  path: string;
  /** Short label used in test titles. */
  label: string;
  /** Whether the page renders a `.theme-toggle` button. */
  hasThemeToggle: boolean;
  /** Selector for the page's primary heading (used to wait for first paint). */
  hero: string;
};

/**
 * Every shipped HTML page on the site. Keep in sync with sitemap.xml +
 * build.js. Order is hero → top-level subpages → 404 → project case studies.
 */
export const PAGES: PageInfo[] = [
  { path: "/",                                   label: "index",            hasThemeToggle: true,  hero: "main h1" },
  { path: "/resume.html",                        label: "resume",           hasThemeToggle: false, hero: "h1.name" },
  { path: "/cases.html",                         label: "cases",            hasThemeToggle: false, hero: ".hero h1" },
  { path: "/notebook.html",                      label: "notebook",         hasThemeToggle: false, hero: ".hero h1" },
  { path: "/404.html",                           label: "404",              hasThemeToggle: false, hero: "h1.headline" },
  { path: "/projects/stark-translate.html",      label: "stark-translate",  hasThemeToggle: true,  hero: ".hero h1" },
  { path: "/projects/fast-fem.html",             label: "fast-fem",         hasThemeToggle: true,  hero: ".hero h1" },
  { path: "/projects/w26-cobot-axis.html",       label: "w26-cobot-axis",   hasThemeToggle: true,  hero: ".hero h1" },
  { path: "/projects/me440-vibrations.html",     label: "me440-vibrations", hasThemeToggle: true,  hero: ".hero h1" },
  { path: "/projects/me379-fluids-lab.html",     label: "me379-fluids-lab", hasThemeToggle: true,  hero: ".hero h1" },
];

/** Section anchors rendered by index.html (header `id`s). */
export const INDEX_ANCHORS = ["about", "work", "ledger", "stack"];

/** Project subpage paths only, for parametrised case-study assertions. */
export const PROJECT_PAGES = PAGES.filter((p) => p.path.startsWith("/projects/"));

/** Browser projects that own platform-specific snapshot baselines. */
export const VISUAL_PROJECTS = ["chromium-desktop", "iphone-safari"];

/** Browser projects on which we run axe-core scans (cross-browser axe is identical). */
export const AXE_PROJECTS = ["chromium-desktop", "iphone-safari"];

/**
 * Set theme via localStorage before navigation. Works on every page because
 * each page runs an inline script in <head> that reads `localStorage.theme`.
 */
export async function presetTheme(page: Page, theme: "light" | "dark"): Promise<void> {
  await page.addInitScript((t) => {
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* private mode */
    }
  }, theme);
}

/** Disable CSS transitions and animations to make screenshots/axe deterministic. */
export async function freezeAnimations(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `*, *::before, *::after {
      transition: none !important;
      animation: none !important;
      caret-color: transparent !important;
    }`,
  });
}
