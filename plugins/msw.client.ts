// This plugin is for client-side mocking (browser requests)
// Only include this if you also need to mock client-side API calls

export default defineNuxtPlugin(async () => {
  // Only run in development/test environment and on client-side
  if (process.env.NODE_ENV !== "production" && process.client) {
    const { worker } = await import("~/mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
});
