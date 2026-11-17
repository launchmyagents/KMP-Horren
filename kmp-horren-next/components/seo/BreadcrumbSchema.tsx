import { JsonLd } from "./JsonLd";
import { BASE_URL } from "@/lib/seo-config";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${BASE_URL}${item.url}` : undefined,
    })),
  };

  return <JsonLd data={breadcrumbData} />;
}

// Pre-configured breadcrumbs for common pages
export function HomeBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[{ name: "Home", url: "/" }]}
    />
  );
}

export function ProductsBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "/" },
        { name: "Producten", url: "/producten" },
      ]}
    />
  );
}

/**
 * De productpagina toont bezoekers vier niveaus: Home > Producten > categorie >
 * product. Dit blok liet het categorieniveau weg en meldde dus een andere
 * hiërarchie dan de pagina zelf laat zien. Daarmee kreeg Google te horen dat
 * elke productpagina rechtstreeks onder /producten hangt, terwijl de
 * categoriepagina's juist de sterkst rankende pagina's van de site zijn.
 * `categoryName` en `categoryHref` zijn optioneel zodat een aanroep zonder
 * categorie blijft werken en dan de oude keten van drie niveaus oplevert.
 */
export function ProductDetailBreadcrumb({
  productName,
  productSlug,
  categoryName,
  categoryHref,
}: {
  productName: string;
  productSlug: string;
  categoryName?: string;
  categoryHref?: string;
}) {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "/" },
        { name: "Producten", url: "/producten" },
        ...(categoryName && categoryHref
          ? [{ name: categoryName, url: categoryHref }]
          : []),
        { name: productName, url: `/producten/${productSlug}` },
      ]}
    />
  );
}

export function CategoryBreadcrumb({
  categoryName,
  categorySlug,
}: {
  categoryName: string;
  categorySlug: string;
}) {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "/" },
        { name: "Producten", url: "/producten" },
        { name: categoryName, url: `/producten/${categorySlug}` },
      ]}
    />
  );
}

export function ContactBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" },
      ]}
    />
  );
}

export function FAQBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "/" },
        { name: "Veelgestelde vragen", url: "/faq" },
      ]}
    />
  );
}

export function AboutBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "/" },
        { name: "Over ons", url: "/over-ons" },
      ]}
    />
  );
}

export function InmeetserviceBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: "Home", url: "/" },
        { name: "Inmeetservice", url: "/inmeetservice" },
      ]}
    />
  );
}
