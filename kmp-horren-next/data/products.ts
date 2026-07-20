import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  // ============================================
  // RAAMHORREN (4 producten)
  // ============================================
  {
    id: "luxe-inzethor",
    name: "Luxe Inzethor",
    slug: "luxe-inzethor",
    type: "WINDOW",
    basePricePerM2: 65.0,
    minPrice: 64.0,
    minWidthMm: 300,
    maxWidthMm: 1500,
    minHeightMm: 300,
    maxHeightMm: 2000,
    description:
      "De ideale oplossing voor draai-kiep ramen. Klemt zichzelf vast zonder boren of schroeven.",
    features: [
      "Geschikt voor draai-kiep ramen",
      "Geen boren of schroeven nodig",
      "Eenvoudig uitneembaar",
      "Strak aluminium profiel",
    ],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    options: ["profileDepth", "frameType"],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "inzet-plisse-hor",
    name: "Inzet Plissé Hor",
    slug: "inzet-plisse-hor",
    type: "WINDOW",
    basePricePerM2: 85.0,
    minPrice: 100.0,
    minWidthMm: 300,
    maxWidthMm: 1800,
    minHeightMm: 300,
    maxHeightMm: 2400,
    description:
      "Luxe hor met geplisseerd gaas. Decoratief en functioneel, ideaal voor grote ramen.",
    features: [
      "Geplisseerd gaas",
      "Geruisloze bediening",
      "Modern design",
      "Ruimtebesparend",
    ],
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    options: ["profileDepth", "frameType", "foldDirection"],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "voorzethor",
    name: "Voorzethor",
    slug: "voorzethor",
    type: "WINDOW",
    basePricePerM2: 60.0,
    minPrice: 55.0,
    minWidthMm: 300,
    maxWidthMm: 1500,
    minHeightMm: 300,
    maxHeightMm: 2000,
    description:
      "Wordt op het kozijn geplaatst. Ideaal bij onvoldoende inbouwdiepte.",
    features: [
      "Montage op kozijn",
      "Geschikt bij weinig inbouwruimte",
      "Duurzaam aluminium",
      "Diverse kleuren",
    ],
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    options: ["frameType"],
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "plisse-hor-dakraam",
    name: "Plissé Hor Dakraam",
    slug: "plisse-hor-dakraam",
    type: "WINDOW",
    basePricePerM2: 110.0,
    minPrice: 95.0,
    minWidthMm: 400,
    maxWidthMm: 1200,
    minHeightMm: 500,
    maxHeightMm: 1800,
    description:
      "Speciaal ontworpen voor dakramen. Compatibel met Velux en Fakro.",
    features: [
      "Geschikt voor dakramen",
      "Velux/Fakro compatibel",
      "Plissé systeem",
      "UV-bestendig gaas",
    ],
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    options: ["roofWindowBrand", "roofWindowSize"],
    isActive: true,
    sortOrder: 4,
  },

  // ============================================
  // DEURHORREN (2 producten)
  // ============================================
  {
    id: "plisse-hordeur-enkel",
    name: "Plissé Hordeur (Enkel)",
    slug: "plisse-hordeur-enkel",
    type: "DOOR",
    basePricePerM2: 120.0,
    minPrice: 215.0,
    minWidthMm: 600,
    maxWidthMm: 1200,
    minHeightMm: 1800,
    maxHeightMm: 2600,
    description:
      "De meest verkochte hordeur van Nederland. Gebruiksvriendelijk en duurzaam.",
    features: [
      "Kindvriendelijk",
      "Lage ondergeleider",
      "Blijft op elke stand staan",
      "Geruisloos",
    ],
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    options: ["hingeSide", "handleType"],
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "plisse-hordeur-dubbel",
    name: "Plissé Hordeur (Dubbel)",
    slug: "plisse-hordeur-dubbel",
    type: "DOOR",
    basePricePerM2: 140.0,
    minPrice: 350.0,
    minWidthMm: 1200,
    maxWidthMm: 2400,
    minHeightMm: 1800,
    maxHeightMm: 2600,
    description:
      "Dubbele uitvoering voor brede doorgangen. Twee plissédelen die in het midden sluiten.",
    features: [
      "Voor brede doorgangen",
      "Twee plissédelen",
      "Magnetische sluiting",
      "Symmetrisch design",
    ],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    options: ["handleType"],
    isActive: true,
    sortOrder: 6,
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find((p) => p.slug === slug);
};

export const getProductsByType = (type: "WINDOW" | "DOOR"): Product[] => {
  return PRODUCTS.filter((p) => p.type === type && p.isActive).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
};

export const getFeaturedProducts = (count: number = 4): Product[] => {
  return PRODUCTS.filter((p) => p.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, count);
};
