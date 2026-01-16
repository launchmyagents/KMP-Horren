"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Truck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PriceCalculation } from "@/types";
import { VOORRIJKOSTEN } from "@/data/configurator";
import { cn } from "@/lib/utils";

interface PriceSummaryProps {
  priceCalculation: PriceCalculation | null;
  quantity: number;
  hasMontage: boolean;
  onAddToCart: () => void;
  isValid: boolean;
  errors: Record<string, string>;
}

export function PriceSummary({
  priceCalculation,
  quantity,
  hasMontage,
  onAddToCart,
  isValid,
  errors,
}: PriceSummaryProps) {
  if (!priceCalculation) {
    return (
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <p className="text-slate-500 text-center">Selecteer een product om de prijs te berekenen</p>
      </div>
    );
  }

  const lineTotal = priceCalculation.unitPrice * quantity;
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden sticky top-24">
      {/* Header */}
      <div className="bg-kmp-blue text-white p-4">
        <h3 className="font-bold text-lg uppercase tracking-wide">Prijsoverzicht</h3>
      </div>

      <div className="p-6 space-y-4">
        {/* Area */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Oppervlakte</span>
          <span className="font-semibold">{priceCalculation.areaM2} m²</span>
        </div>

        {/* Base price */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Basisprijs</span>
          <span className="font-semibold">€{priceCalculation.basePrice.toFixed(2)}</span>
        </div>

        {/* Surcharges */}
        {priceCalculation.colorSurcharge > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Kleur toeslag</span>
            <span className="text-kmp-orange font-semibold">+€{priceCalculation.colorSurcharge.toFixed(2)}</span>
          </div>
        )}
        
        {priceCalculation.meshSurcharge > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Gaas toeslag</span>
            <span className="text-kmp-orange font-semibold">+€{priceCalculation.meshSurcharge.toFixed(2)}</span>
          </div>
        )}
        
        {priceCalculation.profileSurcharge > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Profiel toeslag</span>
            <span className="text-kmp-orange font-semibold">+€{priceCalculation.profileSurcharge.toFixed(2)}</span>
          </div>
        )}
        
        {priceCalculation.montageService > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Montage service</span>
            <span className="text-kmp-orange font-semibold">+€{priceCalculation.montageService.toFixed(2)}</span>
          </div>
        )}

        <Separator />

        {/* Unit price */}
        <div className="flex justify-between">
          <span className="text-slate-600">Prijs per stuk</span>
          <span className="font-bold text-lg">€{priceCalculation.unitPrice.toFixed(2)}</span>
        </div>

        {/* Quantity */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Aantal</span>
          <span className="font-semibold">{quantity}x</span>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-end">
          <span className="text-kmp-blue font-bold text-lg">Totaal</span>
          <div className="text-right">
            <AnimatePresence mode="wait">
              <motion.span
                key={lineTotal}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-3xl font-black text-kmp-blue block"
              >
                €{lineTotal.toFixed(2)}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs text-slate-500">incl. BTW</span>
          </div>
        </div>

        {/* Montage warning */}
        {hasMontage && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800">
              <strong>Let op:</strong> Bij montage worden eenmalig €{VOORRIJKOSTEN},- voorrijkosten berekend.
            </div>
          </div>
        )}

        {/* Errors */}
        {hasErrors && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
            Corrigeer de fouten voordat u het product toevoegt.
          </div>
        )}

        {/* Add to cart button */}
        <Button
          onClick={onAddToCart}
          disabled={!isValid || hasErrors}
          className={cn(
            "w-full h-14 text-lg font-bold uppercase tracking-wide",
            "bg-kmp-orange hover:bg-kmp-orange/90 text-white",
            "disabled:bg-slate-300 disabled:cursor-not-allowed"
          )}
        >
          <ShoppingCart size={20} className="mr-2" />
          Toevoegen aan Winkelwagen
        </Button>

        {/* Shipping info */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <Truck size={14} />
          <span>Gratis verzending vanaf €250</span>
        </div>
      </div>
    </div>
  );
}
