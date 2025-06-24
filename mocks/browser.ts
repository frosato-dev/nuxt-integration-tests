import { setupWorker } from "msw/browser";
import { handlers } from "~/tests/setup/msw-config";

// Setup the service worker with the same handlers used in tests
export const worker = setupWorker(...handlers);
