import { setupServer } from "msw/node";
import { handlers } from "./msw-config";

// Create the server instance
export const server = setupServer(...handlers);

// Helper function to start MSW for tests
export const startMSW = () => {
  server.listen({
    onUnhandledRequest: "bypass",
  });
};

// Helper function to stop MSW
export const stopMSW = () => {
  server.close();
};

// Helper function to reset handlers between tests
export const resetMSW = () => {
  server.resetHandlers();
};
