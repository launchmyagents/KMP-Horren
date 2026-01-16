"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store";
import { getColorById, getMeshById, getProfileById } from "@/data/configurator";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const color = getColorById(item.configuration.colorId);
  const mesh = getMeshById(item.configuration.meshId);
  const profile = getProfileById(item.configuration.profileId);

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200">
      {/* Product Image */}
      <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <Link
              href={`/producten/${item.product.slug}`}
              className="font-bold text-kmp-blue hover:text-kmp-orange transition-colors"
            >
              {item.product.name}
            </Link>
            <div className="text-xs text-slate-500 mt-1 space-y-0.5">
              <p>
                Afmeting: {item.configuration.widthMm} x{" "}
                {item.configuration.heightMm} mm ({item.areaM2} m²)
              </p>
              <p>Kleur: {color?.name || item.configuration.colorId}</p>
              <p>Gaas: {mesh?.name || item.configuration.meshId}</p>
              <p>Profiel: {profile?.depthMm}mm</p>
              {item.configuration.montageService && (
                <p className="flex items-center gap-1 text-kmp-orange font-semibold">
                  <Wrench size={10} /> Incl. montage
                </p>
              )}
            </div>
          </div>

          {/* Remove button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            className="text-slate-400 hover:text-red-500 shrink-0"
          >
            <Trash2 size={18} />
          </Button>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center mt-4">
          {/* Quantity controls */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8 rounded-none"
            >
              <Minus size={14} />
            </Button>
            <span className="w-10 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="h-8 w-8 rounded-none"
            >
              <Plus size={14} />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-xs text-slate-500">
              €{item.unitPrice.toFixed(2)} p/st
            </p>
            <p className="font-bold text-kmp-blue">
              €{item.lineTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
