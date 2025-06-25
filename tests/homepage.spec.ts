import { test, expect } from "@nuxt/test-utils/playwright";

test("homepage navigation to demo-1", async ({ page, goto }) => {
  // Navigate to the homepage
  await goto("/", { waitUntil: "hydration" });

  // Check that we are on the homepage
  await expect(page.locator("h1")).toHaveText("Homepage");

  // Wait for the API data to load, or check if it's present
  // The API data might be empty in test environment, so we'll check for the container
  await expect(page.locator('[data-testid="api"]')).toBeVisible();

  // Check that the navigation link is present
  await expect(page.locator('a[href="/demo-1"]')).toBeVisible();

  // Click on the link to Demo 1
  await page.click('a[href="/demo-1"]');

  // Check that the page title is "Demo 1"
  await expect(page.locator("h1")).toHaveText("Demo 1");
});

test("demo-1 page loads correctly", async ({ page, goto }) => {
  // Navigate directly to demo-1
  await goto("/demo-1", { waitUntil: "hydration" });

  // Check that we are on the demo-1 page
  await expect(page.locator("h1")).toHaveText("Demo 1");

  // Check that the back link is present
  await expect(page.locator('a[href="/"]')).toBeVisible();

  // Click on the back link
  await page.click('a[href="/"]');

  // Check that we're back on the homepage
  await expect(page.locator("h1")).toHaveText("Homepage");
});
