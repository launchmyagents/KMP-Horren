import { Color, MeshType, ProfileDepth, FrameType, MontageOption } from "@/types";

// ============================================
// KLEUREN (17 opties)
// ============================================
export const COLORS: Color[] = [
  { id: "ral9016", name: "Verkeerswit", ral: "RAL 9016", hex: "#F7F5F0", surcharge: 0 },
  { id: "ral9001", name: "Crèmewit", ral: "RAL 9001", hex: "#FDF4E3", surcharge: 0 },
  { id: "ral9010", name: "Zuiver wit", ral: "RAL 9010", hex: "#FFFFFF", surcharge: 0 },
  { id: "ral7016", name: "Antracietgrijs", ral: "RAL 7016", hex: "#383E42", surcharge: 0 },
  { id: "ral9005", name: "Gitzwart", ral: "RAL 9005", hex: "#0E0E10", surcharge: 0 },
  { id: "ral8014", name: "Sepiabruin", ral: "RAL 8014", hex: "#4A3526", surcharge: 15 },
  { id: "ral8017", name: "Chocoladebruin", ral: "RAL 8017", hex: "#45322E", surcharge: 15 },
  { id: "ral6009", name: "Dennengroen", ral: "RAL 6009", hex: "#27352A", surcharge: 15 },
  { id: "ral5011", name: "Staalblauw", ral: "RAL 5011", hex: "#1A2B3C", surcharge: 15 },
  { id: "ral3005", name: "Wijnrood", ral: "RAL 3005", hex: "#5E2028", surcharge: 15 },
  { id: "ral1015", name: "Licht ivoor", ral: "RAL 1015", hex: "#E6D2B5", surcharge: 10 },
  { id: "ral7035", name: "Lichtgrijs", ral: "RAL 7035", hex: "#C5C7C4", surcharge: 10 },
  { id: "ral7001", name: "Zilvergrijs", ral: "RAL 7001", hex: "#8C9196", surcharge: 10 },
  { id: "ral6005", name: "Mosgroen", ral: "RAL 6005", hex: "#0F4336", surcharge: 15 },
  { id: "ral7021", name: "Zwartgrijs", ral: "RAL 7021", hex: "#2F3234", surcharge: 10 },
  { id: "ral9007", name: "Grijs aluminium", ral: "RAL 9007", hex: "#8F8F8C", surcharge: 20 },
  { id: "custom", name: "Kleur op aanvraag", ral: "Op maat", hex: "#CCCCCC", surcharge: 45 },
];

// ============================================
// GAAS TYPES
// ============================================
export const MESH_TYPES: MeshType[] = [
  {
    id: "grijs",
    name: "Standaard Grijs",
    description: "Klassiek grijs gaas, goede doorschijnendheid",
    surcharge: 0,
  },
  {
    id: "zwart",
    name: "Zwart Gaas",
    description: "Beste doorzicht, nauwelijks zichtbaar",
    surcharge: 5,
  },
  {
    id: "bellavista",
    name: "Bellavista",
    description: "Premium gaas met optimaal doorzicht en ventilatie",
    surcharge: 15,
  },
  {
    id: "pollen",
    name: "Pollengaas",
    description: "Filtert pollen en fijnstof, ideaal bij hooikoorts",
    surcharge: 35,
  },
  {
    id: "huisdier",
    name: "Huisdierengaas",
    description: "Extra sterk petscreen, kras- en scheurbestendig",
    surcharge: 25,
  },
];

// ============================================
// PROFIEL DIEPTES
// ============================================
export const PROFILE_DEPTHS: ProfileDepth[] = [
  {
    id: "19mm",
    depthMm: 19,
    clearanceMm: 16,
    description: "Standaard profiel",
    suitableFor: "Kozijnen zonder obstakels",
    surcharge: 0,
  },
  {
    id: "27mm",
    depthMm: 27,
    clearanceMm: 24,
    description: "Middel profiel",
    suitableFor: "Kozijnen met klein ventilatierooster",
    surcharge: 10,
  },
  {
    id: "34mm",
    depthMm: 34,
    clearanceMm: 31,
    description: "Diep profiel",
    suitableFor: "Kozijnen met ventilatierooster of lekdorpel",
    surcharge: 18,
  },
  {
    id: "43mm",
    depthMm: 43,
    clearanceMm: 40,
    description: "Extra diep profiel",
    suitableFor: "Kozijnen met grote obstakels",
    surcharge: 25,
  },
];

// ============================================
// KOZIJN TYPES
// ============================================
export const FRAME_TYPES: FrameType[] = [
  {
    id: "kunststof",
    name: "Kunststof",
    description: "PVC / Kunststof kozijnen",
    surcharge: 0,
  },
  {
    id: "hout",
    name: "Hout",
    description: "Houten kozijnen",
    surcharge: 0,
  },
  {
    id: "aluminium",
    name: "Aluminium",
    description: "Aluminium kozijnen",
    surcharge: 5,
  },
];

// ============================================
// MONTAGE OPTIES
// ============================================
export const MONTAGE_OPTIONS: MontageOption[] = [
  {
    id: "zelf",
    name: "Zelf monteren",
    description: "Inclusief duidelijke montagehandleiding",
    pricePerUnit: 0,
  },
  {
    id: "montage",
    name: "Montage door KMP",
    description: "Wij monteren de hor voor u",
    pricePerUnit: 15,
  },
];

// ============================================
// VOORRIJKOSTEN
// ============================================
export const VOORRIJKOSTEN = 85; // Eenmalig bij inmeetservice of montage

// ============================================
// STAFFELKORTING
// ============================================
export const STAFFEL_KORTING = [
  { minQuantity: 1, discount: 0 },
  { minQuantity: 3, discount: 0.05 },  // 5%
  { minQuantity: 5, discount: 0.08 },  // 8%
  { minQuantity: 8, discount: 0.10 },  // 10%
  { minQuantity: 12, discount: 0.12 }, // 12%
];

// ============================================
// MINIMUM OPPERVLAKTE
// ============================================
export const MIN_SURFACE_M2 = 0.3; // Minimale oppervlakte voor prijsberekening

// ============================================
// GRATIS VERZENDING DREMPEL
// ============================================
export const FREE_SHIPPING_THRESHOLD = 250;
export const SHIPPING_COST = 9.95;

// ============================================
// HELPER FUNCTIES
// ============================================
export const getColorById = (id: string): Color | undefined => {
  return COLORS.find((c) => c.id === id);
};

export const getMeshById = (id: string): MeshType | undefined => {
  return MESH_TYPES.find((m) => m.id === id);
};

export const getProfileById = (id: string): ProfileDepth | undefined => {
  return PROFILE_DEPTHS.find((p) => p.id === id);
};

export const getFrameTypeById = (id: string): FrameType | undefined => {
  return FRAME_TYPES.find((f) => f.id === id);
};

export const getStaffelDiscount = (quantity: number): number => {
  const applicable = STAFFEL_KORTING
    .filter((s) => quantity >= s.minQuantity)
    .sort((a, b) => b.minQuantity - a.minQuantity);
  return applicable[0]?.discount || 0;
};
