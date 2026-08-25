import { sanityClient, projectId } from "./client";
import {
  sportsHeroQuery,
  sportsPhilosophyQuery,
  sportsCricketArenaQuery,
  sportsPassionQuery,
  sportsTestimonialsQuery,
  sportsMatchCTAQuery,
  sportsMediaGalleryQuery,
} from "./queries";
import {
  SanityHeroSection,
  SanityPhilosophySection,
  SanityCricketArenaSection,
  SanityPassionSection,
  SanityTestimonialsSection,
  SanityMatchCTASection,
} from "./types";

export async function getSportsHeroData(): Promise<SanityHeroSection | null> {
  if (!projectId || projectId === "vp-associates" || projectId === "your-project-id") return null;
  try {
    const data = await sanityClient.fetch<SanityHeroSection>(sportsHeroQuery);
    return data || null;
  } catch (error: any) {
    console.info(`[Sanity] Falling back for Hero section: ${error?.message}`);
    return null;
  }
}

export async function getSportsPhilosophyData(): Promise<SanityPhilosophySection | null> {
  if (!projectId || projectId === "vp-associates" || projectId === "your-project-id") return null;
  try {
    const data = await sanityClient.fetch<SanityPhilosophySection>(sportsPhilosophyQuery);
    return data || null;
  } catch (error: any) {
    console.info(`[Sanity] Falling back for Philosophy section: ${error?.message}`);
    return null;
  }
}

export async function getSportsCricketArenaData(): Promise<SanityCricketArenaSection | null> {
  if (!projectId || projectId === "vp-associates" || projectId === "your-project-id") return null;
  try {
    const data = await sanityClient.fetch<SanityCricketArenaSection>(sportsCricketArenaQuery);
    return data || null;
  } catch (error: any) {
    console.info(`[Sanity] Falling back for Cricket Arena section: ${error?.message}`);
    return null;
  }
}

export async function getSportsPassionData(): Promise<SanityPassionSection | null> {
  if (!projectId || projectId === "vp-associates" || projectId === "your-project-id") return null;
  try {
    const data = await sanityClient.fetch<SanityPassionSection>(sportsPassionQuery);
    return data || null;
  } catch (error: any) {
    console.info(`[Sanity] Falling back for Passion section: ${error?.message}`);
    return null;
  }
}

export async function getSportsTestimonialsData(): Promise<SanityTestimonialsSection | null> {
  if (!projectId || projectId === "vp-associates" || projectId === "your-project-id") return null;
  try {
    const data = await sanityClient.fetch<SanityTestimonialsSection>(sportsTestimonialsQuery);
    return data || null;
  } catch (error: any) {
    console.info(`[Sanity] Falling back for Testimonials section: ${error?.message}`);
    return null;
  }
}

export async function getSportsMatchCTAData(): Promise<SanityMatchCTASection | null> {
  if (!projectId || projectId === "vp-associates" || projectId === "your-project-id") return null;
  try {
    const data = await sanityClient.fetch<SanityMatchCTASection>(sportsMatchCTAQuery);
    return data || null;
  } catch (error: any) {
    console.info(`[Sanity] Falling back for Match CTA section: ${error?.message}`);
    return null;
  }
}

export async function getSportsMediaGalleryData(): Promise<any | null> {
  if (!projectId || projectId === "vp-associates" || projectId === "your-project-id") return null;
  try {
    const data = await sanityClient.fetch<any>(sportsMediaGalleryQuery);
    return data || null;
  } catch (error: any) {
    console.info(`[Sanity] Falling back for Media Gallery: ${error?.message}`);
    return null;
  }
}
