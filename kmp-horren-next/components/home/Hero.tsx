"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Gratis Verzending",
  "3 Jaar Garantie",
  "Snelle Levering",
];

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center bg-kmp-blue overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#1c263f] transform -skew-x-12 translate-x-20" />
        <div
          className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: "url('/images/hero-installer.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-kmp-blue via-kmp-blue/95 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-kmp-orange/10 border border-kmp-orange/20 px-4 py-2 text-kmp-orange text-sm font-bold uppercase tracking-wider mb-8 rounded-full"
          >
            <span className="w-2 h-2 bg-kmp-orange rounded-full animate-pulse" />
            Nu met AI-Inmeethulp
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] uppercase tracking-tight"
          >
            Maatwerk horren
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Voor elk raam
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-slate-300 mb-10 max-w-xl font-light leading-relaxed"
          >
            De specialist in insectenwering. Bestel direct online uw inzethorren,
            hordeuren en rolhorren op maat. Gemaakt in onze eigen Nederlandse
            fabriek.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/producten">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-kmp-orange hover:bg-kmp-orange/90 text-white px-10 text-lg font-semibold"
              >
                Bekijk Producten
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/inmeetservice">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-kmp-blue px-10 text-lg"
              >
                Inmeetservice
              </Button>
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 text-white/90"
              >
                <div className="p-1.5 bg-kmp-orange rounded-md">
                  <Check size={16} strokeWidth={4} />
                </div>
                <span className="font-semibold text-sm">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
