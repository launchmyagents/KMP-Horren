import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Ruler, Drill, PanelTop, Moon } from "lucide-react";
import { BASE_URL } from "@/lib/seo-config";
import { BreadcrumbSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Welke hor past bij u? | Vergelijk alle horren",
  description:
    "Vergelijk al onze horren op maat: geschikt raamtype, type gaas en montage. Zo kiest u snel de juiste hor voor uw raam of deur.",
  keywords: [
    "welke hor past bij mij",
    "hor vergelijken",
    "verschil tussen horren",
    "type gaas hor",
    "hor kiezen",
  ],
  alternates: {
    canonical: `${BASE_URL}/vergelijk`,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/vergelijk`,
    siteName: "KMP Horren",
    title: "Welke hor past bij u? | Vergelijk alle horren | KMP Horren",
    description:
      "Vergelijk al onze horren op maat: geschikt raamtype, type gaas en montage.",
  },
};

const rows = [
  {
    slug: "luxe-inzethor",
    name: "Luxe Inzethor",
    aka: "ook wel ‘vaste hor’ genoemd",
    situatie: "Draai-kiepraam, standaard raamopening",
    gaas: "Vlak gaas",
    montage: "Klemt vast in het kozijn, geen boren",
    vanaf: "€64",
  },
  {
    slug: "inzet-plisse-hor",
    name: "Inzet Plissé Hor",
    situatie: "Grote ramen, wilt u de hor niet altijd dicht hebben",
    gaas: "Geplisseerd gaas (harmonicavouw)",
    montage: "Vlak in het kozijn, schuift opzij",
    vanaf: "€100",
  },
  {
    slug: "voorzet-plisse-hor",
    name: "Voorzet Plissé Hor",
    aka: "zelfde werking en prijs als de Inzet Plissé Hor",
    situatie: "Te weinig ruimte aan de binnenzijde, afwijkend kozijn",
    gaas: "Geplisseerd gaas (harmonicavouw)",
    montage: "Aan de buitenzijde van het kozijn",
    vanaf: "€100",
  },
  {
    slug: "plisse-hor-dakraam",
    name: "Plissé Hor Dakraam",
    situatie: "Dakraam, compatibel met Velux en Fakro",
    gaas: "Plissé systeem, UV-bestendig gaas",
    montage: "Op maat gemaakt voor uw dakraam",
    vanaf: "€95",
  },
  {
    slug: "duo-plisse-hor-verduisterend",
    name: "Duo Plissé Hor Verduisterend",
    situatie: "Wilt u ook verduisteren, geschikt voor elk type raam, ook dakraam",
    gaas: "Geplisseerd gaas + verduisterend doek, in één frame",
    montage: "2-in-1: hor en verduistering onafhankelijk bedienbaar",
    vanaf: "€250",
  },
  {
    slug: "plisse-hordeur-enkel",
    name: "Plissé Hordeur (Enkel)",
    situatie: "Terras- of tuindeur, standaard deuropening",
    gaas: "Geplisseerd harmonicagaas",
    montage: "Schuift opzij, lage struikelvrije drempel",
    vanaf: "€215",
  },
  {
    slug: "plisse-hordeur-dubbel",
    name: "Plissé Hordeur (Dubbel)",
    situatie: "Brede of openslaande dubbele deuropening",
    gaas: "Geplisseerd harmonicagaas, twee delen",
    montage: "Sluit in het midden met magneetsluiting",
    vanaf: "€350",
  },
];

const beslisfactoren = [
  {
    icon: Drill,
    title: "Wilt u boren of niet?",
    description:
      "De Luxe Inzethor klemt zelf vast, zonder boren. De meeste andere horren worden vast gemonteerd in of op het kozijn.",
  },
  {
    icon: PanelTop,
    title: "Draaiend of vast raam?",
    description:
      "Bij een draai-kiepraam past een inzethor het beste. Bij een vast raam of een kozijn met weinig ruimte kijkt u naar de voorzet plissé hor.",
  },
  {
    icon: Ruler,
    title: "Ruimte in of op het kozijn?",
    description:
      "Past de hor niet aan de binnenzijde? Dan is een voorzet plissé hor, gemonteerd aan de buitenzijde van het kozijn, de oplossing.",
  },
  {
    icon: Moon,
    title: "Ook verduisteren?",
    description:
      "Wilt u naast insectenwering ook licht buitenhouden, bijvoorbeeld bij een dakraam? Dan is de duo plissé hor verduisterend de enige met beide functies in één frame.",
  },
];

export default function VergelijkPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Welke hor past bij u?", url: "/vergelijk" },
        ]}
      />

      {/* Hero */}
      <section className="bg-kmp-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white">Welke hor past bij u?</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Welke hor past bij u?
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
            Elk raam en elke deur is anders. Hieronder ziet u in één overzicht voor welke situatie elke hor
            geschikt is, welk type gaas erin zit en hoe hij gemonteerd wordt.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Beslisfactoren */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-8">
            Waar let u op bij het kiezen?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beslisfactoren.map((factor) => (
              <div key={factor.title} className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4">
                <div className="w-12 h-12 bg-kmp-orange/10 rounded-lg flex items-center justify-center shrink-0 text-kmp-orange">
                  <factor.icon size={24} />
                </div>
                <div>
                  <h3 className="font-black text-kmp-blue uppercase mb-1">{factor.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vergelijkingstabel */}
        <section>
          <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
            Alle horren op een rij
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Klik op een hor voor de productpagina, waar u deze ook meteen op maat kunt configureren.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full bg-white min-w-[800px]">
              <thead className="bg-kmp-blue text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-bold uppercase text-sm tracking-wider">Hor</th>
                  <th className="text-left px-6 py-4 font-bold uppercase text-sm tracking-wider">Geschikt voor</th>
                  <th className="text-left px-6 py-4 font-bold uppercase text-sm tracking-wider">Type gaas</th>
                  <th className="text-left px-6 py-4 font-bold uppercase text-sm tracking-wider">Montage</th>
                  <th className="text-left px-6 py-4 font-bold uppercase text-sm tracking-wider">Vanaf</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.slug} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4">
                      <Link
                        href={`/producten/${row.slug}`}
                        className="font-semibold text-kmp-blue hover:text-kmp-orange transition-colors"
                      >
                        {row.name}
                      </Link>
                      {row.aka && (
                        <div className="text-xs text-slate-400 mt-0.5">{row.aka}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{row.situatie}</td>
                    <td className="px-6 py-4 text-slate-700">{row.gaas}</td>
                    <td className="px-6 py-4 text-slate-700">{row.montage}</td>
                    <td className="px-6 py-4 font-semibold text-kmp-blue whitespace-nowrap">{row.vanaf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-kmp-blue text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Nog steeds twijfelt u?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Onze inmeetservice denkt graag met u mee en meet meteen nauwkeurig op, of neem contact op met een
            vraag over uw specifieke situatie.
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
