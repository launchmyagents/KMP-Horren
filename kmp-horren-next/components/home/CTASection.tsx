"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 bg-kmp-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#1c263f] transform -skew-x-12 translate-x-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
              Configureer direct uw maatwerk horren online of neem contact op voor
              persoonlijk advies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/producten">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-kmp-orange hover:bg-kmp-orange/90 text-white px-10 text-lg font-semibold"
              >
                Start Configurator
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <a href="tel:0881234567">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-kmp-blue px-10 text-lg"
              >
                <Phone className="mr-2" size={20} />
                Bel ons
              </Button>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400 text-sm"
          >
            <span>✓ Gratis verzending vanaf €250</span>
            <span>✓ 3 jaar garantie</span>
            <span>✓ Levertijd 10-15 werkdagen</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
