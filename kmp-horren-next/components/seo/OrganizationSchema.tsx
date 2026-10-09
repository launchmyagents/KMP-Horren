import { JsonLd } from "./JsonLd";
import { BASE_URL } from "@/lib/seo-config";

// Canonical Google Maps address of the Google Business Profile, built from the place
// id as Google documents it. Verified against the live profile on 2026-10-09:
// KMP-Horren, Honderdland 111B Maasdijk, category Horrenwinkel, claimed, 12 reviews.
const GOOGLE_BUSINESS_PROFILE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJLcf-K2KzxUcRzY9IMDXVzJ0";

// Het echte Instagram-account. Het schema noemde tot 2026-10-09
// instagram.com/kmphorren, dat niet bestaat. Het bestaande account heet
// kmp_horren met een lage streep, heeft een bio over maatwerk plisse- en
// inzethorren en verwijst zelf naar kmp-horren.nl. Gecontroleerd op 2026-10-09.
// Een Facebook-bedrijfspagina is er niet: een zoekopdracht over facebook.com
// levert alleen een bericht in een woongroep op waarin het e-mailadres genoemd
// wordt, geen eigen pagina.
const INSTAGRAM_URL = "https://www.instagram.com/kmp_horren/";

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
    // `sameAs` is the field that lets a search engine or an AI assistant tie this
    // website to the same company elsewhere on the web. Until 2026-10-09 it listed
    // facebook.com/kmphorren and instagram.com/kmphorren. Both return HTTP 200, so a
    // status check never flagged them, but opening them shows "Deze inhoud is
    // momenteel niet beschikbaar" and "Profile is niet beschikbaar": neither profile
    // exists. Two dead references are worse than none, because they point an assistant
    // at nothing. They are replaced by the Google Business Profile, which has been
    // claimed since 2026-08-31 and carries the same address and telephone number.
    // Add a social profile back the moment there is a real one.
    sameAs: [GOOGLE_BUSINESS_PROFILE_URL, INSTAGRAM_URL],
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
    // Same reasoning as the Organization block above: this is the block that carries
    // the local signals, so the link to the Google Business Profile belongs here too.
    sameAs: [GOOGLE_BUSINESS_PROFILE_URL, INSTAGRAM_URL],
    hasMap: GOOGLE_BUSINESS_PROFILE_URL,
  };

  return <JsonLd data={localBusinessData} />;
}
