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
      name: "webkit-desktop",
      use: { browserName: "webkit", viewport: { width: 1280, height: 800 } },
    },
    {
      name: "iphone-safari",
      use: { ...devices["iPhone 14"] },
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
