import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, Award, Factory, Shield, Truck, Headphones } from "lucide-react";
import { ProductGrid } from "@/components/products";
import { getProductsByType, VERDUISTEREND_SLUGS } from "@/data/products";
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
  title: "Raamhorren op maat | Inzet-, plissé- & voorzet plissé hor",
  description:
    "Raamhorren op maat: inzet-, plissé-, voorzet plissé- en dakraamhor. 100% maatwerk, eigen productie NL, 3 jaar garantie. Bestel online of vraag de inmeetservice aan.",
  keywords: [
    "raamhor",
    "raamhorren",
    "hor raam",
    "hor voor raam",
    "raamhor op maat",
    "raamhorren op maat",
    "raam horren",
    "insectenwering",
  ],
  alternates: {
    canonical: `${BASE_URL}/producten/raamhorren`,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/producten/raamhorren`,
    siteName: "KMP Horren",
    title: "Raamhorren op maat | Inzet-, plissé- & voorzet plissé hor | KMP Horren",
    description:
      "Raamhorren op maat: inzet-, plissé-, voorzet- en dakraamhor. 100% maatwerk, eigen productie NL, 3 jaar garantie.",
    images: [
      {
        url: `${BASE_URL}/images/raamhorren-category.png`,
        width: 1200,
        height: 630,
        alt: "Raamhorren op maat — KMP Horren",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raamhorren op maat — KMP Horren",
    description:
      "Raamhorren op maat: inzet-, plissé-, voorzet- en dakraamhor. 100% maatwerk uit eigen productie.",
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
    category: "Raamhorren",
    question: "Welke raamhor is geschikt voor een draai-kiepraam?",
    answer:
      "Voor een draai-kiepraam is een inzethor of plissé inzethor meestal de beste keuze: deze plaatst u vlak in het kozijn zonder de werking van het raam te belemmeren.",
  },
  {
    category: "Raamhorren",
    question: "Wat is het verschil tussen een inzethor en een plissé inzethor?",
    answer:
      "Een inzethor zit vast in het kozijn en houdt insecten altijd buiten. Een plissé inzethor heeft hetzelfde strakke plaatsing, maar het gaas schuift als een harmonica opzij, zodat u de hor alleen sluit wanneer u dat wilt.",
  },
  {
    category: "Raamhorren",
    question: "Wat is het verschil tussen een inzethor en een voorzet plissé hor?",
    answer:
      "Een inzethor wordt vlak in het kozijn geplaatst; een voorzet plissé hor komt aan de buitenzijde van het kozijn. Dat laatste is de oplossing wanneer er aan de binnenzijde te weinig ruimte is of het kozijn een afwijkende vorm heeft.",
  },
  {
    category: "Raamhorren",
    question: "Kan ik een raamhor op maat laten maken?",
    answer:
      "Ja. Alle raamhorren van KMP Horren worden op de millimeter op maat gemaakt in onze eigen productie in Nederland. U meet zelf op of u maakt gebruik van onze inmeetservice.",
  },
  {
    category: "Raamhorren",
    question: "Wat is de levertijd van een raamhor op maat?",
    answer:
      "De levertijd is 10–15 werkdagen. Verzending is gratis bij bestellingen vanaf €250.",
  },
  {
    category: "Raamhorren",
    question: "Is er een hor voor een dakraam (bijv. Velux)?",
    answer:
      "Ja, wij leveren een plissé hor speciaal voor dakramen, op maat gemaakt en compatibel met Velux en Fakro.",
  },
];

const productTypes = [
  {
    slug: "luxe-inzethor",
    name: "Inzethor",
    subtitle: "Meestgekozen, vlak in het kozijn",
    description:
      "Onze meestgekozen raamhor. Wordt vlak in het kozijn geplaatst, valt nauwelijks op en houdt insecten effectief buiten. Ideaal voor draai-kiepramen en de meeste standaard raamopeningen.",
  },
  {
    slug: "inzet-plisse-hor",
    name: "Plissé inzethor",
    subtitle: "Bedienbaar, schuift opzij",
    description:
      "Combineert het strakke uiterlijk van een inzethor met de bedienbaarheid van plisségaas. Het gaas schuift als een harmonica opzij, zodat u de hor alleen sluit wanneer u dat wilt.",
  },
  {
    slug: "voorzet-plisse-hor",
    name: "Voorzet plissé hor",
    subtitle: "Aan de buitenzijde van het kozijn",
    description:
      "Wordt aan de buitenzijde van het kozijn gemonteerd, met geplisseerd gaas. Handig wanneer er aan de binnenzijde te weinig ruimte is of bij afwijkende kozijnen.",
  },
  {
    slug: "plisse-hor-dakraam",
    name: "Plissé hor voor dakraam",
    subtitle: "Speciaal voor dakramen, Velux en Fakro",
    description:
      "Ook uw dakraam houdt u eenvoudig insectvrij. Op maat gemaakt en bedienbaar, compatibel met Velux en Fakro.",
  },
];

const decisionTable = [
  { situation: "Draai-kiepraam / kantelraam", recommended: "Inzethor of plissé inzethor" },
  { situation: "Vast raam", recommended: "Inzethor (ook wel 'vaste hor' genoemd)" },
  { situation: "Te weinig ruimte aan binnenzijde", recommended: "Voorzet plissé hor" },
  { situation: "Dakraam", recommended: "Plissé hor voor dakraam" },
];

export default async function RaamhorrenPage() {
  let windowProducts: Product[] = [];

  try {
    const dbWindowProducts = (await getDbProductsByType("WINDOW")).filter(
      (p) => !VERDUISTEREND_SLUGS.includes(p.slug)
    );
    if (dbWindowProducts.length > 0) {
      windowProducts = dbWindowProducts.map((p) => ({
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
      windowProducts = getProductsByType("WINDOW");
    }
  } catch (error) {
    console.error("Error fetching window products from database:", error);
    windowProducts = getProductsByType("WINDOW");
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <CategoryBreadcrumb categoryName="Raamhorren" categorySlug="raamhorren" />
      <ProductListSchema products={windowProducts} categoryName="Raamhorren op maat" />
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="bg-kmp-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/producten" className="hover:text-white transition-colors">Producten</Link>
            <ChevronRight size={14} />
            <span className="text-white">Raamhorren</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Raamhorren op maat
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
            Bij KMP Horren maken wij raamhorren voor elk raam: van de inzethor en plissé inzethor tot de
            voorzet plissé hor en de hor voor uw dakraam. Alles wordt op de millimeter op maat gemaakt, in onze
            eigen productie in Nederland. Elke raamhor heeft een premium aluminium frame met UV-bestendig gaas en
            3 jaar garantie op constructie en onderdelen.
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
            Twijfelt u welke raamhor bij u past? Bekijk het volledige vergelijkingsoverzicht
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
                Onze raamhorren
              </h2>
              <p className="text-slate-500 mt-1">{windowProducts.length} producten op maat</p>
            </div>
          </div>
          <ProductGrid products={windowProducts} columns={4} />
        </section>

        {/* Types section */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
            Welke soorten raamhorren zijn er?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl">
            De juiste raamhor hangt af van het type raam, het kozijnmateriaal en of u wilt boren. Wij leveren
            alle gangbare typen in maatwerk.
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
            Welke raamhor past bij mijn raam?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Kort gezegd: voor een draai-kiepraam kiest u meestal een inzethor of plissé inzethor, voor een vast
            raam de inzethor als vaste hor, en bij te weinig ruimte aan de binnenzijde een voorzet plissé hor.
            De onderstaande tabel helpt u verder.
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full bg-white">
              <thead className="bg-kmp-blue text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-bold uppercase text-sm tracking-wider">Uw raamsituatie</th>
                  <th className="text-left px-6 py-4 font-bold uppercase text-sm tracking-wider">Aanbevolen raamhor</th>
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
            Het kozijnmateriaal — kunststof, hout of aluminium — bepaalt mede of er geboord wordt of geklemd.
            Twijfelt u? Als familiebedrijf met ruim 10 jaar ervaring adviseren wij u graag persoonlijk via onze{" "}
            <Link href="/inmeetservice" className="text-kmp-orange font-semibold hover:underline">inmeetservice</Link>{" "}
            of{" "}
            <Link href="/contact" className="text-kmp-orange font-semibold hover:underline">het contactformulier</Link>.
          </p>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
            Raamhor op maat laten maken — zo werkt het
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6 max-w-3xl">
            Elke raamhor wordt op de millimeter op maat geproduceerd op basis van uw eigen maten. Zo sluit de hor
            naadloos aan op het kozijn en houdt u insecten buiten zonder kieren.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-black text-lg text-kmp-blue uppercase mb-2">Zelf opmeten of inmeetservice</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                U kunt zelf opmeten aan de hand van onze meetinstructie. Liever zekerheid?{" "}
                <Link href="/inmeetservice" className="text-kmp-orange font-semibold hover:underline">
                  Vraag onze inmeetservice aan
                </Link>{" "}
                — wij komen langs en meten alles nauwkeurig in.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-black text-lg text-kmp-blue uppercase mb-2">Levertijd 10–15 werkdagen</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Omdat elke raamhor in eigen beheer in Nederland wordt gemaakt, is de levertijd 10–15 werkdagen.
                Bestellingen vanaf €250 worden gratis verzonden.
              </p>
            </div>
          </div>
        </section>

        {/* USPs */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-8">
            Waarom een raamhor van KMP Horren?
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
            Veelgestelde vragen over raamhorren
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
            Raamhorren bestellen of inmeetservice aanvragen
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Klaar om uw ramen insectvrij te maken zonder in te leveren op licht en frisse lucht? Bestel uw
            raamhor op maat direct online, of vraag onze inmeetservice aan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inmeetservice"
              className="inline-flex items-center justify-center gap-2 bg-kmp-orange hover:bg-kmp-orange/90 text-white font-semibold px-8 py-4 rounded-md transition-colors"
            >
              Inmeetservice aanvragen
            </Link>
            <Link
              href="/producten/deurhorren"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white hover:text-kmp-blue text-white font-semibold px-8 py-4 rounded-md transition-colors"
            >
              Bekijk ook hordeuren
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
