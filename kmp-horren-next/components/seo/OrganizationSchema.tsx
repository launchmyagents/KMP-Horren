import { JsonLd } from "./JsonLd";
import { BASE_URL } from "@/lib/seo-config";

export function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KMP Horren",
    alternateName: "KMP Horren B.V.",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description:
      "De specialist in maatwerk insectenwering. Bestel direct online uw inzethorren, hordeuren en rolhorren op maat. Gemaakt in onze eigen Nederlandse fabriek.",
    foundingDate: "2010",
    // KvK number, confirmed by the client on 2026-07-20. Without a registration
    // identifier an AI assistant cannot tie this site to the company in the
    // trade register: measured 2026-08-05, ChatGPT found KMP Horren through
    // companyinfo.nl and goudengids.nl but not through kmp-horren.nl itself.
    identifier: {
      "@type": "PropertyValue",
      propertyID: "KVK",
      value: "93094698",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Honderdland 111B",
      addressLocality: "Maasdijk",
      postalCode: "2676 LT",
      addressCountry: "NL",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+31-6-43065041",
        contactType: "customer service",
        availableLanguage: ["Dutch"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: "+31-6-43065041",
        contactType: "sales",
        availableLanguage: ["Dutch"],
      },
    ],
    email: "Info@kmp-horren.nl",
    sameAs: [
      "https://www.facebook.com/kmphorren",
      "https://www.instagram.com/kmphorren",
    ],
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    priceRange: "€€",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };

  return <JsonLd data={organizationData} />;
}

// Local Business Schema for better local SEO
export function LocalBusinessSchema() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "KMP Horren",
    image: `${BASE_URL}/logo.svg`,
    "@id": BASE_URL,
    url: BASE_URL,
    telephone: "+31-6-43065041",
    // Same registration identifier as the Organization block above. This is the
    // block that carries the local-business signals, so it needs the KvK number
    // too: an assistant reading only this block would otherwise have no way to
    // tie the business to the trade register.
    identifier: {
      "@type": "PropertyValue",
      propertyID: "KVK",
      value: "93094698",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Honderdland 111B",
      addressLocality: "Maasdijk",
      postalCode: "2676 LT",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.9567,
      longitude: 4.2167,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "€€",
    paymentAccepted: ["Cash", "Credit Card", "iDEAL", "Bank Transfer"],
    currenciesAccepted: "EUR",
  };

  return <JsonLd data={localBusinessData} />;
}
