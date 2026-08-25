import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "VP Associates Studio",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "hmjw3zc5",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
