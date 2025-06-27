import { http, HttpResponse } from "msw";

export default defineEventHandler(async (event) => {
  const server = event!.context.$mswServer;
  const { path, payload } = await readBody(event);

  // Should override the default handler for this specific test (not working)
  server.use(
    http.get(path, () => {
      return HttpResponse.json(payload);
    })
  );

  return "ok";
});
