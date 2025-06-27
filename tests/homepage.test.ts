import { expect, test } from "@playwright/test";

const mockServerFetch = async (path: string, payload: any) => {
  return fetch("http://localhost:3000/api/msw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path, payload }),
  });
};

test("homepage with custom API response", async ({ page }) => {
  // Mock the server-side fetch
  await mockServerFetch(
    "https://mockanapi.com/s/6773ca761e6f1a48a311752a/test2",
    {
      message: "Server override",
    }
  );

  // Mock the single client-side fetch
  // await page.route(
  //   "https://mockanapi.com/s/6773ca761e6f1a48a311752a/test2",
  //   async (route) => {
  //     const json = {
  //       message: "Client override",
  //     };
  //     await route.fulfill({ json });
  //   }
  // );

  // Use the recorded HAR file to mock Client side API responses
  await page.routeFromHAR("./tests/homepage.har", {
    url: "**/mockanapi.com/**",
    update: false, // false = use HAR file, true = update HAR file
  });

  await page.goto("/");

  // This should now show the custom response
  await expect(page.locator("data-testid=server")).toContainText(
    "Server override"
  );
  // This should now show the custom response
  await expect(page.locator("data-testid=client")).toContainText(
    "Client override"
  );
});
