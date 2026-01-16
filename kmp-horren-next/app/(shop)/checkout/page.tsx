"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore, useCheckoutStore } from "@/store";
import {
  CheckoutSteps,
  CustomerForm,
  OrderSummary,
  PaymentStep,
} from "@/components/checkout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { itemCount } = useCartStore();
  const { step } = useCheckoutStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirect to cart if empty (only after hydration)
  useEffect(() => {
    if (isHydrated && itemCount === 0) {
      router.push("/winkelwagen");
    }
  }, [isHydrated, itemCount, router]);

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-kmp-orange animate-spin" />
        </div>
      </section>
    );
  }

  if (itemCount === 0) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-kmp-blue mb-2">
            Uw winkelwagen is leeg
          </h1>
          <p className="text-gray-600 mb-6">
            Voeg eerst producten toe aan uw winkelwagen voordat u kunt afrekenen.
          </p>
          <Link href="/producten">
            <Button className="bg-kmp-orange hover:bg-kmp-orange/90">
              Bekijk Producten
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link
          href="/winkelwagen"
          className="inline-flex items-center text-gray-600 hover:text-kmp-blue mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar winkelwagen
        </Link>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-kmp-blue text-center mb-8">
          Afrekenen
        </h1>

        {/* Checkout Steps Indicator */}
        <div className="max-w-2xl mx-auto mb-12">
          <CheckoutSteps currentStep={step} />
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {step === 1 && <CustomerForm />}
          {step === 2 && <OrderSummary />}
          {step === 3 && <PaymentStep />}
        </div>
      </div>
    </section>
  );
}
