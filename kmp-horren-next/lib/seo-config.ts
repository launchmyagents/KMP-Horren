/**
 * Single source of truth for the public site URL used in canonicals,
 * sitemap, robots, JSON-LD and OpenGraph metadata.
 *
 * Reads from the NEXT_PUBLIC_APP_URL environment variable, with a
 * defensive guard: if the value is missing, empty, or accidentally
 * points to a preview host (Railway, Vercel) or localhost, we fall
 * back to the production domain so SEO metadata never leaks a
 * non-canonical URL to crawlers.
 *
 * The production domain should always be set explicitly in the
 * deployment environment via NEXT_PUBLIC_APP_URL=https://kmp-horren.nl
 */

const PRODUCTION_URL = "https://kmp-horren.nl";

function resolveBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (!envUrl) return PRODUCTION_URL;
  if (!envUrl.startsWith("https://")) return PRODUCTION_URL;
  if (envUrl.includes("railway.app")) return PRODUCTION_URL;
  if (envUrl.includes("vercel.app")) return PRODUCTION_URL;
  if (envUrl.includes("localhost")) return PRODUCTION_URL;

  // Strip trailing slash for consistent concatenation downstream.
  return envUrl.replace(/\/$/, "");
}

export const BASE_URL = resolveBaseUrl();
