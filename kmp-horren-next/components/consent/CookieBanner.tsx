"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  getConsent,
  setConsent,
} from "@/lib/analytics";

/**
 * AVG-compliant cookie banner.
 * Toont alleen als er nog geen keuze is gemaakt.
 * Tone-of-voice: "u" (site-stijl). Geen donkere-patronen: Accepteren en
 * Weigeren zijn even prominent.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);

    const handleCustom = () => setVisible(getConsent() === null);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) setVisible(getConsent() === null);
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, handleCustom);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, handleCustom);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    setConsent("granted");
    setVisible(false);
  };

  const handleDecline = () => {
    setConsent("denied");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookietoestemming"
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200 bg-white shadow-2xl"
    >
      <div className="container mx-auto flex flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="text-sm text-slate-700 md:max-w-2xl">
          <p className="font-semibold text-kmp-blue mb-1">
            Cookies voor een betere website
          </p>
          <p>
            Wij gebruiken analytics-cookies om te zien hoe bezoekers de site
            gebruiken, zodat we hem kunnen verbeteren. Geen reclame, geen
            doorverkoop aan derden.{" "}
            <Link
              href="/privacy"
              className="font-medium text-kmp-orange hover:underline"
            >
              Lees ons privacybeleid
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleDecline}
            className="w-full sm:w-auto"
          >
            Weigeren
          </Button>
          <Button
            type="button"
            onClick={handleAccept}
            className="w-full bg-kmp-orange hover:bg-kmp-orange/90 sm:w-auto"
          >
            Accepteren
          </Button>
        </div>
      </div>
    </div>
  );
}
