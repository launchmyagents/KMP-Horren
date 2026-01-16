"use client";

import { motion } from "framer-motion";
import { Check, Star, ShieldCheck, Truck, Factory, Headphones } from "lucide-react";

const usps = [
  {
    icon: Check,
    title: "100% Maatwerk",
    description:
      "Geen standaardmaten, maar tot op de millimeter nauwkeurig geproduceerd in onze eigen Nederlandse fabriek.",
  },
  {
    icon: Star,
    title: "Premium Kwaliteit",
    description:
      "Wij gebruiken uitsluitend hoogwaardig aluminium en UV-bestendig gaas voor een jarenlange levensduur.",
  },
  {
    icon: ShieldCheck,
    title: "3 Jaar Garantie",
    description:
      "Volledige garantie op constructie en onderdelen. Bij problemen staan wij direct voor u klaar.",
  },
  {
    icon: Truck,
    title: "Gratis Verzending",
    description:
      "Bij bestellingen vanaf €250,- verzenden wij gratis door heel Nederland en België.",
  },
  {
    icon: Factory,
    title: "Eigen Productie",
    description:
      "Alles wordt geproduceerd in onze eigen fabriek in Nederland. Korte lijnen, snelle levering.",
  },
  {
    icon: Headphones,
    title: "Persoonlijk Advies",
    description:
      "Twijfelt u? Onze specialisten helpen u graag bij het kiezen van de juiste hor voor uw situatie.",
  },
];

export function USPSection() {
  return (
    <section className="bg-slate-50 py-24 border-y border-slate-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-black text-kmp-blue uppercase tracking-tight mb-4">
            Waarom KMP Horren?
          </h2>
          <p className="text-slate-500 text-lg">
            Al meer dan 20 jaar de specialist in maatwerk insectenwering
          </p>
        </motion.div>

        {/* USPs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-16 h-16 bg-white border border-slate-200 flex items-center justify-center text-kmp-orange shrink-0 shadow-sm rounded-2xl">
                <usp.icon size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-black text-xl mb-2 text-kmp-blue uppercase">
                  {usp.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{usp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
