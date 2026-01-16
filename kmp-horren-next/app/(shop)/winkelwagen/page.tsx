"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem, CartSummary } from "@/components/cart";
import { useCartStore } from "@/store";

export default function CartPage() {
  const { items, itemCount, clearCart } = useCartStore();

  if (itemCount === 0) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-slate-400" />
            </div>
            <h1 className="text-2xl font-black text-kmp-blue uppercase mb-2">
              Uw winkelwagen is leeg
            </h1>
            <p className="text-slate-500 mb-8">
              Voeg producten toe aan uw winkelwagen om verder te gaan.
            </p>
            <Link href="/producten">
              <Button className="bg-kmp-orange hover:bg-kmp-orange/90">
                Bekijk Producten
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-kmp-blue uppercase tracking-tight">
                Winkelwagen
              </h1>
              <p className="text-slate-500 mt-1">
                {itemCount} {itemCount === 1 ? "product" : "producten"}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-slate-500 hover:text-red-500"
            >
              <Trash2 size={18} className="mr-2" />
              Winkelwagen legen
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Continue shopping link */}
            <Link
              href="/producten"
              className="inline-flex items-center text-sm text-slate-500 hover:text-kmp-orange transition-colors mb-4"
            >
              <ArrowLeft size={16} className="mr-2" />
              Verder winkelen
            </Link>

            {/* Items list */}
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
