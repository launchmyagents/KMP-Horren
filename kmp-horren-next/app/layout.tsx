import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap", // Optimize font loading
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#161f35", // KMP Blue
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "KMP Horren - Maatwerk Horren voor elk Raam en Deur",
    template: "%s | KMP Horren",
  },
  description:
    "De specialist in maatwerk insectenwering. Bestel direct online uw inzethorren, hordeuren en rolhorren op maat. Gemaakt in onze eigen Nederlandse fabriek.",
  keywords: [
    "horren",
    "inzethorren",
    "hordeuren",
    "rolhorren",
    "plissé horren",
    "maatwerk horren",
    "insectenwering",
    "Nederland",
    "online bestellen",
    "op maat",
  ],
  authors: [{ name: "KMP Horren", url: BASE_URL }],
  creator: "KMP Horren",
  publisher: "KMP Horren",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" dir="ltr">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${archivo.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
