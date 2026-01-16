import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Factory, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Over Ons",
  description:
    "Leer meer over KMP Horren - Al meer dan 20 jaar de specialist in maatwerk insectenwering uit Nederland.",
};

const milestones = [
  { year: "2003", title: "Oprichting", description: "Start van KMP Horren als familiebedrijf" },
  { year: "2008", title: "Eigen Fabriek", description: "Verhuizing naar eigen productiefaciliteit" },
  { year: "2015", title: "Online Configurator", description: "Lancering van onze eerste online tool" },
  { year: "2020", title: "Landelijke Dekking", description: "Inmeetservice door heel Nederland" },
  { year: "2024", title: "AI-Innovatie", description: "Introductie van AI-gestuurde productadvies" },
];

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
      {/* Hero */}
      <section className="bg-kmp-blue text-white py-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#1c263f] transform -skew-x-12 translate-x-20 hidden md:block" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
            Over KMP Horren
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Al meer dan 20 jaar de specialist in maatwerk insectenwering. 
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
                  KMP Horren is in 2003 opgericht als klein familiebedrijf met een grote droom: 
                  de beste maatwerk horren van Nederland maken. Wat begon in een kleine werkplaats 
                  is uitgegroeid tot een moderne productiefaciliteit waar dagelijks tientallen 
                  horren op maat worden gemaakt.
                </p>
                <p>
                  Onze filosofie is eenvoudig: wij geloven dat iedereen recht heeft op horren 
                  die perfect passen. Geen standaardmaten, maar maatwerk tot op de millimeter. 
                  Geen compromissen op kwaliteit, maar alleen de beste materialen.
                </p>
                <p>
                  Vandaag de dag zijn wij trots op ons team van vakkundige medewerkers, 
                  onze moderne productieprocessen en de duizenden tevreden klanten door heel 
                  Nederland en België.
                </p>
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-4xl font-black text-kmp-orange">20+</div>
                  <div className="text-sm text-slate-500 uppercase font-semibold">Jaar ervaring</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-kmp-orange">50.000+</div>
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
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
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

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
              Onze Geschiedenis
            </h2>
            <p className="text-slate-500">
              Van kleine werkplaats tot moderne productiefaciliteit.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="flex gap-8 mb-8 last:mb-0">
                <div className="w-24 shrink-0 text-right">
                  <span className="text-2xl font-black text-kmp-orange">
                    {milestone.year}
                  </span>
                </div>
                <div className="relative pb-8 border-l-2 border-slate-200 pl-8">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-kmp-orange rounded-full -translate-x-[9px]" />
                  <h3 className="font-bold text-kmp-blue text-lg mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-slate-600">{milestone.description}</p>
                </div>
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
                className="text-white border-white hover:bg-white hover:text-kmp-blue"
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
