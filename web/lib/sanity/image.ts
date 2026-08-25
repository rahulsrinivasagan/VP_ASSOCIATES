import createImageUrlBuilder from "@sanity/image-url";
import { sanityClient, projectId, dataset } from "./client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return null;

  // Direct string URL
  if (typeof source === "string") return source;

  // Try builder if valid Sanity image reference or asset exists
  if (source.asset?._ref || source._ref || source.asset?._id || source._id) {
    try {
      const url = builder.image(source).url();
      if (url) return url;
    } catch {
      // Fallback to direct asset.url if builder fails
    }
  }

  // Direct expanded URL
  if (source.asset?.url) return source.asset.url;
  if (source.url) return source.url;

  return null;
}

/**
 * Helper to resolve Sanity file/video asset URLs directly.
 */
export function getSanityFileUrl(source: any): string | null {
  if (!source) return null;

  // 1. Direct string URL
  if (typeof source === "string") {
    if (source.startsWith("http://") || source.startsWith("https://") || source.startsWith("/")) {
      return source;
    }
    if (source.startsWith("file-")) {
      return parseSanityFileRef(source);
    }
  }

  // 2. Direct expanded URL
  if (source.asset?.url) return source.asset.url;
  if (source.url) return source.url;

  // 3. Asset _ref parsing fallback
  const ref = source.asset?._ref || source._ref || source.asset?._id || source._id;
  if (ref && typeof ref === "string" && ref.startsWith("file-")) {
    return parseSanityFileRef(ref);
  }

  return null;
}

function parseSanityFileRef(ref: string): string | null {
  const match = ref.match(/^file-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)$/);
  if (match) {
    const [, fileId, ext] = match;
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${ext}`;
  }
  return null;
}

/**
 * Returns a clean, responsive image URL with width, height, quality and webp auto format.
 */
export function getResponsiveImageUrl(
  source: any,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  }
): string | null {
  if (!source) return null;

  // 1. Direct string URL
  if (typeof source === "string") return source;

  // 2. Try builder if valid Sanity image reference or asset object exists
  if (source.asset?._ref || source._ref || source.asset?._id || source._id) {
    try {
      let imgBuilder = builder.image(source).auto("format");
      if (options?.width) imgBuilder = imgBuilder.width(options.width);
      if (options?.height) imgBuilder = imgBuilder.height(options.height);
      if (options?.quality) imgBuilder = imgBuilder.quality(options.quality);
      else imgBuilder = imgBuilder.quality(80);
      if (options?.fit) imgBuilder = imgBuilder.fit(options.fit);

      const url = imgBuilder.url();
      if (url) return url;
    } catch (e) {
      console.warn("[Sanity Image Builder Warning]:", e);
    }
  }

  // 3. Direct expanded URL from GROQ dereference
  if (source.asset?.url) {
    return source.asset.url;
  }
  if (source.url) {
    return source.url;
  }

  return null;
}
