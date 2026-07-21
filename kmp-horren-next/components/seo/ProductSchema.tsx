import { JsonLd } from "./JsonLd";
import { Product } from "@/types";
import { BASE_URL } from "@/lib/seo-config";

interface ProductSchemaProps {
  product: Product;
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    url: `${BASE_URL}/producten/${product.slug}`,
    sku: product.id,
    // No real GTIN exists (these are custom, made-to-measure products, not
    // stocked/barcoded items) — mpn re-uses the same internal identifier as
    // sku. Combined with `brand` below this satisfies Google's product
    // identifier recommendation without fabricating a fake GTIN.
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: "KMP Horren",
    },
    manufacturer: {
      "@type": "Organization",
      name: "KMP Horren",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: product.minPrice.toFixed(2),
      highPrice: (product.basePricePerM2 * 4).toFixed(2), // Estimated max price for ~4m²
      offerCount: 1,
      availability: product.isActive
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      // Google's Merchant listing feature reads shippingDetails and
      // hasMerchantReturnPolicy from an actual Offer node, not from the
      // AggregateOffer wrapper itself (confirmed against Google's Merchant
      // listing + Product structured-data docs, 2026-07-21). AggregateOffer
      // keeps the price range (lowPrice/highPrice) for display; the nested
      // Offer below carries the per-offer policy fields Google's validator
      // was reporting as missing.
      offers: [
        {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: product.minPrice.toFixed(2),
          availability: product.isActive
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "KMP Horren",
          },
          priceValidUntil: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          )
            .toISOString()
            .split("T")[0],
          itemCondition: "https://schema.org/NewCondition",
          // Real policy, sourced from the site's own FAQ ("Kan ik mijn
          // bestelling retourneren?") and algemene voorwaarden (Artikel 5 —
          // "Uitzondering maatwerk"): because every product here is made to
          // the customer's own measurements, the standard 14-day right of
          // withdrawal does not apply. Returns are only handled as a
          // manufacturing-defect/warranty matter (covered separately by the
          // 3-year guarantee), not as a general return policy. The previous
          // 14-day/free-return claim here contradicted the site's own T&C —
          // corrected to MerchantReturnNotPermitted.
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
            applicableCountry: "NL",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: "EUR",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "NL",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              // Production (handling) + carrier transit together should
              // reflect the site's own confirmed lead time of "10-15
              // werkdagen" (FAQ, USP blocks, product-page FAQs) — the
              // previous 5-7 + 1-3 split totalled only 6-10 days, understating
              // the real, confirmed delivery time. The 9-13 / 1-2 split below
              // is not itself a client-confirmed breakdown (only the 10-15
              // total is confirmed) — it's a conservative allocation within
              // that confirmed total, not a new invented fact.
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 9,
                maxValue: 13,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 2,
                unitCode: "DAY",
              },
            },
          },
        },
      ],
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Minimale breedte",
        value: `${product.minWidthMm} mm`,
      },
      {
        "@type": "PropertyValue",
        name: "Maximale breedte",
        value: `${product.maxWidthMm} mm`,
      },
      {
        "@type": "PropertyValue",
        name: "Minimale hoogte",
        value: `${product.minHeightMm} mm`,
      },
      {
        "@type": "PropertyValue",
        name: "Maximale hoogte",
        value: `${product.maxHeightMm} mm`,
      },
      {
        "@type": "PropertyValue",
        name: "Type",
        value: product.type === "WINDOW" ? "Raamhor" : "Deurhor",
      },
    ],
    category:
      product.type === "WINDOW"
        ? "Raamhorren > Insectenwering"
        : "Deurhorren > Insectenwering",
  };

  return <JsonLd data={productData} />;
}

// Product list schema for category pages
interface ProductListSchemaProps {
  products: Product[];
  categoryName: string;
}

export function ProductListSchema({
  products,
  categoryName,
}: ProductListSchemaProps) {
  const listData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categoryName,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.imageUrl,
        url: `${BASE_URL}/producten/${product.slug}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: product.minPrice.toFixed(2),
          availability: product.isActive
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return <JsonLd data={listData} />;
}
