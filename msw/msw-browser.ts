import { setupWorker } from "msw/browser";
import { handlers } from "~/msw/msw-handlers";

// Setup the service worker with the same handlers used in tests
export const worker = setupWorker(...handlers);
