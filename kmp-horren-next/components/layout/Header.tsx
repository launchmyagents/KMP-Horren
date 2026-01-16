"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store";

const navigation = [
  {
    name: "Raamhorren",
    href: "/producten/raamhorren",
    children: [
      { name: "Luxe Inzethor", href: "/producten/luxe-inzethor" },
      { name: "Inzet Plissé Hor", href: "/producten/inzet-plisse-hor" },
      { name: "Luxe Rolhor", href: "/producten/luxe-rolhor" },
      { name: "Luxe Klemhor", href: "/producten/luxe-klemhor" },
      { name: "Plissé Hor Dakraam", href: "/producten/plisse-hor-dakraam" },
    ],
  },
  {
    name: "Deurhorren",
    href: "/producten/deurhorren",
    children: [
      { name: "Plissé Hordeur", href: "/producten/plisse-hordeur-enkel" },
      { name: "Dubbele Plissé Hordeur", href: "/producten/plisse-hordeur-dubbel" },
      { name: "Scharnier Hordeur", href: "/producten/scharnier-hordeur" },
      { name: "Royal 22 Hordeur", href: "/producten/royal-22-enkel" },
      { name: "Schuifpui Hor", href: "/producten/schuifpui-hor" },
    ],
  },
  { name: "Inmeetservice", href: "/inmeetservice" },
  { name: "Over Ons", href: "/over-ons" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount: cartItemCount } = useCartStore();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-kmp-blue text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-6">
            <span className="text-slate-300">Gratis verzending vanaf €250</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">3 jaar garantie</span>
          </div>
          <a
            href="tel:0881234567"
            className="flex items-center gap-2 hover:text-kmp-orange transition-colors"
          >
            <Phone size={14} />
            <span className="font-semibold">088 - 123 45 67</span>
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="KMP Horren"
                width={160}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) =>
                item.children ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-kmp-blue hover:text-kmp-orange transition-colors uppercase tracking-wide">
                        {item.name}
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link
                          href={item.href}
                          className="font-semibold text-kmp-blue"
                        >
                          Alle {item.name}
                        </Link>
                      </DropdownMenuItem>
                      <div className="my-1 h-px bg-slate-100" />
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.name} asChild>
                          <Link href={child.href}>{child.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-sm font-semibold text-kmp-blue hover:text-kmp-orange transition-colors uppercase tracking-wide"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link href="/winkelwagen" className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-kmp-blue/5"
                >
                  <ShoppingCart
                    size={24}
                    className="text-kmp-blue group-hover:text-kmp-orange transition-colors"
                  />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-kmp-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* CTA Button - Desktop */}
              <Link href="/producten" className="hidden md:block">
                <Button className="bg-kmp-orange hover:bg-kmp-orange/90 text-white font-semibold uppercase tracking-wide">
                  Configureer Nu
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X size={24} className="text-kmp-blue" />
                ) : (
                  <Menu size={24} className="text-kmp-blue" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-kmp-blue font-semibold uppercase tracking-wide hover:bg-slate-50 rounded-lg"
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2 text-slate-600 hover:text-kmp-orange hover:bg-slate-50 rounded-lg text-sm"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link href="/producten" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-kmp-orange hover:bg-kmp-orange/90 text-white font-semibold uppercase tracking-wide">
                    Configureer Nu
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
