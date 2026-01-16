"use client";

import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { COLORS } from "@/data/configurator";

interface ColorSelectorProps {
  value: string;
  onChange: (colorId: string) => void;
}

export function ColorSelector({ value, onChange }: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-semibold text-kmp-blue">Kleur</Label>
        <span className="text-xs text-slate-500">
          {COLORS.find((c) => c.id === value)?.name}
        </span>
      </div>
      
      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
        {COLORS.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => onChange(color.id)}
            className={cn(
              "relative w-full aspect-square rounded-lg border-2 transition-all hover:scale-105",
              value === color.id
                ? "border-kmp-orange ring-2 ring-kmp-orange/30"
                : "border-slate-200 hover:border-slate-300"
            )}
            style={{ backgroundColor: color.hex }}
            title={`${color.name} (${color.ral})${color.surcharge > 0 ? ` +€${color.surcharge}` : ""}`}
          >
            {value === color.id && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check
                  size={16}
                  className={cn(
                    "drop-shadow-md",
                    color.hex === "#FFFFFF" || color.hex === "#FDF4E3" || color.hex === "#F7F5F0"
                      ? "text-kmp-blue"
                      : "text-white"
                  )}
                  strokeWidth={3}
                />
              </span>
            )}
            {color.surcharge > 0 && (
              <span className="absolute -top-1 -right-1 bg-kmp-orange text-white text-[8px] font-bold px-1 rounded">
                +€{color.surcharge}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>
          Geselecteerd: <strong className="text-kmp-blue">{COLORS.find((c) => c.id === value)?.ral}</strong>
        </span>
        {COLORS.find((c) => c.id === value)?.surcharge ? (
          <span className="text-kmp-orange font-semibold">
            +€{COLORS.find((c) => c.id === value)?.surcharge} toeslag
          </span>
        ) : null}
      </div>
    </div>
  );
}
