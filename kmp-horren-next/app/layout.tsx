import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
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
  ],
  authors: [{ name: "KMP Horren" }],
  creator: "KMP Horren",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://kmp-horren.nl",
    siteName: "KMP Horren",
    title: "KMP Horren - Maatwerk Horren voor elk Raam en Deur",
    description:
      "De specialist in maatwerk insectenwering. Bestel direct online uw inzethorren, hordeuren en rolhorren op maat.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${archivo.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
