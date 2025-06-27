import { http, HttpResponse } from "msw";

// We should create this endpoint only in the intergration test context
export default defineEventHandler(async (event) => {
  const server = event!.context.$mswServer;
  const { path, payload } = await readBody(event);

  // We use the server instance to override the default handler with the path and payload received from the request.
  server.use(
    http.get(path, () => {
      // We cant return `HttpResponse.json` directly in the payload
      // it does not seems to be serializable.
      return HttpResponse.json(payload);
    })
  );

  return "ok";
});
