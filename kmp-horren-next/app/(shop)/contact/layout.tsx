import { Metadata } from "next";
import { ContactBreadcrumb } from "@/components/seo";
import { BASE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Contact - Neem Contact Op",
  description:
    "Heeft u vragen over onze horren of wilt u advies op maat? Neem contact op met KMP Horren. ✓ Reactie binnen 1 werkdag ✓ Telefonisch bereikbaar ma-vr 08:30-17:00",
  keywords: [
    "contact",
    "kmp horren",
    "klantenservice",
    "advies",
    "horren",
    "vragen",
    "telefoonnummer",
    "email",
  ],
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/contact`,
    siteName: "KMP Horren",
    title: "Contact - KMP Horren",
    description:
      "Heeft u vragen over onze horren of wilt u advies op maat? Neem contact op met KMP Horren.",
    images: [
      {
        url: `${BASE_URL}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact KMP Horren",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact - KMP Horren",
    description:
      "Heeft u vragen over onze horren of wilt u advies op maat? Neem contact op met KMP Horren.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ContactBreadcrumb />
      {children}
    </>
  );
}
