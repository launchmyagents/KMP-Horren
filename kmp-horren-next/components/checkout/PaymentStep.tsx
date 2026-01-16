"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore, useCheckoutStore } from "@/store";
import { COSTS, STAFFEL_DISCOUNTS } from "@/types";
import {
  ArrowLeft,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "ideal",
    name: "iDEAL",
    description: "Direct betalen via uw bank",
    icon: "/images/payment/ideal.svg",
  },
  {
    id: "bancontact",
    name: "Bancontact",
    description: "Populair in België",
    icon: "/images/payment/bancontact.svg",
  },
  {
    id: "creditcard",
    name: "Creditcard",
    description: "Visa, Mastercard, American Express",
    icon: "/images/payment/creditcard.svg",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Betaal met uw PayPal account",
    icon: "/images/payment/paypal.svg",
  },
  {
    id: "klarna",
    name: "Klarna",
    description: "Achteraf betalen of in termijnen",
    icon: "/images/payment/klarna.svg",
  },
];

export function PaymentStep() {
  const { items, subtotal, shippingCost, voorrijkosten: mountingCost, itemCount, clearCart } =
    useCartStore();
  const {
    customerDetails,
    discountAmount,
    discountCode,
    isProcessing,
    setProcessing,
    prevStep,
    resetCheckout,
  } = useCheckoutStore();

  const [selectedMethod, setSelectedMethod] = useState<string>("ideal");
  const [error, setError] = useState("");

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

  const handlePayment = async () => {
    setProcessing(true);
    setError("");

    try {
      // Create order via API
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails,
          items: items.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            widthMm: item.configuration.widthMm,
            heightMm: item.configuration.heightMm,
            areaM2: item.areaM2,
            colorId: item.configuration.colorId,
            meshTypeId: item.configuration.meshId,
            profileDepthId: item.configuration.profileId,
            frameTypeId: item.configuration.frameTypeId,
            customOptions: item.configuration.customOptions,
            montageService: item.configuration.montageService,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            lineTotal: item.lineTotal,
          })),
          subtotal,
          discountCode,
          discountAmount,
          shippingCost,
          mountingCost,
          voorrijkosten,
          totalPrice: finalTotal,
          paymentMethod: selectedMethod,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Kon bestelling niet aanmaken");
      }

      const orderData = await orderResponse.json();

      // Create payment via Mollie
      const paymentResponse = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderData.id,
          orderNumber: orderData.orderNumber,
          amount: finalTotal,
          method: selectedMethod,
          customerEmail: customerDetails.email,
          customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Kon betaling niet starten");
      }

      const paymentData = await paymentResponse.json();

      // Clear cart and redirect to Mollie
      clearCart();
      resetCheckout();

      // Redirect to payment URL
      if (paymentData.checkoutUrl) {
        window.location.href = paymentData.checkoutUrl;
      } else {
        // Fallback for demo - redirect to success page
        window.location.href = `/bestelling/bevestiging?order=${orderData.orderNumber}`;
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Er ging iets mis. Probeer het opnieuw."
      );
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-kmp-blue/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-kmp-blue" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-kmp-blue">Betaalmethode</h2>
            <p className="text-sm text-gray-500">Kies hoe u wilt betalen</p>
          </div>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all",
                selectedMethod === method.id
                  ? "border-kmp-orange bg-kmp-orange/5"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="w-12 h-8 relative flex items-center justify-center bg-white rounded">
                {/* Placeholder for payment icons - in production use actual icons */}
                <CreditCard className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-kmp-blue">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
              {selectedMethod === method.id && (
                <CheckCircle className="w-6 h-6 text-kmp-orange" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-kmp-blue mb-4">
          Besteloverzicht
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotaal ({itemCount} artikelen)</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>

          {staffelDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Staffelkorting</span>
              <span>-€{(subtotal * staffelDiscount).toFixed(2)}</span>
            </div>
          )}

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Kortingscode</span>
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
              <span>Voorrijkosten</span>
              <span>€{voorrijkosten.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600">
            <span>Verzendkosten</span>
            <span>
              {shippingCost === 0 ? "Gratis" : `€${shippingCost.toFixed(2)}`}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between text-xl font-bold text-kmp-blue">
            <span>Te betalen</span>
            <span>€{finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
        <Lock className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-800">
          Uw betaling wordt verwerkt via Mollie, een veilige en betrouwbare
          betaalprovider. Uw gegevens worden versleuteld verzonden.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={prevStep}
          disabled={isProcessing}
          className="px-8"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Terug
        </Button>
        <Button
          size="lg"
          onClick={handlePayment}
          disabled={isProcessing}
          className="bg-kmp-orange hover:bg-kmp-orange/90 text-white px-8"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Bezig met verwerken...
            </>
          ) : (
            <>
              <ShieldCheck className="mr-2 w-5 h-5" />
              Betalen €{finalTotal.toFixed(2)}
            </>
          )}
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <Image
          src="/images/payment/mollie-badge.svg"
          alt="Mollie"
          width={80}
          height={30}
          className="opacity-60"
        />
      </div>
    </div>
  );
}
