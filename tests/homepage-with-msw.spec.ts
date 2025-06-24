import { test, expect } from "@playwright/test";
import { startMSW, stopMSW, resetMSW, server } from "./setup/msw-node";
import { http, HttpResponse } from "msw";

// Setup MSW for all tests in this file
test.beforeAll(async () => {
  startMSW();
});

test.afterAll(async () => {
  stopMSW();
});

test.afterEach(async () => {
  resetMSW();
});

test("homepage with custom API response", async ({ page }) => {
  // Override the default handler for this specific test
  server.use(
    http.get("https://mockanapi.com/s/6773ca761e6f1a48a311752a/test2", () => {
      return HttpResponse.json({
        message: "custom response for this test",
      });
    })
  );

  await page.goto("/");

  // This should now show the custom response
  await expect(page.locator("data-testid=api")).toContainText(
    "custom response for this test"
  );
});
