"use client";

import { Wrench, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { VOORRIJKOSTEN } from "@/data/configurator";

interface MontageToggleProps {
  value: boolean;
  onChange: (enabled: boolean) => void;
  pricePerUnit: number;
}

export function MontageToggle({ value, onChange, pricePerUnit }: MontageToggleProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-kmp-blue">Montage Service</Label>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Zelf monteren */}
        <button
          type="button"
          onClick={() => onChange(false)}
          className={cn(
            "relative flex flex-col items-center p-4 rounded-xl border-2 text-center transition-all",
            !value
              ? "border-kmp-orange bg-kmp-orange/5"
              : "border-slate-200 hover:border-slate-300 bg-white"
          )}
        >
          <span className="font-semibold text-kmp-blue">Zelf monteren</span>
          <span className="text-xs text-slate-500 mt-1">
            Inclusief handleiding
          </span>
          <span className="text-sm font-bold text-green-600 mt-2">Gratis</span>
        </button>

        {/* Montage door KMP */}
        <button
          type="button"
          onClick={() => onChange(true)}
          className={cn(
            "relative flex flex-col items-center p-4 rounded-xl border-2 text-center transition-all",
            value
              ? "border-kmp-orange bg-kmp-orange/5"
              : "border-slate-200 hover:border-slate-300 bg-white"
          )}
        >
          <Wrench size={20} className="text-kmp-orange mb-1" />
          <span className="font-semibold text-kmp-blue">Montage door KMP</span>
          <span className="text-xs text-slate-500 mt-1">
            Wij monteren voor u
          </span>
          <span className="text-sm font-bold text-kmp-orange mt-2">
            +€{pricePerUnit}/stuk
          </span>
        </button>
      </div>

      {value && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-3">
          <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-800">
            <strong>Voorrijkosten:</strong> Bij montage worden eenmalig €{VOORRIJKOSTEN},- voorrijkosten 
            berekend, ongeacht het aantal horren.
          </div>
        </div>
      )}
    </div>
  );
}
