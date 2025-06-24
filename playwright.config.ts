import { defineConfig, devices } from "@playwright/test";
import type { WorkerConfigOptions } from "playwright-ssr";

export default defineConfig<WorkerConfigOptions>({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:3000",
        webServer: {
          command: "npm",
          args: ["run", "dev"],
          url: "http://localhost:3000",
        },
      },
    },
  ],
  // webServer: {
  //   command: "npm run dev",
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
