import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Factory, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutBreadcrumb, OrganizationSchema } from "@/components/seo";
import { BASE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Over Ons | Specialist in Maatwerk Horren",
  description:
    "Leer meer over KMP Horren - De specialist in maatwerk insectenwering uit Nederland. ✓ Eigen fabriek ✓ Nederlands vakmanschap ✓ Persoonlijke service",
  keywords: [
    "over kmp horren",
    "horren fabriek",
    "nederlands fabricaat",
    "maatwerk horren",
    "insectenwering specialist",
  ],
  alternates: {
    canonical: `${BASE_URL}/over-ons`,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/over-ons`,
    siteName: "KMP Horren",
    title: "Over Ons - KMP Horren",
    description:
      "De specialist in maatwerk insectenwering uit Nederland.",
    images: [
      {
        url: `${BASE_URL}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: "Over KMP Horren",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Over Ons - KMP Horren",
    description:
      "De specialist in maatwerk insectenwering uit Nederland.",
  },
};

const values = [
  {
    icon: Award,
    title: "Kwaliteit",
    description: "Wij gebruiken alleen de beste materialen en produceren alles in onze eigen fabriek.",
  },
  {
    icon: Users,
    title: "Klantgericht",
    description: "Persoonlijk advies en service staan bij ons centraal. Elke klant is uniek.",
  },
  {
    icon: Factory,
    title: "Nederlands Fabricaat",
    description: "Trots geproduceerd in Nederland. Korte lijnen, snelle levering, lokale werkgelegenheid.",
  },
  {
    icon: Heart,
    title: "Passie",
    description: "Met passie en vakmanschap maken wij maatwerk horren van Nederlandse kwaliteit.",
  },
];

export default function OverOnsPage() {
  return (
    <div className="bg-white">
      <AboutBreadcrumb />
      <OrganizationSchema />
      {/* Hero */}
      <section className="bg-kmp-blue text-white py-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#1c263f] transform -skew-x-12 translate-x-20 hidden md:block" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
            Over KMP Horren
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            De specialist in maatwerk insectenwering.
            Sinds 2017 actief in kunststof kozijnen en horren op maat.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-6">
                Ons Verhaal – Vakmanschap Tot In Het Kleinste Detail
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Ons verhaal begint met een passie voor perfect afgewerkte woningen. Niet alleen met mooie kozijnen, maar met alles wat bijdraagt aan comfort, uitstraling en gebruiksgemak. Vanuit diezelfde passie zijn wij ons steeds verder gaan specialiseren in het fabriceren en monteren van hoogwaardige insectenhorren.
                </p>
                <p>
                  Met jarenlange ervaring in de montagewereld weten we als geen ander hoe belangrijk maatwerk is. Geen raam is hetzelfde, geen situatie identiek. Daarom produceren wij onze horren volledig op maat, met oog voor detail, duurzaamheid en een strakke afwerking die naadloos aansluit op het kozijn. Of het nu gaat om nieuwbouw of renovatie, wij zorgen ervoor dat alles klopt.
                </p>
                <p>
                  Bij KMP Horren geloven we dat kwaliteit zit in de combinatie van vakmanschap en betrouwbaarheid. We begeleiden het volledige traject: van inmeten en adviseren tot het vakkundig monteren van de horren. Onze monteurs werken nauwkeurig, netjes en met respect voor de woning van de klant.
                </p>
                <p>
                  Wat ons onderscheidt, is onze manier van samenwerken. We denken mee, communiceren helder en doen wat we beloven. Geen standaardoplossingen, maar maatwerk dat past bij de woning én bij de wensen van de bewoner. Zo leveren we niet alleen perfect functionerende insectenhorren, maar ook rust, comfort en jarenlang woonplezier.
                </p>
                <p>
                  Bij KMP Horren bouwen we niet alleen aan producten. We bouwen aan duurzame relaties en oplossingen waar u op kunt vertrouwen.
                </p>
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-4xl font-black text-kmp-orange">9+</div>
                  <div className="text-sm text-slate-500 uppercase font-semibold">Jaar ervaring</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-kmp-orange">500+</div>
                  <div className="text-sm text-slate-500 uppercase font-semibold">Tevreden klanten</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-kmp-orange">100%</div>
                  <div className="text-sm text-slate-500 uppercase font-semibold">Nederlands</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/KMP.jpg"
                alt="KMP Horren productie"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
              Onze Waarden
            </h2>
            <p className="text-slate-500">
              Waar wij voor staan en wat ons drijft om elke dag het beste te geven.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="w-14 h-14 bg-kmp-orange/10 rounded-xl flex items-center justify-center text-kmp-orange mb-6">
                  <value.icon size={28} />
                </div>
                <h3 className="font-black text-xl text-kmp-blue uppercase mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-kmp-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
            Klaar om kennis te maken?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Neem contact met ons op voor persoonlijk advies of start direct met 
            het configureren van uw maatwerk horren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/producten">
              <Button
                size="lg"
                className="bg-kmp-orange hover:bg-kmp-orange/90 text-white"
              >
                Bekijk Producten
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white hover:bg-white hover:text-kmp-blue"
              >
                Neem Contact Op
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
