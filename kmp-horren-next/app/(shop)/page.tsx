import { Metadata } from "next";
import { Hero, FeaturedProducts, USPSection, CTASection } from "@/components/home";
import { OrganizationSchema, LocalBusinessSchema, HomeBreadcrumb } from "@/components/seo";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

export const metadata: Metadata = {
  title: "KMP Horren - Maatwerk Horren voor elk Raam en Deur",
  description:
    "De specialist in maatwerk insectenwering. Bestel direct online uw inzethorren, hordeuren en rolhorren op maat. Gemaakt in onze eigen Nederlandse fabriek. ✓ Gratis verzending vanaf €250 ✓ 3 jaar garantie",
  keywords: [
    "horren",
    "inzethorren",
    "hordeuren",
    "rolhorren",
    "plissé horren",
    "maatwerk horren",
    "insectenwering",
    "raamhorren",
    "Nederland",
    "online bestellen",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: BASE_URL,
    siteName: "KMP Horren",
    title: "KMP Horren - Maatwerk Horren voor elk Raam en Deur",
    description:
      "De specialist in maatwerk insectenwering. Bestel direct online uw inzethorren, hordeuren en rolhorren op maat.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "KMP Horren - Maatwerk Horren",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KMP Horren - Maatwerk Horren voor elk Raam en Deur",
    description:
      "De specialist in maatwerk insectenwering. Bestel direct online uw inzethorren, hordeuren en rolhorren op maat.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <HomeBreadcrumb />
      <Hero />
      <FeaturedProducts />
      <USPSection />
      <CTASection />
    </>
  );
}
