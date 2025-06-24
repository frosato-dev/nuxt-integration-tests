# MSW Setup for Nuxt + Playwright Testing

This setup allows you to mock server-side API requests made by Nuxt during your Playwright tests.

## Files Overview

- `tests/setup/msw-config.ts` - Main MSW configuration with API handlers
- `tests/homepage-with-msw.spec.ts` - Example test file showing MSW usage
- `mocks/browser.ts` - Browser-side MSW setup (optional)
- `plugins/msw.client.ts` - Nuxt plugin for client-side mocking (optional)

## How It Works

1. **Server-side Mocking**: MSW intercepts HTTP requests made by your Nuxt server during SSR
2. **Test Integration**: Each test file can start/stop MSW and define custom handlers
3. **Request Handling**: API calls from your Nuxt pages/components get mocked responses

## Usage Examples

### Basic Test with MSW

```typescript
import { test, expect } from "@playwright/test";
import { startMSW, stopMSW, resetMSW } from "./setup/msw-config";

test.beforeAll(async () => {
  startMSW();
});

test.afterAll(async () => {
  stopMSW();
});

test.afterEach(async () => {
  resetMSW();
});

test("my test", async ({ page }) => {
  await page.goto("/");
  // Your test logic here
});
```

### Custom Handler for Specific Test

```typescript
test("custom API response", async ({ page }) => {
  server.use(
    http.get("/api/custom", () => {
      return HttpResponse.json({ data: "custom response" });
    })
  );

  await page.goto("/page-that-uses-custom-api");
  // Test the page with custom API response
});
```

### Adding New API Handlers

Edit `tests/setup/msw-config.ts` and add new handlers:

```typescript
export const handlers = [
  // Existing handlers...

  http.get("/api/new-endpoint", () => {
    return HttpResponse.json({
      success: true,
      data: { /* your mock data */ }
    });
  }),
];
```

## Environment Configuration

The MSW setup automatically:

- Bypasses unhandled requests (won't throw errors for unmocked APIs)
- Resets handlers between tests for isolation
- Works with Nuxt's server-side rendering

## Troubleshooting

1. **Requests not being mocked**: Check that your API endpoint URLs match exactly
2. **TypeScript errors**: Ensure all imports are correct and MSW is properly installed
3. **Tests failing**: Verify that MSW is started before your tests run

## Optional: Client-side Mocking

If you also need to mock client-side API requests:

1. The `plugins/msw.client.ts` plugin is already set up
2. It will automatically start MSW in the browser during development
3. Uses the same handlers as your tests for consistency
