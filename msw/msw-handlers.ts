import { http, HttpResponse } from "msw";

// Define your API handlers here
export const handlers = [
  // Example API handler - replace with your actual endpoints
  http.get("/api/test", () => {
    return HttpResponse.json({
      message: "buzz",
    });
  }),
  http.get("https://mockanapi.com/**", () => {
    return HttpResponse.json({
      message: "custom response for this test",
    });
  }),
];
