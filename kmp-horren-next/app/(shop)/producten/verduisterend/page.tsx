import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Award, Shield, Moon, Bug } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { getVerduisterendProducts } from "@/lib/supabase/database";
import {
  CategoryBreadcrumb,
  ProductListSchema,
  FAQSchema,
} from "@/components/seo";
import { Product } from "@/types";

export const revalidate = 60;

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

export const metadata: Metadata = {
  title: "Verduisterende horren op maat | Duo plissé 2-in-1",
  description:
    "Verduisterende hor op maat: één plissésysteem met een verduisterend deel en een insectenhor in hetzelfde frame. 100% maatwerk, eigen productie NL, 3 jaar garantie.",
  keywords: [
    "verduisterende hor",
    "duo plissé hor",
    "hor met verduistering",
    "plissé hor dakraam verduisterend",
    "2 in 1 hor",
    "insectenwering",
  ],
  alternates: {
    canonical: `${BASE_URL}/producten/verduisterend`,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/producten/verduisterend`,
    siteName: "KMP Horren",
    title: "Verduisterende horren op maat | Duo plissé 2-in-1 | KMP Horren",
    description:
      "Eén plissésysteem met een verduisterend deel en een insectenhor in hetzelfde frame. 100% maatwerk, eigen productie NL, 3 jaar garantie.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verduisterende horren op maat — KMP Horren",
    description:
      "Eén plissésysteem met een verduisterend deel en een insectenhor in hetzelfde frame.",
  },
};

const usps = [
  { icon: Moon, title: "Verduisterend deel", description: "Houdt licht buiten wanneer u dat wilt, onafhankelijk te bedienen." },
  { icon: Bug, title: "Insectenhor", description: "Houdt insecten buiten zonder in te leveren op frisse lucht." },
  { icon: Check, title: "2-in-1 in één frame", description: "Beide functies in hetzelfde plissésysteem, apart te bedienen." },
  { icon: Award, title: "100% Maatwerk", description: "Op de millimeter op maat, geen standaardmaten." },
  { icon: Shield, title: "3 Jaar Garantie", description: "Op constructie en onderdelen." },
];

const faqs = [
  {
    category: "Verduisterend",
    question: "Wat is een duo plissé hor verduisterend?",
    answer:
      "Dit is één plissésysteem in een enkel frame met twee onafhankelijke delen: een verduisterend deel dat licht buitenhoudt en een insectenhor die insecten buitenhoudt. Beide delen bedient u apart van elkaar.",
  },
  {
    category: "Verduisterend",
    question: "Kan ik het verduisterende deel en de hor apart gebruiken?",
    answer:
      "Ja. De twee delen schuiven onafhankelijk van elkaar, zodat u bijvoorbeeld alleen verduistert zonder de hor te sluiten, of andersom.",
  },
  {
    category: "Verduisterend",
    question: "Kan ik een duo plissé hor op maat laten maken?",
    answer:
      "Ja. Ook dit product wordt op de millimeter op maat gemaakt in onze eigen productie in Nederland.",
  },
];

export default async function VerduisterendPage() {
  let products: Product[] = [];

  try {
    const dbProducts = await getVerduisterendProducts();
    products = dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      type: p.type,
      description: p.description,
      features: p.features || [],
      basePricePerM2: p.base_price_per_m2,
      minPrice: p.min_price,
      minWidthMm: p.min_width_mm,
      maxWidthMm: p.max_width_mm,
      minHeightMm: p.min_height_mm,
      maxHeightMm: p.max_height_mm,
      imageUrl: p.image_url,
      galleryUrls: p.gallery_urls || [],
      options: p.options || [],
      isActive: p.is_active,
      sortOrder: p.sort_order,
    }));
  } catch (error) {
    console.error("Error fetching verduisterend products from database:", error);
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <CategoryBreadcrumb categoryName="Verduisterend" categorySlug="verduisterend" />
      <ProductListSchema products={products} categoryName="Verduisterende horren op maat" />
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="bg-kmp-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/producten" className="hover:text-white transition-colors">Producten</Link>
            <ChevronRight size={14} />
            <span className="text-white">Verduisterend</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Verduisterende horren op maat
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
            Eén plissésysteem, twee functies in hetzelfde frame: een verduisterend deel en een insectenhor,
            onafhankelijk van elkaar te bedienen. Alles wordt op de millimeter op maat gemaakt, in onze eigen
            productie in Nederland, met 3 jaar garantie op constructie en onderdelen.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Product grid */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight">
                Onze verduisterende horren
              </h2>
              <p className="text-slate-500 mt-1">
                {products.length > 0 ? `${products.length} product(en) op maat` : "Binnenkort beschikbaar"}
              </p>
            </div>
          </div>
          {products.length > 0 ? (
            <ProductGrid products={products} columns={4} />
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
                Deze productlijn wordt op dit moment voorbereid. Neem{" "}
                <Link href="/contact" className="text-kmp-orange font-semibold hover:underline">
                  contact op
                </Link>{" "}
                voor de actuele status.
              </p>
            </div>
          )}
        </section>

        {/* Uitleg */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-8">
            Waarom een verduisterende hor van KMP Horren?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map((usp) => (
              <div key={usp.title} className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4">
                <div className="w-12 h-12 bg-kmp-orange/10 rounded-lg flex items-center justify-center shrink-0 text-kmp-orange">
                  <usp.icon size={24} />
                </div>
                <div>
                  <h3 className="font-black text-kmp-blue uppercase mb-1">{usp.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{usp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-8">
            Veelgestelde vragen over verduisterende horren
          </h2>
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="bg-white p-6 rounded-xl border border-slate-200 group"
              >
                <summary className="font-bold text-kmp-blue cursor-pointer flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <ChevronRight
                    size={20}
                    className="text-kmp-orange shrink-0 transition-transform group-open:rotate-90"
                  />
                </summary>
                <p className="text-slate-600 leading-relaxed mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-kmp-blue text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Verduisterende hor bestellen of inmeetservice aanvragen
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Wilt u meer weten over de verduisterende hor op maat? Vraag onze inmeetservice aan of neem contact
            op.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inmeetservice"
              className="inline-flex items-center justify-center gap-2 bg-kmp-orange hover:bg-kmp-orange/90 text-white font-semibold px-8 py-4 rounded-md transition-colors"
            >
              Inmeetservice aanvragen
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-md transition-colors"
            >
              Contact opnemen
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
