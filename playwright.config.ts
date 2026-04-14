import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { browserName: "chromium", viewport: { width: 1280, height: 800 } },
    },
    {
      name: "chromium-wide",
      use: { browserName: "chromium", viewport: { width: 1440, height: 900 } },
    },
    {
      name: "webkit-desktop",
      use: { browserName: "webkit", viewport: { width: 1280, height: 800 } },
    },
    {
      name: "firefox-desktop",
      use: { browserName: "firefox", viewport: { width: 1280, height: 800 } },
    },
    {
      name: "iphone-safari",
      use: { ...devices["iPhone 14"] },
    },
    {
      name: "iphone-landscape",
      use: { ...devices["iPhone 14 landscape"] },
    },
    {
      name: "ipad-safari",
      use: { ...devices["iPad Pro 11"] },
    },
    {
      name: "ipad-landscape",
      use: { ...devices["iPad Pro 11 landscape"] },
    },
    {
      name: "chromium-half",
      use: { browserName: "chromium", viewport: { width: 960, height: 1080 } },
    },
    {
      name: "android-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "npx serve . -l 3000 --no-clipboard",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
