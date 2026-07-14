// GA4 + consent helpers (client-side only)
// All public-facing user copy is in Dutch ("u"-vorm).
// Consent Mode v2: default = denied; updated to "granted" only after user opt-in.

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-E4QPWTFPNN";

export const CONSENT_STORAGE_KEY = "kmp_consent_v1";
export const CONSENT_CHANGED_EVENT = "kmp:consent-changed";

export type ConsentValue = "granted" | "denied" | null;

// gtag global typing
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
    return null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<ConsentValue, null>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // localStorage blocked: tracking simply blijft uit.
  }
  // Notify same-tab listeners (storage event vuurt alleen voor andere tabs).
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGED_EVENT, { detail: value })
  );

  // Live consent-update naar gtag (als script al geladen is).
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: value,
    });
  }
}

/**
 * Fire a GA4 event. No-op if consent is not granted or gtag is not loaded yet.
 * Safe to call from anywhere in client components.
 */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  if (getConsent() !== "granted") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
