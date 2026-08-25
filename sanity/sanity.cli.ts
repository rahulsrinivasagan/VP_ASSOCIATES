import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "hmjw3zc5",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  deployment: {
    appId: "q4o4swpbugeenoq4pgta9duo",
    autoUpdates: false,
  },
});
