import { test, expect } from "@playwright/test";

test("homepage navigation to demo-1", async ({ page }) => {
  // Naviguer vers la page d'accueil
  await page.goto("/");

  // Vérifier que nous sommes sur la page d'accueil
  await expect(page.locator("h1")).toContainText("Homepage");

  // Vérifier que nous sommes sur la page d'accueil
  await expect(page.locator("data-testid=api")).toContainText("buzz");

  // Cliquer sur le lien vers Demo 1
  await page.click('a[href="/demo-1"]');

  // Vérifier que le titre à l'écran est bien "Demo 1"
  await expect(page.locator("h1")).toContainText("Demo 1");
});
