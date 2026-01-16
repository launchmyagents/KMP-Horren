import { create } from "zustand";
import { Product, Configuration, PriceCalculation } from "@/types";
import {
  COLORS,
  MESH_TYPES,
  PROFILE_DEPTHS,
  MIN_SURFACE_M2,
  getColorById,
  getMeshById,
  getProfileById,
} from "@/data/configurator";

interface ConfiguratorState {
  // Current product
  product: Product | null;
  
  // Configuration values
  widthMm: number;
  heightMm: number;
  colorId: string;
  meshId: string;
  profileId: string;
  frameTypeId: string;
  montageService: boolean;
  quantity: number;
  
  // Validation
  errors: Record<string, string>;
  
  // Computed values
  areaM2: number;
  priceCalculation: PriceCalculation | null;
  
  // Actions
  setProduct: (product: Product) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setColor: (colorId: string) => void;
  setMesh: (meshId: string) => void;
  setProfile: (profileId: string) => void;
  setFrameType: (frameTypeId: string) => void;
  setMontageService: (enabled: boolean) => void;
  setQuantity: (quantity: number) => void;
  
  // Helpers
  calculatePrice: () => void;
  validateDimensions: () => boolean;
  getConfiguration: () => Configuration;
  reset: () => void;
}

const initialState = {
  product: null,
  widthMm: 600,
  heightMm: 800,
  colorId: "ral9016",
  meshId: "grijs",
  profileId: "27mm",
  frameTypeId: "kunststof",
  montageService: false,
  quantity: 1,
  errors: {},
  areaM2: 0.48,
  priceCalculation: null,
};

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  ...initialState,

  setProduct: (product) => {
    set({
      product,
      widthMm: Math.max(product.minWidthMm, 600),
      heightMm: Math.max(product.minHeightMm, 800),
      errors: {},
    });
    get().calculatePrice();
  },

  setWidth: (widthMm) => {
    const { product, errors } = get();
    const newErrors = { ...errors };
    
    if (product) {
      if (widthMm < product.minWidthMm) {
        newErrors.width = `Minimale breedte is ${product.minWidthMm}mm`;
      } else if (widthMm > product.maxWidthMm) {
        newErrors.width = `Maximale breedte is ${product.maxWidthMm}mm`;
      } else {
        delete newErrors.width;
      }
    }
    
    set({ widthMm, errors: newErrors });
    get().calculatePrice();
  },

  setHeight: (heightMm) => {
    const { product, errors } = get();
    const newErrors = { ...errors };
    
    if (product) {
      if (heightMm < product.minHeightMm) {
        newErrors.height = `Minimale hoogte is ${product.minHeightMm}mm`;
      } else if (heightMm > product.maxHeightMm) {
        newErrors.height = `Maximale hoogte is ${product.maxHeightMm}mm`;
      } else {
        delete newErrors.height;
      }
    }
    
    set({ heightMm, errors: newErrors });
    get().calculatePrice();
  },

  setColor: (colorId) => {
    set({ colorId });
    get().calculatePrice();
  },

  setMesh: (meshId) => {
    set({ meshId });
    get().calculatePrice();
  },

  setProfile: (profileId) => {
    set({ profileId });
    get().calculatePrice();
  },

  setFrameType: (frameTypeId) => {
    set({ frameTypeId });
    get().calculatePrice();
  },

  setMontageService: (montageService) => {
    set({ montageService });
    get().calculatePrice();
  },

  setQuantity: (quantity) => {
    set({ quantity: Math.max(1, quantity) });
    get().calculatePrice();
  },

  calculatePrice: () => {
    const { product, widthMm, heightMm, colorId, meshId, profileId, montageService } = get();
    
    if (!product) {
      set({ priceCalculation: null, areaM2: 0 });
      return;
    }

    // Calculate area in m²
    const widthM = widthMm / 1000;
    const heightM = heightMm / 1000;
    let areaM2 = widthM * heightM;
    
    // Apply minimum surface area
    if (areaM2 < MIN_SURFACE_M2) {
      areaM2 = MIN_SURFACE_M2;
    }

    // Get options
    const color = getColorById(colorId);
    const mesh = getMeshById(meshId);
    const profile = getProfileById(profileId);

    // Calculate base price
    const basePrice = product.basePricePerM2 * areaM2;
    
    // Calculate surcharges
    const colorSurcharge = color?.surcharge || 0;
    const meshSurcharge = mesh?.surcharge || 0;
    const profileSurcharge = profile?.surcharge || 0;
    const optionsSurcharge = 0; // For future custom options
    const montageServicePrice = montageService ? 15 : 0;

    // Calculate unit price
    let unitPrice = basePrice + colorSurcharge + meshSurcharge + profileSurcharge + optionsSurcharge + montageServicePrice;
    
    // Apply minimum price
    if (unitPrice < product.minPrice) {
      unitPrice = product.minPrice;
    }

    // Round to 2 decimals
    unitPrice = Math.round(unitPrice * 100) / 100;

    const priceCalculation: PriceCalculation = {
      basePrice: Math.round(basePrice * 100) / 100,
      areaM2: Math.round(areaM2 * 100) / 100,
      colorSurcharge,
      meshSurcharge,
      profileSurcharge,
      optionsSurcharge,
      montageService: montageServicePrice,
      unitPrice,
    };

    set({ priceCalculation, areaM2: Math.round(areaM2 * 100) / 100 });
  },

  validateDimensions: () => {
    const { product, widthMm, heightMm } = get();
    
    if (!product) return false;
    
    return (
      widthMm >= product.minWidthMm &&
      widthMm <= product.maxWidthMm &&
      heightMm >= product.minHeightMm &&
      heightMm <= product.maxHeightMm
    );
  },

  getConfiguration: (): Configuration => {
    const { widthMm, heightMm, colorId, meshId, profileId, frameTypeId, montageService } = get();
    
    return {
      widthMm,
      heightMm,
      colorId,
      meshId,
      profileId,
      frameTypeId,
      customOptions: {},
      montageService,
    };
  },

  reset: () => {
    set(initialState);
  },
}));
