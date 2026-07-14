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
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
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
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 5,
            maxValue: 7,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
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
