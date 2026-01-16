import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

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
