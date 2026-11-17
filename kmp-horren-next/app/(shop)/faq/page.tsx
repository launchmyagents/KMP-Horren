"use client";

import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFAQsByCategory } from "@/data/faqs";
import { trackEvent } from "@/lib/analytics";

export default function FAQPage() {
  const categorizedFAQs = getFAQsByCategory();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-kmp-blue text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Veelgestelde Vragen
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Antwoorden op de meest voorkomende vragen over onze horren, het
            inmeten en de levering.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">
        {categorizedFAQs.map((category, catIndex) => (
          <div key={category.category} className="mb-12">
            <h2 className="text-xl font-black text-kmp-blue uppercase mb-6 flex items-center gap-3 border-b border-slate-200 pb-2">
              <span className="text-kmp-orange">#</span> {category.category}
            </h2>
            <div className="space-y-4">
              {category.faqs.map((faq, faqIndex) => (
                <details
                  key={`${catIndex}-${faqIndex}`}
                  open={catIndex === 0 && faqIndex === 0}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <summary className="w-full flex justify-between items-center p-6 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="font-bold text-kmp-blue text-lg pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className="text-slate-400 shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:text-kmp-orange"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Contact CTA */}
        <div className="bg-kmp-blue/5 border border-kmp-blue/10 rounded-xl p-8 text-center mt-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-kmp-orange shadow-sm mx-auto mb-4">
            <HelpCircle size={32} />
          </div>
          <h3 className="font-black text-xl text-kmp-blue uppercase mb-2">
            Staat uw vraag er niet tussen?
          </h3>
          <p className="text-slate-600 mb-6">
            Neem contact op met onze klantenservice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-kmp-orange hover:bg-kmp-orange/90">
                Contact Opnemen
              </Button>
            </Link>
            <a
              href="tel:+31643065041"
              onClick={() => trackEvent("tel_click", { link_url: "tel:+31643065041" })}
            >
              <Button variant="outline">
                Bel +31 6 43 06 50 41
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
