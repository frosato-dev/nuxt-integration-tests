// This plugin is for client-side mocking (browser requests)
// Only include this if you also need to mock client-side API calls

export default defineNuxtPlugin(async () => {
  // Only run in development/test environment and on client-side
  if (process.env.NODE_ENV !== "production" && process.client) {
    const { worker } = await import("~/msw/msw-browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }

  // if (process.env.NODE_ENV !== "production" && process.server) {
  //   const { startMSW } = await import("~/msw/msw-node");
  //   startMSW();
  // }
});
