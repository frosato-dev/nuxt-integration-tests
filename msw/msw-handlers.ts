import { http, HttpResponse } from "msw";

// Define your API handlers here
export const handlers = [
  http.get("https://mockanapi.com/s/6773ca761e6f1a48a311752a/test2", () => {
    return HttpResponse.json({
      message: "Default",
    });
  }),
];
