import { Metadata } from "next";

// checkout/page.tsx is a client component ("use client"), which cannot
// export `metadata` itself — Next.js only reads metadata from Server
// Components. This layout exists solely to attach it, same pattern as
// app/(shop)/contact/layout.tsx and app/(shop)/faq/layout.tsx.
export const metadata: Metadata = {
  // Utility/funnel page — never index (health-check 2026-W30, #3).
  robots: { index: false, follow: true },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
