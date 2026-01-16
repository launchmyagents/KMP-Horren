"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore, useCheckoutStore } from "@/store";
import { COLORS, MESH_TYPES, PROFILE_DEPTHS, FRAME_TYPES } from "@/data/configurator";
import {
  ArrowLeft,
  ArrowRight,
  Tag,
  Check,
  X,
  Loader2,
  Package,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { COSTS, STAFFEL_DISCOUNTS } from "@/types";

export function OrderSummary() {
  const { items, subtotal, shippingCost, voorrijkosten: mountingCost, itemCount } = useCartStore();
  const {
    customerDetails,
    discountCode,
    discountAmount,
    setDiscountCode,
    applyDiscount,
    clearDiscount,
    prevStep,
    nextStep,
  } = useCheckoutStore();

  const [codeInput, setCodeInput] = useState(discountCode);
  const [isValidating, setIsValidating] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [codeSuccess, setCodeSuccess] = useState(false);

  // Calculate staffel discount
  let staffelDiscount = 0;
  for (const discount of STAFFEL_DISCOUNTS) {
    if (itemCount >= discount.minItems) {
      staffelDiscount = discount.discount;
      break;
    }
  }

  // Calculate voorrijkosten if any item has montage
  const hasMontage = items.some((item) => item.configuration.montageService);
  const voorrijkosten = hasMontage ? COSTS.voorrijkosten : 0;

  // Calculate final total
  const discountedSubtotal = subtotal - discountAmount;
  const finalTotal = discountedSubtotal + shippingCost + mountingCost + voorrijkosten;

  const validateDiscountCode = async () => {
    if (!codeInput.trim()) return;

    setIsValidating(true);
    setCodeError("");
    setCodeSuccess(false);

    try {
      // Simulate API call - in production this would call /api/discount/validate
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo discount codes
      const validCodes: Record<string, { type: "percentage" | "fixed"; value: number }> = {
        WELKOM10: { type: "percentage", value: 10 },
        KORTING20: { type: "fixed", value: 20 },
        ZOMER2024: { type: "percentage", value: 15 },
      };

      const code = codeInput.toUpperCase().trim();
      if (validCodes[code]) {
        const discount = validCodes[code];
        const amount =
          discount.type === "percentage"
            ? subtotal * (discount.value / 100)
            : discount.value;
        setDiscountCode(code);
        applyDiscount(amount, discount.type);
        setCodeSuccess(true);
      } else {
        setCodeError("Ongeldige kortingscode");
        clearDiscount();
      }
    } catch {
      setCodeError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setIsValidating(false);
    }
  };

  const removeDiscount = () => {
    setCodeInput("");
    clearDiscount();
    setCodeSuccess(false);
    setCodeError("");
  };

  const getColorName = (colorId: string) => {
    return COLORS.find((c) => c.id === colorId)?.name || colorId;
  };

  const getMeshName = (meshId: string) => {
    return MESH_TYPES.find((m) => m.id === meshId)?.name || meshId;
  };

  const getProfileDepth = (profileId: string) => {
    const profile = PROFILE_DEPTHS.find((p) => p.id === profileId);
    return profile ? `${profile.depthMm}mm` : profileId;
  };

  const getFrameName = (frameId?: string) => {
    if (!frameId) return null;
    return FRAME_TYPES.find((f) => f.id === frameId)?.name || frameId;
  };

  return (
    <div className="space-y-8">
      {/* Order Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-kmp-blue/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-kmp-blue" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-kmp-blue">Uw Bestelling</h2>
            <p className="text-sm text-gray-500">{itemCount} artikel(en)</p>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-kmp-blue truncate">
                  {item.product.name}
                </h3>
                <div className="text-sm text-gray-600 space-y-0.5 mt-1">
                  <p>
                    {item.configuration.widthMm} x {item.configuration.heightMm} mm
                  </p>
                  <p>Kleur: {getColorName(item.configuration.colorId)}</p>
                  <p>Gaas: {getMeshName(item.configuration.meshId)}</p>
                  <p>Profiel: {getProfileDepth(item.configuration.profileId)}</p>
                  {getFrameName(item.configuration.frameTypeId) && (
                    <p>Kozijn: {getFrameName(item.configuration.frameTypeId)}</p>
                  )}
                  {item.configuration.montageService && (
                    <p className="text-kmp-orange font-medium">+ Montageservice</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-kmp-blue">
                  €{item.lineTotal.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {item.quantity}x €{item.unitPrice.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discount Code */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="w-5 h-5 text-kmp-orange" />
          <Label className="text-base font-semibold">Kortingscode</Label>
        </div>

        {codeSuccess && discountCode ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">{discountCode}</span>
              <span className="text-green-600">
                (-€{discountAmount.toFixed(2)})
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeDiscount}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="Voer kortingscode in"
              className={codeError ? "border-red-500" : ""}
            />
            <Button
              onClick={validateDiscountCode}
              disabled={isValidating || !codeInput.trim()}
              className="bg-kmp-blue hover:bg-kmp-blue/90"
            >
              {isValidating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Toepassen"
              )}
            </Button>
          </div>
        )}
        {codeError && <p className="text-sm text-red-500 mt-2">{codeError}</p>}
      </div>

      {/* Delivery Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-kmp-orange/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-kmp-orange" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-kmp-blue">Bezorgadres</h2>
          </div>
        </div>

        <div className="text-gray-700">
          <p className="font-medium">
            {customerDetails.firstName} {customerDetails.lastName}
          </p>
          <p>
            {customerDetails.street} {customerDetails.houseNumber}
            {customerDetails.houseNumberAddition}
          </p>
          <p>
            {customerDetails.postalCode} {customerDetails.city}
          </p>
          <p>{customerDetails.country}</p>
          <Separator className="my-3" />
          <p className="text-sm text-gray-500">
            <span className="font-medium">E-mail:</span> {customerDetails.email}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Telefoon:</span> {customerDetails.phone}
          </p>
          {customerDetails.notes && (
            <>
              <Separator className="my-3" />
              <p className="text-sm text-gray-500">
                <span className="font-medium">Opmerkingen:</span>{" "}
                {customerDetails.notes}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-kmp-blue mb-4">Totaaloverzicht</h2>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotaal ({itemCount} artikelen)</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>

          {staffelDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Staffelkorting ({(staffelDiscount * 100).toFixed(0)}%)</span>
              <span>-€{(subtotal * staffelDiscount).toFixed(2)}</span>
            </div>
          )}

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Kortingscode ({discountCode})</span>
              <span>-€{discountAmount.toFixed(2)}</span>
            </div>
          )}

          {mountingCost > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Montagekosten</span>
              <span>€{mountingCost.toFixed(2)}</span>
            </div>
          )}

          {voorrijkosten > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Voorrijkosten (montage)</span>
              <span>€{voorrijkosten.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600">
            <span>Verzendkosten</span>
            <span>{shippingCost === 0 ? "Gratis" : `€${shippingCost.toFixed(2)}`}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-xl font-bold text-kmp-blue">
            <span>Totaal</span>
            <span>€{finalTotal.toFixed(2)}</span>
          </div>

          <p className="text-sm text-gray-500">Inclusief 21% BTW</p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span>Veilig betalen</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-kmp-blue" />
          <span>Snelle levering</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={prevStep}
          className="px-8"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Terug
        </Button>
        <Button
          size="lg"
          onClick={nextStep}
          className="bg-kmp-orange hover:bg-kmp-orange/90 text-white px-8"
        >
          Naar Betaling
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
