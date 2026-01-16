"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DimensionInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  error?: string;
  helpText?: string;
}

export function DimensionInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "mm",
  error,
  helpText,
}: DimensionInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const numValue = parseInt(newValue, 10);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  const handleBlur = () => {
    let numValue = parseInt(inputValue, 10);
    if (isNaN(numValue)) {
      numValue = min;
    }
    // Clamp value to min/max
    numValue = Math.max(min, Math.min(max, numValue));
    setInputValue(numValue.toString());
    onChange(numValue);
  };

  const increment = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-semibold text-kmp-blue">{label}</Label>
        <span className="text-xs text-slate-500">
          {min} - {max} {unit}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={value <= min}
          className="h-12 w-12 shrink-0"
        >
          <Minus size={18} />
        </Button>
        
        <div className="relative flex-1">
          <Input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            min={min}
            max={max}
            step={step}
            className={cn(
              "h-12 text-center text-lg font-semibold pr-12",
              error && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            {unit}
          </span>
        </div>
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={value >= max}
          className="h-12 w-12 shrink-0"
        >
          <Plus size={18} />
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-xs text-slate-500">{helpText}</p>
      )}
    </div>
  );
}
