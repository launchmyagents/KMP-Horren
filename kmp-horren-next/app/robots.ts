import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/account/",
          "/checkout/",
          "/winkelwagen/",
          "/bestelling/",
          "/api/",
          "/login",
          "/registreren",
          "/wachtwoord-vergeten",
          "/wachtwoord-reset",
          "/callback",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin/",
          "/account/",
          "/checkout/",
          "/winkelwagen/",
          "/bestelling/",
          "/api/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
