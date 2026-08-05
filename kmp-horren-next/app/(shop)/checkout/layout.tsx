import { Metadata } from "next";
import { BASE_URL } from "@/lib/seo-config";

// checkout/page.tsx is a client component ("use client") and cannot export
// `metadata` itself. See the note in app/(shop)/winkelwagen/layout.tsx.
export const metadata: Metadata = {
  title: "Bestelling afronden",
  description:
    "Rond uw bestelling af bij KMP Horren. Vul uw gegevens en het bezorgadres in, kies een betaalmethode en bevestig de bestelling.",
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE_URL}/checkout`,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
