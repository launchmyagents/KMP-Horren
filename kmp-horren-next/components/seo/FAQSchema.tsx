import { JsonLd } from "./JsonLd";
import { FAQ } from "@/data/faqs";

interface FAQSchemaProps {
  faqs: FAQ[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={faqData} />;
}

// WebPage schema with FAQ
interface FAQPageSchemaProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
}

export function FAQPageSchema({
  faqs,
  title = "Veelgestelde Vragen - KMP Horren",
  description = "Antwoorden op veelgestelde vragen over horren, meten, monteren, bestellen en garantie bij KMP Horren.",
}: FAQPageSchemaProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

  const pageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/faq`,
    url: `${BASE_URL}/faq`,
    name: title,
    description: description,
    isPartOf: {
      "@type": "WebSite",
      "@id": BASE_URL,
      url: BASE_URL,
      name: "KMP Horren",
    },
    about: {
      "@type": "Thing",
      name: "Horren en insectenwering",
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  };

  return <JsonLd data={pageData} />;
}
