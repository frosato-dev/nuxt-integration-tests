// This plugin is for client-side mocking (browser requests)
// Only include this if you also need to mock client-side API calls

import { startMSW } from "~/msw/msw-node";

export default defineNuxtPlugin(async () => {
  startMSW();
});
