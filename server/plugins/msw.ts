import { server } from "~/msw/msw-node";
export default defineNitroPlugin(async (nitroApp) => {
  server.listen({
    onUnhandledRequest: "bypass",
  });

  nitroApp.hooks.hook("request", async (event) => {
    event.context.$mswServer = server;
  });
});
