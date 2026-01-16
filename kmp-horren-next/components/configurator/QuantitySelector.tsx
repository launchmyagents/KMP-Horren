"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getStaffelDiscount, STAFFEL_KORTING } from "@/data/configurator";

interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
  maxQuantity?: number;
}

export function QuantitySelector({ value, onChange, maxQuantity = 99 }: QuantitySelectorProps) {
  const currentDiscount = getStaffelDiscount(value);
  const nextTier = STAFFEL_KORTING.find((s) => s.minQuantity > value);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-semibold text-kmp-blue">Aantal</Label>
        {currentDiscount > 0 && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
            {Math.round(currentDiscount * 100)}% staffelkorting
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange(Math.max(1, value - 1))}
            disabled={value <= 1}
            className="h-12 w-12 rounded-none border-r border-slate-200"
          >
            <Minus size={18} />
          </Button>
          
          <div className="w-16 h-12 flex items-center justify-center text-xl font-bold text-kmp-blue">
            {value}
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange(Math.min(maxQuantity, value + 1))}
            disabled={value >= maxQuantity}
            className="h-12 w-12 rounded-none border-l border-slate-200"
          >
            <Plus size={18} />
          </Button>
        </div>

        {nextTier && (
          <div className="text-xs text-slate-500">
            Nog <strong className="text-kmp-orange">{nextTier.minQuantity - value}</strong> voor{" "}
            <strong className="text-green-600">{Math.round(nextTier.discount * 100)}%</strong> korting
          </div>
        )}
      </div>

      {/* Staffel info */}
      <div className="bg-slate-50 rounded-lg p-3">
        <p className="text-xs text-slate-600 font-medium mb-2">Staffelkorting:</p>
        <div className="flex flex-wrap gap-2">
          {STAFFEL_KORTING.filter((s) => s.discount > 0).map((tier) => (
            <span
              key={tier.minQuantity}
              className={cn(
                "text-xs px-2 py-1 rounded",
                value >= tier.minQuantity
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "bg-slate-200 text-slate-500"
              )}
            >
              {tier.minQuantity}+ = {Math.round(tier.discount * 100)}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
