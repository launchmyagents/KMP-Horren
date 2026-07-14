import { Metadata } from "next";
import Image from "next/image";
import { Check, Ruler, Users, Calendar, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InmeetserviceBreadcrumb } from "@/components/seo";
import { InmeetserviceForm } from "@/components/inmeetservice";
import { TrackedTelLink } from "@/components/analytics/TrackedTelLink";
import { BASE_URL } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Inmeetservice | Professionele Metingen voor Perfecte Horren",
  description:
    "Professionele inmeetservice voor perfecte horren. Onze ervaren specialisten zorgen voor nauwkeurige metingen bij u thuis. ✓ Ervaren specialisten ✓ Perfecte pasvorm ✓ Door heel Nederland",
  keywords: [
    "inmeetservice",
    "horren opmeten",
    "professioneel inmeten",
    "maatwerk horren",
    "opmeten aan huis",
    "horren specialist",
    "inmeten ramen",
    "inmeten deuren",
  ],
  alternates: {
    canonical: `${BASE_URL}/inmeetservice`,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: `${BASE_URL}/inmeetservice`,
    siteName: "KMP Horren",
    title: "Inmeetservice - Professionele Metingen voor Perfecte Horren",
    description:
      "Professionele inmeetservice voor perfecte horren. Onze ervaren specialisten zorgen voor nauwkeurige metingen bij u thuis.",
    images: [
      {
        url: `${BASE_URL}/og-inmeetservice.jpg`,
        width: 1200,
        height: 630,
        alt: "KMP Horren Inmeetservice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inmeetservice - KMP Horren",
    description:
      "Professionele inmeetservice voor perfecte horren door ervaren specialisten.",
  },
};

const steps = [
  {
    number: 1,
    title: "Afspraak Maken",
    description: "Plan online of telefonisch een afspraak op een moment dat u uitkomt.",
  },
  {
    number: 2,
    title: "Inmeten aan Huis",
    description: "Onze specialist komt bij u langs en meet alle ramen en deuren nauwkeurig op.",
  },
  {
    number: 3,
    title: "Advies op Maat",
    description: "U ontvangt direct persoonlijk advies over de beste oplossing voor uw situatie.",
  },
];

const usps = [
  {
    icon: Ruler,
    title: "Nauwkeurige Metingen",
    description: "Tot op de millimeter nauwkeurig opmeten voor een perfecte pasvorm.",
  },
  {
    icon: Users,
    title: "Ervaren Specialisten",
    description: "Onze vakmensen hebben jarenlange ervaring in het inmeten van horren.",
  },
];

const faqs = [
  {
    question: "Wat kost de inmeetservice?",
    answer:
      "De inmeetservice is gratis bij bestellingen vanaf €500. Voor kleinere bestellingen rekenen wij een kleine vergoeding van €49. Deze wordt in mindering gebracht op uw bestelling.",
  },
  {
    question: "Hoe lang duurt een inmeetafspraak?",
    answer:
      "Een gemiddelde inmeetafspraak duurt 30 tot 60 minuten, afhankelijk van het aantal ramen en deuren dat opgemeten moet worden.",
  },
  {
    question: "In welke regio's zijn jullie actief?",
    answer:
      "Onze inmeetservice is beschikbaar door heel Nederland. Ook in België kunnen wij op aanvraag langskomen.",
  },
  {
    question: "Kan ik direct bestellen na het inmeten?",
    answer:
      "Ja, na het inmeten ontvangt u direct een offerte. U kunt ter plekke bestellen of rustig thuis nadenken. De offerte blijft 30 dagen geldig.",
  },
  {
    question: "Wat als mijn raam of deur een bijzondere vorm heeft?",
    answer:
      "Geen probleem! Onze specialisten hebben ervaring met alle soorten ramen en deuren, inclusief schuine, ronde en andere bijzondere vormen.",
  },
  {
    question: "Moet ik thuis zijn tijdens het inmeten?",
    answer:
      "Ja, wij vragen u thuis te zijn zodat u direct vragen kunt stellen en wij samen de beste oplossing kunnen bepalen.",
  },
];

export default function InmeetservicePage() {
  return (
    <div className="bg-white">
      <InmeetserviceBreadcrumb />
      
      {/* Hero Section */}
      <section className="bg-kmp-blue text-white py-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#1c263f] transform -skew-x-12 translate-x-20 hidden md:block" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
              Professionele Inmeetservice
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Professionele metingen voor perfecte horren, uitgevoerd door onze ervaren
              specialisten. Bij KMP Horren begrijpen we dat nauwkeurigheid essentieel
              is voor een perfecte pasvorm.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              {usps.map((usp) => (
                <div key={usp.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-kmp-orange/20 rounded-lg flex items-center justify-center">
                    <Check className="text-kmp-orange" size={20} />
                  </div>
                  <span className="font-semibold">{usp.title}</span>
                </div>
              ))}
            </div>
            <a href="#aanvraag-formulier">
              <Button
                size="lg"
                className="bg-kmp-orange hover:bg-kmp-orange/90 text-white"
              >
                <Calendar className="mr-2" size={20} />
                Afspraak Maken
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
              Hoe werkt het?
            </h2>
            <p className="text-slate-500">
              In drie eenvoudige stappen naar perfecte horren op maat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-slate-200" />
                )}
                <div className="relative bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="w-16 h-16 bg-kmp-orange text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="font-black text-xl text-kmp-blue uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="aanvraag-formulier" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <InmeetserviceForm />
          </div>
        </div>
      </section>

      {/* USP Section with more detail */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-6">
                Waarom onze Inmeetservice?
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Bij KMP Horren begrijpen we dat nauwkeurigheid essentieel is voor een
                perfecte pasvorm. Onze ervaren specialisten zorgen voor professionele
                metingen, zodat uw horren optimaal functioneren.
              </p>
              <div className="space-y-6">
                {usps.map((usp) => (
                  <div
                    key={usp.title}
                    className="flex gap-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
                  >
                    <div className="w-14 h-14 bg-kmp-orange/10 rounded-xl flex items-center justify-center text-kmp-orange shrink-0">
                      <usp.icon size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-kmp-blue uppercase mb-1">
                        {usp.title}
                      </h3>
                      <p className="text-slate-600 text-sm">{usp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/stefan4258_Een_professionele_monteur_van_KMP_Horren_die_met_e_5d229603-901f-4430-91cb-7413ff5cf50f_0.png"
                alt="KMP Horren specialist die nauwkeurig een raam opmeet"
                width={600}
                height={600}
                className="object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-kmp-blue uppercase tracking-tight mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-slate-500">
              Antwoorden op veelgestelde vragen over onze inmeetservice.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-kmp-blue text-lg hover:bg-slate-50 transition-colors">
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown className="text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-kmp-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Plan uw afspraak vandaag nog
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Maak een afspraak voor onze inmeetservice en ontdek de perfecte horren
            voor uw ramen en deuren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#aanvraag-formulier">
              <Button
                size="lg"
                className="bg-kmp-orange hover:bg-kmp-orange/90 text-white min-w-[200px]"
              >
                <Calendar className="mr-2" size={20} />
                Afspraak Maken
              </Button>
            </a>
            <TrackedTelLink href="tel:0643065041" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <Phone size={20} />
              <span className="font-semibold">0643065041</span>
            </TrackedTelLink>
          </div>
        </div>
      </section>
    </div>
  );
}
