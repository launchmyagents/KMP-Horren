"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  GA_MEASUREMENT_ID,
  getConsent,
} from "@/lib/analytics";

/**
 * Loads the GA4 gtag.js script only AFTER the user has granted consent.
 *
 * Why conditional script-load + Consent Mode v2 (and not Consent Mode alone)?
 * Pure Consent Mode v2 still loads gtag.js on every visit and pings Google for
 * "denied" pings/modeling. We prefer the stricter AVG-stance: no Google request
 * at all until the visitor opts in. Once granted, we also set consent state to
 * "granted" so any future modeling/feature works as Google expects.
 */
export function GtagScript() {
  const [consent, setConsentState] = useState<"granted" | "denied" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsentState(getConsent());

    const handleCustom = (e: Event) => {
      const detail = (e as CustomEvent<"granted" | "denied">).detail;
      setConsentState(detail);
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) {
        setConsentState(getConsent());
      }
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, handleCustom);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, handleCustom);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  if (!mounted || consent !== "granted") return null;

  return (
    <>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
