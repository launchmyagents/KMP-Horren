/**
 * Per-slug SEO copy for product pages.
 *
 * Kept separate from `data/products.ts` (which can be sourced from Supabase
 * at runtime) so SEO-targeted titles, descriptions and H1's stay curated in
 * code instead of being editable per-product-record. When a slug is not
 * mapped here, the product page falls back to its previous generic
 * "Name - Raamhor/Deurhor op Maat" pattern.
 *
 * Titles below intentionally do NOT include the "| KMP Horren" suffix —
 * the root layout adds that via the metadata title template ("%s | KMP Horren").
 * Including it here would produce "... | KMP Horren | KMP Horren" duplicates.
 *
 * Each entry targets the product's primary keyword from
 * strategy/keyword-research-2026-06-13.md (kept in the SEO repo).
 */

export interface ProductSeo {
  /** Page <title> without the brand suffix (layout template appends " | KMP Horren"). */
  title: string;
  /** Meta description, primary keyword in the opening clause. */
  description: string;
  /** H1 shown on the product page. Falls back to product.name when omitted. */
  h1: string;
}

export const PRODUCT_SEO: Record<string, ProductSeo> = {
  // ---------- RAAMHORREN ----------

  "luxe-inzethor": {
    title: "Inzethor op maat | Klemt zonder boren",
    description:
      "Inzethor op maat voor draai-kiepramen: klemt zichzelf vast zonder boren. Vanaf €64. ✓ Maatwerk ✓ Gratis verzending vanaf €250 ✓ 3 jaar garantie",
    h1: "Luxe inzethor op maat",
  },

  "inzet-plisse-hor": {
    title: "Inzet plissé hor op maat | Raamhor",
    description:
      "Inzet plissé hor op maat met geplisseerd gaas: decoratief én functioneel, ideaal voor grote ramen. Vanaf €100. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Inzet plissé hor op maat",
  },

  "voorzet-plisse-hor": {
    title: "Voorzet plissé hor op maat | Op het kozijn",
    description:
      "Voorzet plissé hor op maat, geplaatst op het kozijn: dé oplossing bij onvoldoende inbouwdiepte. Vanaf €100. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Voorzet plissé hor op maat",
  },

  "plisse-hor-dakraam": {
    title: "Dakraamhor op maat | Velux & Fakro",
    description:
      "Plissé dakraamhor op maat, compatibel met Velux en Fakro: speciaal voor dakramen. Vanaf €95. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Plissé hor voor dakraam op maat",
  },

  // ---------- DEURHORREN ----------

  "plisse-hordeur-enkel": {
    title: "Plissé hordeur op maat (enkel)",
    description:
      "Plissé hordeur op maat: de meest verkochte hordeur van Nederland, gebruiksvriendelijk en duurzaam. Vanaf €250. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Plissé hordeur op maat (enkel)",
  },

  "plisse-hordeur-dubbel": {
    title: "Dubbele plissé hordeur op maat",
    description:
      "Dubbele plissé hordeur op maat voor brede doorgangen: twee plissédelen die in het midden sluiten. Vanaf €450. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Dubbele plissé hordeur op maat",
  },

  // ---------- VERDUISTEREND ----------

  "duo-plisse-hor-verduisterend": {
    title: "Duo plissé hor verduisterend | 2-in-1",
    description:
      "Duo plissé hor verduisterend op maat: een verduisterend deel en een insectenhor in één frame, onafhankelijk bedienbaar. Vanaf €250. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Duo plissé hor verduisterend op maat",
  },
};

export function getProductSeo(slug: string): ProductSeo | undefined {
  return PRODUCT_SEO[slug];
}

/**
 * Cross-links between individual product pages, shown in a "related links"
 * block on the product detail page. Rebuilt against the confirmed 7-product
 * catalog (2026-07-20) — replaces an earlier version (PR #19,
 * feat/onpage-productpaginas-seo) that was never merged and had gone stale
 * against several catalog changes since (Verduisterend category, Voorzet
 * Plissé Hor rename, 9 discontinued products removed).
 */
export interface RelatedProductLink {
  /** Slug of the product to link to. */
  slug: string;
  /** Full anchor text shown on the linking page. */
  anchor: string;
}

export const RELATED_PRODUCTS: Record<string, RelatedProductLink[]> = {
  "luxe-inzethor": [
    {
      slug: "inzet-plisse-hor",
      anchor: "Liever geplisseerd gaas? Bekijk de Inzet Plissé Hor",
    },
  ],
  "inzet-plisse-hor": [
    {
      slug: "luxe-inzethor",
      anchor: "Liever een vlak profiel zonder plissé? Bekijk de Luxe Inzethor",
    },
    {
      slug: "voorzet-plisse-hor",
      anchor: "Past de hor niet aan de binnenzijde? Bekijk de Voorzet Plissé Hor",
    },
  ],
  "voorzet-plisse-hor": [
    {
      slug: "inzet-plisse-hor",
      anchor: "Wel genoeg ruimte aan de binnenzijde? Bekijk de Inzet Plissé Hor",
    },
  ],
  "plisse-hor-dakraam": [
    {
      slug: "duo-plisse-hor-verduisterend",
      anchor: "Wilt u bij uw dakraam ook verduisteren? Bekijk de Duo Plissé Hor Verduisterend",
    },
  ],
  "duo-plisse-hor-verduisterend": [
    {
      slug: "plisse-hor-dakraam",
      anchor: "Alleen insectenwering nodig, zonder verduistering? Bekijk de Plissé Hor Dakraam",
    },
  ],
  "plisse-hordeur-enkel": [
    {
      slug: "plisse-hordeur-dubbel",
      anchor: "Bredere deuropening? Bekijk de Plissé Hordeur (Dubbel)",
    },
  ],
  "plisse-hordeur-dubbel": [
    {
      slug: "plisse-hordeur-enkel",
      anchor: "Standaard deuropening? Bekijk de Plissé Hordeur (Enkel)",
    },
  ],
};

export function getRelatedProducts(slug: string): RelatedProductLink[] {
  return RELATED_PRODUCTS[slug] ?? [];
}
