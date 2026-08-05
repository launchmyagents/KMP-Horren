import { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { BASE_URL } from "@/lib/seo-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/producten`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/producten/raamhorren`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/producten/deurhorren`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/producten/verduisterend`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      // Live in Supabase only (marketing category, not a static `type`), so
      // not covered by the PRODUCTS-derived productPages loop below.
      url: `${BASE_URL}/producten/duo-plisse-hor-verduisterend`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vergelijk`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/over-ons`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      // Money page: the inmeetservice is how KMP wins the jobs it cannot sell
      // straight from the webshop. It was live, indexable and canonicalised but
      // missing from the sitemap until 2026-08-05.
      url: `${BASE_URL}/inmeetservice`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Indexable legal pages belong in the sitemap too, otherwise the sitemap
      // no longer matches the set of indexable URLs.
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/algemene-voorwaarden`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Product pages - dynamically generated from products data
  const productPages: MetadataRoute.Sitemap = PRODUCTS.filter(
    (product) => product.isActive
  ).map((product) => ({
    url: `${BASE_URL}/producten/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
