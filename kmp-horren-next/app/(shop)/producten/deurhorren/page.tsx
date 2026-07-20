import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Award, Factory, Shield, Truck, Headphones } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { getProductsByType } from "@/data/products";
import { getProductsByType as getDbProductsByType } from "@/lib/supabase/database";
import {
  CategoryBreadcrumb,
  ProductListSchema,
  FAQSchema,
} from "@/components/seo";
import { Product } from "@/types";

export const revalidate = 60;

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

export const metadata: Metadata = {
  title: "Hordeuren op maat | Plissé hordeur enkel & dubbel",
  description:
    "Hordeuren op maat: plissé hordeur enkel en dubbel. 100% maatwerk, eigen productie NL, 3 jaar garantie. Bestel online of vraag de inmeetservice aan.",
  keywords: [
    "hordeur",
    "hordeuren",
    "deurhor",
    "hor deur",
    "hordeur op maat",
    "hordeuren op maat",
    "deurhorren",
    "insectenwering",
  ],
  alternates: {
    canonical: `${BASE_URL}/producten/deurhorren`,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/producten/deurhorren`,
    siteName: "KMP Horren",
    title: "Hordeuren op maat | Plissé hordeur enkel & dubbel | KMP Horren",
    description:
      "Hordeuren op maat: plissé hordeur enkel en dubbel. 100% maatwerk, eigen productie NL, 3 jaar garantie.",
    images: [
      {
        url: `${BASE_URL}/images/deurhorren-category.png`,
        width: 1200,
        height: 630,
        alt: "Hordeuren op maat — KMP Horren",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hordeuren op maat — KMP Horren",
    description:
      "Hordeuren op maat: plissé hordeur enkel en dubbel. 100% maatwerk uit eigen productie.",
  },
};

const usps = [
  { icon: Check, title: "100% Maatwerk", description: "Op de millimeter op maat, geen standaardmaten." },
  { icon: Factory, title: "Eigen Productie", description: "Volledig zelf gemaakt in Nederland." },
  { icon: Award, title: "Premium Aluminium", description: "Vormvast, kleurecht en UV-bestendig gaas." },
  { icon: Shield, title: "3 Jaar Garantie", description: "Op constructie en onderdelen." },
  { icon: Truck, title: "Gratis Verzending", description: "Bij bestellingen vanaf €250 in NL/BE." },
  { icon: Headphones, title: "Persoonlijk Advies", description: "10+ jaar ervaring als familiebedrijf." },
];

const faqs = [
  {
    category: "Hordeuren",
    question: "Welke hordeur is het meest geschikt voor een terrasdeur?",
    answer:
      "Voor de meeste terras- en tuindeuren is een plissé hordeur de beste keuze: hij neemt weinig ruimte in, is aan beide kanten te openen en heeft een vlakke, struikelvrije onderdrempel.",
  },
  {
    category: "Hordeuren",
    question: "Wat is het verschil tussen een enkele en een dubbele plissé hordeur?",
    answer:
      "De enkele plissé hordeur is onze meestgekozen oplossing voor een standaard deuropening. Bij een brede opening of openslaande dubbele deuren kiest u de dubbele uitvoering: twee plissédelen die vanuit het midden naar beide zijden openen.",
  },
  {
    category: "Hordeuren",
    question: "Kan ik een hordeur op maat laten maken?",
    answer:
      "Ja. Alle hordeuren van KMP Horren worden op de millimeter op maat gemaakt in onze eigen productie in Nederland. U meet zelf op of u maakt gebruik van onze inmeetservice.",
  },
  {
    category: "Hordeuren",
    question: "Wat is de levertijd van een hordeur op maat?",
    answer:
      "De levertijd is 10–15 werkdagen. Verzending is gratis bij bestellingen vanaf €250.",
  },
  {
    category: "Hordeuren",
    question: "Hoeveel garantie zit er op een hordeur?",
    answer:
      "KMP Horren geeft 3 jaar garantie op de constructie en onderdelen.",
  },
  {
    category: "Hordeuren",
    question: "Is een hordeur geschikt voor dubbele (openslaande) deuren?",
    answer:
      "Ja, voor dubbele deuren leveren wij de dubbele plissé hordeur, op maat gemaakt voor brede openingen.",
  },
];

const productTypes = [
  {
    slug: "plisse-hordeur-enkel",
    name: "Plissé hordeur (enkel)",
    subtitle: "Meestgekozen, harmonicagaas",
    description:
      "Onze meestgekozen oplossing. Het gaas vouwt als een harmonica opzij en neemt weinig ruimte in — bijzonder geschikt voor plekken met veel doorloop, zoals een terras- of tuindeur. Kind- en huisdiervriendelijk, met een nagenoeg struikelvrije drempel.",
  },
  {
    slug: "plisse-hordeur-dubbel",
    name: "Plissé hordeur (dubbel)",
    subtitle: "Voor brede openingen en openslaande deuren",
    description:
      "Voor brede openingen en openslaande dubbele deuren. Twee plissédelen die in het midden sluiten, vanuit het midden te openen naar beide zijden.",
  },
];

const decisionTable = [
  { situation: "Terrasdeur / balkondeur (veel doorloop)", recommended: "Plissé hordeur (enkel)" },
  { situation: "Tuindeur / brede of openslaande dubbele deuren", recommended: "Plissé hordeur (dubbel)" },
];

export default async function DeurhorrenPage() {
  let doorProducts: Product[] = [];

  try {
    const dbDoorProducts = await getDbProductsByType("DOOR");
    if (dbDoorProducts.length > 0) {
      doorProducts = dbDoorProducts.map((p) => ({
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
    } else {
      doorProducts = getProductsByType("DOOR");
    }
  } catch (error) {
    console.error("Error fetching door products from database:", error);
    doorProducts = getProductsByType("DOOR");
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <CategoryBreadcrumb categoryName="Deurhorren" categorySlug="deurhorren" />
      <ProductListSchema products={doorProducts} categoryName="Hordeuren op maat" />
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="bg-kmp-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/producten" className="hover:text-white transition-colors">Producten</Link>
            <ChevronRight size={14} />
            <span className="text-white">Deurhorren</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Hordeuren op maat
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
            Bij KMP Horren maken wij de plissé hordeur voor elke deur: enkel voor een standaard deuropening,
            dubbel voor een brede of openslaande opening. Alles wordt op de millimeter op maat gemaakt, in onze
            eigen productie in Nederland. Elke hordeur krijgt een premium aluminium frame met UV-bestendig gaas
            en 3 jaar garantie op constructie en onderdelen.
          </p>
        </div>
      </section>

      {/* Vergelijk-link */}
      <div className="bg-kmp-orange/5 border-b border-kmp-orange/10">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="/vergelijk"
            className="text-sm font-semibold text-kmp-orange hover:underline inline-flex items-center gap-1"
          >
            Twijfelt u welke hordeur bij u past? Bekijk het volledige vergelijkingsoverzicht
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Product grid */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight">
                Onze hordeuren
              </h2>
              <p className="text-slate-500 mt-1">{doorProducts.length} producten op maat</p>
            </div>
          </div>
          <ProductGrid products={doorProducts} columns={4} />
        </section>

        {/* Types section */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
            Welke soorten hordeuren zijn er?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Een hordeur is geen standaardproduct. De juiste keuze hangt vooral af van de breedte van uw
            deuropening. Wij leveren de plissé hordeur in een enkele en een dubbele uitvoering, allebei in
            maatwerk.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productTypes.map((type) => (
              <Link
                key={type.slug}
                href={`/producten/${type.slug}`}
                className="group block bg-white p-6 rounded-xl border border-slate-200 hover:border-kmp-orange/40 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-black text-kmp-blue uppercase mb-1 group-hover:text-kmp-orange transition-colors">
                  {type.name}
                </h3>
                <p className="text-sm text-kmp-orange font-semibold mb-3">{type.subtitle}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{type.description}</p>
                <span className="inline-flex items-center mt-4 text-kmp-orange font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Bekijk dit type <ChevronRight size={16} className="ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Decision table */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
            Welke hordeur past bij mijn deur?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Kort gezegd: voor de meeste terras- en tuindeuren kiest u een plissé hordeur, enkel bij een
            standaard deuropening en dubbel bij een brede of openslaande opening. De onderstaande tabel helpt
            u snel op weg.
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full bg-white">
              <thead className="bg-kmp-blue text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-bold uppercase text-sm tracking-wider">Uw deursituatie</th>
                  <th className="text-left px-6 py-4 font-bold uppercase text-sm tracking-wider">Aanbevolen hordeur</th>
                </tr>
              </thead>
              <tbody>
                {decisionTable.map((row, i) => (
                  <tr key={row.situation} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4 text-slate-700">{row.situation}</td>
                    <td className="px-6 py-4 font-semibold text-kmp-blue">{row.recommended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 leading-relaxed mt-6 max-w-3xl">
            Twijfelt u over de juiste keuze? Als familiebedrijf met ruim 10 jaar ervaring denken wij graag met
            u mee — via onze{" "}
            <Link href="/inmeetservice" className="text-kmp-orange font-semibold hover:underline">inmeetservice</Link>{" "}
            of{" "}
            <Link href="/contact" className="text-kmp-orange font-semibold hover:underline">het contactformulier</Link>.
          </p>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
            Hordeur op maat laten maken — zo werkt het
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6 max-w-3xl">
            Elke hordeur die wij maken, wordt op de millimeter op maat geproduceerd op basis van uw eigen
            maten. Zo sluit de deur perfect aan en houdt u insecten buiten zonder kieren.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-black text-lg text-kmp-blue uppercase mb-2">Zelf opmeten of inmeetservice</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                U kunt zelf opmeten aan de hand van onze duidelijke meetinstructie. Wilt u zekerheid?{" "}
                <Link href="/inmeetservice" className="text-kmp-orange font-semibold hover:underline">
                  Vraag onze inmeetservice aan
                </Link>{" "}
                — wij komen langs en meten alles nauwkeurig in.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-black text-lg text-kmp-blue uppercase mb-2">Levertijd 10–15 werkdagen</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Omdat elke hordeur in eigen beheer in Nederland wordt gemaakt, is de levertijd 10–15 werkdagen.
                Bestellingen vanaf €250 worden gratis verzonden.
              </p>
            </div>
          </div>
        </section>

        {/* USPs */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-8">
            Waarom een hordeur van KMP Horren?
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
            Veelgestelde vragen over hordeuren
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
            Hordeuren bestellen of inmeetservice aanvragen
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Klaar om insecten buiten te houden zonder in te leveren op uitzicht of frisse lucht? Bestel uw
            hordeur op maat direct online, of vraag onze inmeetservice aan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inmeetservice"
              className="inline-flex items-center justify-center gap-2 bg-kmp-orange hover:bg-kmp-orange/90 text-white font-semibold px-8 py-4 rounded-md transition-colors"
            >
              Inmeetservice aanvragen
            </Link>
            <Link
              href="/producten/raamhorren"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white hover:text-kmp-blue text-white font-semibold px-8 py-4 rounded-md transition-colors"
            >
              Bekijk ook raamhorren
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
