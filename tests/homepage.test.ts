import { test, expect } from "@playwright/test";
import { http, HttpResponse } from "msw";
import { server } from "~/msw/msw-node";

test("homepage with custom API response", async ({ page }) => {
  // Should override the default handler for this specific test (not working)
  // server.use(
  //   http.get("https://mockanapi.com/s/6773ca761e6f1a48a311752a/test2", () => {
  //     return HttpResponse.json({
  //       message: "TOTO",
  //     });
  //   })
  // );

  await page.goto("/");

  // This should now show the custom response
  await expect(page.locator("data-testid=ssr")).toContainText(
    "custom response for this test"
  );
});
