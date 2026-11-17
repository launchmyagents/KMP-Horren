import { JsonLd } from "./JsonLd";
import { BASE_URL } from "@/lib/seo-config";

interface ArticleSchemaProps {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
}

/**
 * Article voor de adviespagina's. Het bedrijf is zelf de auteur: er is geen
 * individuele schrijver om op te voeren, en een verzonnen naam is erger dan geen.
 */
export function ArticleSchema({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
}: ArticleSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE_URL}/advies/${slug}`,
    mainEntityOfPage: `${BASE_URL}/advies/${slug}`,
    headline,
    description,
    inLanguage: "nl-NL",
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "KMP Horren",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "KMP Horren",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
  };

  return <JsonLd data={data} />;
}
