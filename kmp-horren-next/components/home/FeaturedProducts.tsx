"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts(4);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-black text-kmp-blue uppercase tracking-tight mb-2">
              Onze Collectie
            </h2>
            <p className="text-slate-500 font-medium">
              Hoogwaardige oplossingen voor elke situatie.
            </p>
          </motion.div>
          <Link
            href="/producten"
            className="hidden md:flex items-center font-bold text-kmp-orange hover:text-kmp-blue transition-colors uppercase tracking-wide text-sm"
          >
            Alles bekijken <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/producten/${product.slug}`} className="group block">
                <div className="relative bg-slate-50 overflow-hidden border border-slate-100 transition-all duration-300 group-hover:shadow-xl group-hover:border-kmp-orange/20 h-full flex flex-col rounded-xl">
                  {/* Image */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-bold uppercase tracking-wider text-sm flex items-center">
                        Configureren{" "}
                        <ChevronRight size={16} className="ml-1 text-kmp-orange" />
                      </span>
                    </div>
                    {/* Type badge */}
                    <div className="absolute top-4 left-4 bg-kmp-blue text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-md">
                      {product.type === "WINDOW" ? "Raam" : "Deur"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col border-t border-slate-100 bg-white">
                    <h3 className="font-bold text-xl text-kmp-blue mb-2 group-hover:text-kmp-orange transition-colors uppercase">
                      {product.name}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold uppercase">
                        Vanaf
                      </span>
                      <span className="text-lg font-black text-kmp-blue">
                        €{product.minPrice},-
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 text-center md:hidden">
          <Link href="/producten">
            <Button variant="outline" className="w-full">
              Alle Producten Bekijken
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
