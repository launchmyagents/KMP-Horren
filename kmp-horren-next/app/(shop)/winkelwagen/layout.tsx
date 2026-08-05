import { Metadata } from "next";
import { BASE_URL } from "@/lib/seo-config";

// winkelwagen/page.tsx is a client component ("use client"), which cannot
// export `metadata` itself — Next.js only reads metadata from Server
// Components. This layout exists solely to attach it, same pattern as
// app/(shop)/contact/layout.tsx and app/(shop)/faq/layout.tsx.
//
// Without it the page fell back to the root layout's defaults, so it shared
// its <title> and meta description with /checkout and /bestelling/bevestiging
// and carried no canonical at all. Measured 2026-08-05: /winkelwagen was being
// shown in Google at position 2.0 while the category pages sat around 55.
export const metadata: Metadata = {
  title: "Winkelwagen",
  description:
    "Uw winkelwagen bij KMP Horren. Bekijk welke horren u heeft gekozen, controleer de maten en het totaalbedrag en reken daarna af.",
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE_URL}/winkelwagen`,
  },
};

export default function WinkelwagenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
