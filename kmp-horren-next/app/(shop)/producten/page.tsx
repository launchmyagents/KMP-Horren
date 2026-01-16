import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { getProductsByType, PRODUCTS } from "@/data/products";
import { ProductsBreadcrumb, ProductListSchema } from "@/components/seo";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

export const metadata: Metadata = {
  title: "Alle Horren Producten - Raamhorren & Deurhorren op Maat",
  description:
    "Bekijk ons complete assortiment maatwerk horren. Raamhorren, deurhorren, plissé horren en meer. Direct online configureren en bestellen. ✓ Gratis verzending vanaf €250",
  keywords: [
    "horren",
    "raamhorren",
    "deurhorren",
    "plissé horren",
    "inzethorren",
    "rolhorren",
    "maatwerk",
    "online bestellen",
  ],
  alternates: {
    canonical: `${BASE_URL}/producten`,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/producten`,
    siteName: "KMP Horren",
    title: "Alle Horren Producten - KMP Horren",
    description:
      "Bekijk ons complete assortiment maatwerk horren. Raamhorren, deurhorren, plissé horren en meer.",
    images: [
      {
        url: `${BASE_URL}/og-products.jpg`,
        width: 1200,
        height: 630,
        alt: "KMP Horren Producten",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alle Horren Producten - KMP Horren",
    description:
      "Bekijk ons complete assortiment maatwerk horren. Direct online configureren en bestellen.",
  },
};

export default function ProductsPage() {
  const windowProducts = getProductsByType("WINDOW");
  const doorProducts = getProductsByType("DOOR");
  const activeProducts = PRODUCTS.filter((p) => p.isActive);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <ProductsBreadcrumb />
      <ProductListSchema products={activeProducts} categoryName="Alle Horren" />
      {/* Hero */}
      <section className="bg-kmp-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white">Producten</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Alle Producten
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Ontdek ons complete assortiment maatwerk horren. Van raamhorren tot
            hordeuren, alles wordt op maat gemaakt in onze eigen fabriek.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Quick links */}
        <div className="flex flex-wrap gap-4 mb-12">
          <a
            href="#raamhorren"
            className="px-6 py-3 bg-white border border-slate-200 rounded-full font-semibold text-kmp-blue hover:border-kmp-orange hover:text-kmp-orange transition-colors"
          >
            Raamhorren ({windowProducts.length})
          </a>
          <a
            href="#deurhorren"
            className="px-6 py-3 bg-white border border-slate-200 rounded-full font-semibold text-kmp-blue hover:border-kmp-orange hover:text-kmp-orange transition-colors"
          >
            Deurhorren ({doorProducts.length})
          </a>
        </div>

        {/* Window Products */}
        <section id="raamhorren" className="mb-16 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight">
                Raamhorren
              </h2>
              <p className="text-slate-500 mt-1">
                {windowProducts.length} producten
              </p>
            </div>
            <Link
              href="/producten/raamhorren"
              className="text-kmp-orange font-semibold hover:underline flex items-center gap-1"
            >
              Bekijk alle <ChevronRight size={16} />
            </Link>
          </div>
          <ProductGrid products={windowProducts} columns={4} />
        </section>

        {/* Door Products */}
        <section id="deurhorren" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight">
                Deurhorren
              </h2>
              <p className="text-slate-500 mt-1">
                {doorProducts.length} producten
              </p>
            </div>
            <Link
              href="/producten/deurhorren"
              className="text-kmp-orange font-semibold hover:underline flex items-center gap-1"
            >
              Bekijk alle <ChevronRight size={16} />
            </Link>
          </div>
          <ProductGrid products={doorProducts} columns={4} />
        </section>
      </div>
    </div>
  );
}
