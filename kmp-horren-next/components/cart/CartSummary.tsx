"use client";

import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store";
import { FREE_SHIPPING_THRESHOLD } from "@/data/configurator";

export function CartSummary() {
  const {
    itemCount,
    subtotal,
    staffelDiscount,
    staffelDiscountAmount,
    shippingCost,
    voorrijkosten,
    total,
  } = useCartStore();

  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - (subtotal - staffelDiscountAmount);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-kmp-blue text-white p-4">
        <h3 className="font-bold text-lg uppercase tracking-wide">
          Overzicht
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-slate-600">
            Subtotaal ({itemCount} {itemCount === 1 ? "product" : "producten"})
          </span>
          <span className="font-semibold">€{subtotal.toFixed(2)}</span>
        </div>

        {/* Staffel discount */}
        {staffelDiscountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-2">
              <Tag size={14} />
              Staffelkorting ({Math.round(staffelDiscount * 100)}%)
            </span>
            <span className="font-semibold">-€{staffelDiscountAmount.toFixed(2)}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-slate-600">Verzendkosten</span>
          {shippingCost === 0 ? (
            <span className="font-semibold text-green-600">Gratis</span>
          ) : (
            <span className="font-semibold">€{shippingCost.toFixed(2)}</span>
          )}
        </div>

        {/* Voorrijkosten */}
        {voorrijkosten > 0 && (
          <div className="flex justify-between">
            <span className="text-slate-600">Voorrijkosten (montage)</span>
            <span className="font-semibold">€{voorrijkosten.toFixed(2)}</span>
          </div>
        )}

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-end">
          <span className="font-bold text-lg text-kmp-blue">Totaal</span>
          <div className="text-right">
            <span className="text-3xl font-black text-kmp-blue block">
              €{total.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500">incl. BTW</span>
          </div>
        </div>

        {/* Free shipping progress */}
        {shippingCost > 0 && amountToFreeShipping > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-700 text-sm mb-2">
              <Truck size={16} />
              <span>
                Nog <strong>€{amountToFreeShipping.toFixed(2)}</strong> voor
                gratis verzending
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, ((subtotal - staffelDiscountAmount) / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Checkout button */}
        <Link href="/checkout" className="block">
          <Button
            className="w-full h-14 text-lg font-bold uppercase tracking-wide bg-kmp-orange hover:bg-kmp-orange/90"
            disabled={itemCount === 0}
          >
            Naar Afrekenen
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </Link>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2">
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-green-600" />
            Veilig betalen
          </span>
          <span className="flex items-center gap-1">
            <Truck size={14} className="text-green-600" />
            Snelle levering
          </span>
        </div>
      </div>
    </div>
  );
}
