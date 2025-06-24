import { test, expect } from "playwright-ssr";

test("homepage API mocking", async ({ page, webServer }) => {
  console.log("webServer", webServer);
  await webServer.route("**/*", async (route) => {
    await route.fulfill({
      status: 200,
      json: { fizz: "bar" },
    });
  });

  // Naviguer vers la page d'accueil
  await page.goto("/");

  // Vérifier que nous sommes sur la page d'accueil
  await expect(page.locator("h1")).toContainText("Homepage");

  // Vérifier que nous sommes sur la page d'accueil
  await expect(page.locator("data-testid=api")).toContainText("bar");
});
