"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  Phone,
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

const navigation = [
  { name: "Raamhorren", href: "/producten#raamhorren" },
  { name: "Deurhorren", href: "/producten#deurhorren" },
  { name: "Inmeetservice", href: "/inmeetservice" },
  { name: "Over Ons", href: "/over-ons" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount: cartItemCount } = useCartStore();
  const { isAuthenticated, isLoading: authLoading, signOut } = useAuth();
  const { profile } = useUser();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const userInitials = profile
    ? `${profile.firstName?.charAt(0) || ""}${profile.lastName?.charAt(0) || ""}`.toUpperCase() ||
      "U"
    : "U";

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
            href="tel:+31643065041"
            className="flex items-center gap-2 hover:text-kmp-orange transition-colors"
          >
            <Phone size={14} />
            <span className="font-semibold">+31 6 43 06 50 41</span>
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
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold text-kmp-blue hover:text-kmp-orange transition-colors uppercase tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* User Account */}
              {!authLoading && (
                <>
                  {isAuthenticated ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="relative hover:bg-kmp-blue/5"
                        >
                          <div className="w-8 h-8 rounded-full bg-kmp-blue text-white flex items-center justify-center text-sm font-semibold">
                            {userInitials}
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5 text-sm">
                          <p className="font-medium text-kmp-blue">
                            {profile?.firstName} {profile?.lastName}
                          </p>
                          <p className="text-gray-500 text-xs truncate">
                            {profile?.email}
                          </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            href="/account"
                            className="flex items-center gap-2"
                          >
                            <User className="w-4 h-4" />
                            Mijn Account
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/account/bestellingen"
                            className="flex items-center gap-2"
                          >
                            <Package className="w-4 h-4" />
                            Mijn Bestellingen
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/account/adressen"
                            className="flex items-center gap-2"
                          >
                            <MapPin className="w-4 h-4" />
                            Adresboek
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/account/instellingen"
                            className="flex items-center gap-2"
                          >
                            <Settings className="w-4 h-4" />
                            Instellingen
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Uitloggen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link href="/login" className="hidden sm:block">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-kmp-blue hover:text-kmp-orange hover:bg-kmp-blue/5"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Inloggen
                      </Button>
                    </Link>
                  )}
                </>
              )}

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
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-kmp-blue font-semibold uppercase tracking-wide hover:bg-slate-50 rounded-lg"
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              <div className="pt-4 border-t border-slate-200 mt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-kmp-blue font-semibold hover:bg-slate-50 rounded-lg"
                    >
                      <User className="w-5 h-5" />
                      Mijn Account
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      Uitloggen
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-kmp-blue text-kmp-blue"
                      >
                        Inloggen
                      </Button>
                    </Link>
                    <Link
                      href="/registreren"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1"
                    >
                      <Button className="w-full bg-kmp-blue hover:bg-kmp-blue/90">
                        Registreren
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
