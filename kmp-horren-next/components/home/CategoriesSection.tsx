"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "raamhorren",
    name: "Raamhorren",
    slug: "raamhorren",
    description: "Inzethorren, rolhorren en plissé horren voor elk type raam. Van draai-kiep tot dakraam.",
    imageUrl: "/images/raamhorren-category.png",
    productCount: 8,
    startingPrice: 50,
  },
  {
    id: "deurhorren",
    name: "Deurhorren",
    slug: "deurhorren",
    description: "Plissé hordeuren, scharnier hordeuren en schuifpui horren. Perfect voor elke doorgang.",
    imageUrl: "/images/deurhorren-category.png",
    productCount: 7,
    startingPrice: 215,
  },
];

export function CategoriesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-kmp-blue uppercase tracking-tight mb-4">
            Onze Categorieën
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Kies de juiste hor voor uw raam of deur. Maatwerk van Nederlandse kwaliteit.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={`/producten/${category.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-300 group-hover:shadow-2xl group-hover:border-kmp-orange/30">
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-kmp-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {category.productCount} producten
                        </span>
                      </div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-kmp-orange transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 max-w-md">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">
                          Vanaf <span className="text-white font-bold text-lg">€{category.startingPrice},-</span>
                        </span>
                        <span className="flex items-center text-kmp-orange font-bold uppercase tracking-wide text-sm group-hover:translate-x-2 transition-transform">
                          Bekijk producten <ArrowRight size={18} className="ml-2" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
