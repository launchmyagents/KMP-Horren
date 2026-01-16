"use client";

import { Check, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
  id: string;
  name: string;
  description?: string;
  surcharge?: number;
  suitableFor?: string;
}

interface OptionSelectorProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  showSurcharge?: boolean;
  columns?: 1 | 2 | 3 | 4;
}

export function OptionSelector({
  label,
  options,
  value,
  onChange,
  showSurcharge = true,
  columns = 2,
}: OptionSelectorProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-kmp-blue">{label}</Label>
      
      <div className={cn("grid gap-3", gridCols[columns])}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all",
              value === option.id
                ? "border-kmp-orange bg-kmp-orange/5"
                : "border-slate-200 hover:border-slate-300 bg-white"
            )}
          >
            <div className="flex items-start justify-between w-full gap-2">
              <div className="flex-1">
                <span className="font-semibold text-kmp-blue block">
                  {option.name}
                </span>
                {option.description && (
                  <span className="text-xs text-slate-500 mt-1 block">
                    {option.description}
                  </span>
                )}
                {option.suitableFor && (
                  <span className="text-xs text-slate-400 mt-1 block flex items-center gap-1">
                    <Info size={10} />
                    {option.suitableFor}
                  </span>
                )}
              </div>
              
              {value === option.id && (
                <span className="w-5 h-5 bg-kmp-orange rounded-full flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </span>
              )}
            </div>
            
            {showSurcharge && option.surcharge !== undefined && option.surcharge > 0 && (
              <span className="absolute top-2 right-2 bg-kmp-orange/10 text-kmp-orange text-xs font-semibold px-2 py-0.5 rounded">
                +€{option.surcharge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
