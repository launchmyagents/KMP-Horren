import { JsonLd } from "./JsonLd";
import { FAQ } from "@/data/faqs";
import { BASE_URL } from "@/lib/seo-config";

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
  // FAQPage is zelf een subtype van WebPage. Het als mainEntity binnen een losse
  // WebPage hangen (zoals hier eerder stond) zegt letterlijk "de hoofdzaak van deze
  // pagina is een andere pagina", en zoekmachines herkennen de vragen dan niet.
  const pageData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={pageData} />;
}
