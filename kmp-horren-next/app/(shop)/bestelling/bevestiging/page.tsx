"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Phone,
  ArrowRight,
  Clock,
  Loader2,
} from "lucide-react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const isDemo = searchParams.get("demo") === "true";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading order details
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-kmp-orange animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Bestelling wordt verwerkt...</p>
        </div>
      </div>
    );
  }

  if (!orderNumber) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-kmp-blue mb-2">
            Geen bestelling gevonden
          </h1>
          <p className="text-gray-600 mb-6">
            We konden geen bestelgegevens vinden. Controleer uw e-mail voor de bevestiging.
          </p>
          <Link href="/producten">
            <Button className="bg-kmp-orange hover:bg-kmp-orange/90">
              Bekijk Producten
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-14 h-14 text-green-600" />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-kmp-blue mb-2"
            >
              Bedankt voor uw bestelling!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600"
            >
              Uw bestelling is succesvol ontvangen en wordt verwerkt.
            </motion.p>
          </motion.div>

          {/* Order Number Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
          >
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Bestelnummer</p>
              <p className="text-2xl font-bold text-kmp-blue font-mono">
                {orderNumber}
              </p>
              {isDemo && (
                <p className="text-sm text-kmp-orange mt-2">
                  (Demo modus - geen echte betaling)
                </p>
              )}
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
          >
            <h2 className="text-lg font-semibold text-kmp-blue mb-4">
              Wat gebeurt er nu?
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-kmp-blue/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-kmp-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-kmp-blue">Bevestigingsmail</h3>
                  <p className="text-sm text-gray-600">
                    U ontvangt binnen enkele minuten een bevestigingsmail met alle details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-kmp-orange/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-kmp-orange" />
                </div>
                <div>
                  <h3 className="font-medium text-kmp-blue">Productie</h3>
                  <p className="text-sm text-gray-600">
                    Uw horren worden op maat gemaakt in onze eigen fabriek. Dit duurt gemiddeld 5-7 werkdagen.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-kmp-blue">Verzending</h3>
                  <p className="text-sm text-gray-600">
                    Zodra uw bestelling klaar is, ontvangt u een track & trace code per e-mail.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Estimated Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-kmp-blue/5 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-kmp-blue" />
              <div>
                <h3 className="font-semibold text-kmp-blue">
                  Geschatte levertijd
                </h3>
                <p className="text-gray-600">
                  Uw bestelling wordt verwacht binnen{" "}
                  <span className="font-semibold">7-10 werkdagen</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-kmp-blue mb-4">
              Vragen over uw bestelling?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+31643065041"
                className="flex items-center gap-2 text-gray-600 hover:text-kmp-orange transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+31 6 43 06 50 41</span>
              </a>
              <a
                href="mailto:Info@kmphorren.nl"
                className="flex items-center gap-2 text-gray-600 hover:text-kmp-orange transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Info@kmphorren.nl</span>
              </a>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8"
              >
                Terug naar Home
              </Button>
            </Link>
            <Link href="/producten">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-kmp-orange hover:bg-kmp-orange/90 px-8"
              >
                Verder winkelen
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-kmp-orange animate-spin" />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
