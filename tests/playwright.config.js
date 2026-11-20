// @ts-check
const { defineConfig } = require("@playwright/test");

// Serves the built app (repo root) and runs the smoke tests against it. Build first: py src/build.py
module.exports = defineConfig({
  testDir: ".",
  testMatch: "*.spec.js",
  workers: 1,
  retries: 0,
  timeout: 30000,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    viewport: { width: 375, height: 812 },
    serviceWorkers: "block",   // every test starts clean; the service worker is not under test
    acceptDownloads: true,
  },
  webServer: {
    command: "node server.js",
    url: "http://127.0.0.1:4173/index.html",
    reuseExistingServer: true,
  },
});
