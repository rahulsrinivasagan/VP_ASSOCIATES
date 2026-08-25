import { createClient } from "@sanity/client";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Sanity project IDs are 8-character alphanumeric strings like hmjw3zc5
export const projectId = (rawProjectId && /^[a-z0-9-]+$/i.test(rawProjectId))
  ? rawProjectId
  : "hmjw3zc5";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
