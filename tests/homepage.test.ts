import { test, expect } from "@playwright/test";
import { http, HttpResponse } from "msw";
import { server } from "~/msw/msw-node";

const mockFetch = async (path: string, payload: any) => {
  return fetch("http://localhost:3000/api/msw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path, payload }),
  });
};

test("homepage with custom API response", async ({ page }) => {
  const result = await mockFetch(
    "https://mockanapi.com/s/6773ca761e6f1a48a311752a/test2",
    {
      message: "TOTO",
    }
  );

  await page.goto("/");

  // This should now show the custom response
  await expect(page.locator("data-testid=ssr")).toContainText(
    "custom response for this test"
  );
});
