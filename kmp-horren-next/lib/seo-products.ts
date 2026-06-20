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
      "Inzethor op maat voor draai-kiepramen — klemt zichzelf vast zonder boren. Vanaf €64. ✓ Maatwerk ✓ Gratis verzending vanaf €250 ✓ 3 jaar garantie",
    h1: "Luxe inzethor op maat",
  },

  "inzet-plisse-hor": {
    title: "Inzet plissé hor op maat | Raamhor",
    description:
      "Inzet plissé hor op maat met geplisseerd gaas — decoratief én functioneel, ideaal voor grote ramen. Vanaf €100. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Inzet plissé hor op maat",
  },

  "luxe-rolhor": {
    title: "Rolhor voor raam op maat | Soft-close",
    description:
      "Rolhor voor uw raam op maat met soft-close systeem — perfect voor naar buiten draaiende ramen. Vanaf €90. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Luxe rolhor voor raam op maat",
  },

  "luxe-klemhor": {
    title: "Klemhor op maat | Zonder boren plaatsen",
    description:
      "Klemhor op maat, eenvoudig te plaatsen zonder boren — ideaal voor huurwoningen. Vanaf €65. ✓ Maatwerk ✓ Gratis verzending vanaf €250 ✓ 3 jaar garantie",
    h1: "Luxe klemhor op maat",
  },

  "luxe-veerstifthor": {
    title: "Veerstifthor op maat | Onzichtbare montage",
    description:
      "Veerstifthor op maat met onzichtbare bevestiging — strak resultaat voor elk kozijn. Vanaf €62. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Luxe veerstifthor op maat",
  },

  "voorzethor": {
    title: "Voorzethor op maat | Op het kozijn",
    description:
      "Voorzethor op maat, geplaatst op het kozijn — dé oplossing bij onvoldoende inbouwdiepte. Vanaf €55. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Voorzethor op maat",
  },

  "vaste-raamhor": {
    title: "Vaste raamhor op maat | Voor vaste ramen",
    description:
      "Vaste raamhor op maat — permanente, robuuste en onderhoudsarme hor voor vaste ramen. Vanaf €50. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Vaste raamhor op maat",
  },

  "plisse-hor-dakraam": {
    title: "Dakraamhor op maat | Velux & Fakro",
    description:
      "Plissé dakraamhor op maat, compatibel met Velux en Fakro — speciaal voor dakramen. Vanaf €95. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Plissé hor voor dakraam op maat",
  },

  // ---------- DEURHORREN ----------

  "plisse-hordeur-enkel": {
    title: "Plissé hordeur op maat (enkel)",
    description:
      "Plissé hordeur op maat — de meest verkochte hordeur van Nederland, gebruiksvriendelijk en duurzaam. Vanaf €215. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Plissé hordeur op maat (enkel)",
  },

  "plisse-hordeur-dubbel": {
    title: "Dubbele plissé hordeur op maat",
    description:
      "Dubbele plissé hordeur op maat voor brede doorgangen — twee plissédelen die in het midden sluiten. Vanaf €350. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Dubbele plissé hordeur op maat",
  },

  "scharnier-hordeur": {
    title: "Scharnier hordeur op maat",
    description:
      "Scharnier hordeur op maat — klassieke, robuuste hordeur met scharnieren en tijdloos design. Vanaf €250. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Scharnier hordeur op maat",
  },

  "royal-22-enkel": {
    title: "Royal 22 hordeur op maat | Slank 22 mm",
    description:
      "Royal 22 hordeur op maat — premium scharnierdeur met slank 22 mm-profiel en maximale sterkte. Vanaf €240. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Royal 22 hordeur op maat",
  },

  "royal-32-enkel": {
    title: "Royal 32 hordeur op maat | Extra stevig",
    description:
      "Royal 32 hordeur op maat met extra stevig 32 mm-profiel — ideaal voor intensief gebruik. Vanaf €260. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Royal 32 hordeur op maat",
  },

  "royal-32-dubbel": {
    title: "Royal 32 dubbele hordeur op maat",
    description:
      "Royal 32 dubbele hordeur op maat — dubbele openslaande deur, perfect voor tuindeuren en terrassen. Vanaf €420. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Royal 32 dubbele hordeur op maat",
  },

  "schuifpui-hor": {
    title: "Schuifpui hor op maat | Voor schuifpuien",
    description:
      "Schuifpui hor op maat — glijdt soepel mee met uw schuifpui, speciaal voor grote openingen. Vanaf €280. ✓ Maatwerk ✓ 3 jaar garantie",
    h1: "Schuifpui hor op maat",
  },
};

export function getProductSeo(slug: string): ProductSeo | undefined {
  return PRODUCT_SEO[slug];
}
