import { Metadata } from "next";
import { FAQBreadcrumb, FAQPageSchema } from "@/components/seo";
import { FAQS } from "@/data/faqs";
import { BASE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Veelgestelde Vragen (FAQ) - KMP Horren",
  description:
    "Antwoorden op veelgestelde vragen over horren, meten, monteren, bestellen en garantie. Vind snel het antwoord op uw vraag bij KMP Horren.",
  keywords: [
    "faq",
    "veelgestelde vragen",
    "horren",
    "meten",
    "monteren",
    "bestellen",
    "garantie",
    "levertijd",
    "betaling",
    "kmp horren",
  ],
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/faq`,
    siteName: "KMP Horren",
    title: "Veelgestelde Vragen - KMP Horren",
    description:
      "Antwoorden op veelgestelde vragen over horren, meten, monteren, bestellen en garantie.",
    images: [
      {
        url: `${BASE_URL}/og-faq.jpg`,
        width: 1200,
        height: 630,
        alt: "FAQ KMP Horren",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Veelgestelde Vragen - KMP Horren",
    description:
      "Antwoorden op veelgestelde vragen over horren, meten, monteren, bestellen en garantie.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQBreadcrumb />
      <FAQPageSchema faqs={FAQS} />
      {children}
    </>
  );
}
