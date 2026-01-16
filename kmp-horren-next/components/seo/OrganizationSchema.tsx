import { JsonLd } from "./JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

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
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrieweg 10",
      addressLocality: "Amsterdam",
      postalCode: "1234 AB",
      addressCountry: "NL",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+31-88-123-4567",
        contactType: "customer service",
        availableLanguage: ["Dutch"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:30",
          closes: "17:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: "+31-88-123-4567",
        contactType: "sales",
        availableLanguage: ["Dutch"],
      },
    ],
    email: "info@kmp-horren.nl",
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "16:00",
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
    telephone: "+31-88-123-4567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrieweg 10",
      addressLocality: "Amsterdam",
      postalCode: "1234 AB",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.3676,
      longitude: 4.9041,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
    priceRange: "€€",
    paymentAccepted: ["Cash", "Credit Card", "iDEAL", "Bank Transfer"],
    currenciesAccepted: "EUR",
  };

  return <JsonLd data={localBusinessData} />;
}
