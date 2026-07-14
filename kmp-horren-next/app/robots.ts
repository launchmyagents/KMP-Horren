import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo-config";

// Paths that should never be crawled, by anyone.
// Admin/account/checkout/cart/order are user-private; api is RPC-only.
const SENSITIVE_PATHS = [
  "/admin/",
  "/account/",
  "/checkout/",
  "/winkelwagen/",
  "/bestelling/",
  "/api/",
];

// Auth pages — kept out of the wildcard rule because they have no
// indexable content, but allowed for Googlebot/AI bots that already
// know not to surface them.
const AUTH_PATHS = [
  "/login",
  "/registreren",
  "/wachtwoord-vergeten",
  "/wachtwoord-reset",
  "/callback",
];

// AI / LLM crawlers we explicitly welcome. Citation visibility in
// ChatGPT, Claude, Perplexity, Google AI Overviews etc. is meaningful
// for this site (a webshop in a head-keyword niche), so we name each
// bot rather than relying on the wildcard rule. Same sensitivity
// disallows as Googlebot — content is open, account/checkout are not.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI — training
  "ChatGPT-User", // OpenAI — live browsing on user request
  "OAI-SearchBot", // OpenAI — SearchGPT crawler
  "ClaudeBot", // Anthropic — Claude crawler
  "anthropic-ai", // Anthropic — legacy UA, still seen
  "Claude-Web", // Anthropic — Claude.ai web fetcher
  "PerplexityBot", // Perplexity — search index
  "Perplexity-User", // Perplexity — live citation fetch
  "Google-Extended", // Google — opt-in for Gemini / AI Overviews training
  "Applebot-Extended", // Apple — Apple Intelligence opt-in
  "Meta-ExternalAgent", // Meta — Meta AI crawler
  "Bytespider", // ByteDance — TikTok / Doubao
  "CCBot", // Common Crawl — feeds many open-source LLMs
  "DuckAssistBot", // DuckDuckGo AI assistant
  "YouBot", // You.com
  "cohere-ai", // Cohere
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for any user agent not named below.
      {
        userAgent: "*",
        allow: "/",
        disallow: [...SENSITIVE_PATHS, ...AUTH_PATHS],
      },
      // Googlebot — gets the same surface as the public, but doesn't
      // need the auth-page disallows (it won't index them anyway).
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },
      // AI / LLM crawlers — explicit welcome with the same sensitivity
      // disallows. Listing each bot is intentional: some providers only
      // crawl sites that name them, and being explicit is also a clear
      // signal of intent for future maintainers.
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
