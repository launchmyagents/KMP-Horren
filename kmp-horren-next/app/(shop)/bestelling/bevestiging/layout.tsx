import { Metadata } from "next";
import { BASE_URL } from "@/lib/seo-config";

// bevestiging/page.tsx is a client component ("use client") and cannot export
// `metadata` itself. See the note in app/(shop)/winkelwagen/layout.tsx.
export const metadata: Metadata = {
  title: "Bestelling bevestigd",
  description:
    "Bevestiging van uw bestelling bij KMP Horren. Op deze pagina ziet u wat u heeft besteld. Een kopie ontvangt u ook per e-mail.",
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${BASE_URL}/bestelling/bevestiging`,
  },
};

export default function BevestigingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
