import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Factory, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutBreadcrumb, OrganizationSchema } from "@/components/seo";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

export const metadata: Metadata = {
  title: "Over Ons - KMP Horren | Al 20+ Jaar Specialist in Maatwerk Horren",
  description:
    "Leer meer over KMP Horren - De specialist in maatwerk insectenwering uit Nederland. ✓ Eigen fabriek ✓ Nederlands vakmanschap ✓ Persoonlijke service",
  keywords: [
    "over kmp horren",
    "horren fabriek",
    "nederlands fabricaat",
    "maatwerk horren",
    "familiebedrijf",
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
    description: "Met passie en vakmanschap maken wij al meer dan 20 jaar de beste horren.",
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
            Een familiebedrijf met passie voor kwaliteit en vakmanschap.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-6">
                Ons Verhaal
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Ons verhaal begint met een passie voor het transformeren van woningen door middel van prachtige kozijnen. Met jarenlange ervaring in de branche hebben we een diepgaand begrip ontwikkeld van de subtiele nuances en technieken die betrokken zijn bij kozijn montage. Of het nu gaat om renovatieprojecten die historische charme behouden of nieuwbouwprojecten die moderne esthetiek omarmen, ons deskundige team staat klaar om uw visie werkelijkheid te maken.
                </p>
                <p>
                  Bij Kozijn Montage Partners streven we ernaar om meer te zijn dan alleen een serviceprovider. We zijn uw partner gedurende het hele proces, van concept tot voltooiing. Onze toewijding aan klanttevredenheid drijft ons om voortdurend te streven naar uitmuntendheid, met aandacht voor detail en een focus op het leveren van resultaten die uw verwachtingen overtreffen.
                </p>
                <p>
                  We geloven in open communicatie, transparantie en eerlijkheid in alles wat we doen. Ons team staat klaar om naar uw ideeën te luisteren, uw vragen te beantwoorden en samen met u een plan te ontwikkelen dat aan al uw behoeften voldoet. We zijn er trots op dat we niet alleen prachtige kozijnen creëren, maar ook langdurige relaties opbouwen met onze gewaardeerde klanten.
                </p>
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-4xl font-black text-kmp-orange">10+</div>
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
