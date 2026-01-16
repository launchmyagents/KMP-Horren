import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, Configuration } from "@/types";
import {
  getStaffelDiscount,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  VOORRIJKOSTEN,
  getColorById,
  getMeshById,
  getProfileById,
} from "@/data/configurator";

interface CartState {
  items: CartItem[];
  
  // Computed values
  itemCount: number;
  subtotal: number;
  staffelDiscount: number;
  staffelDiscountAmount: number;
  shippingCost: number;
  voorrijkosten: number;
  total: number;
  
  // Actions
  addItem: (product: Product, configuration: Configuration, unitPrice: number, areaM2: number, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Helpers
  recalculateTotals: () => void;
  hasMontageService: () => boolean;
}

const generateItemId = (): string => {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,
      staffelDiscount: 0,
      staffelDiscountAmount: 0,
      shippingCost: 0,
      voorrijkosten: 0,
      total: 0,

      addItem: (product, configuration, unitPrice, areaM2, quantity = 1) => {
        const { items } = get();
        
        const newItem: CartItem = {
          id: generateItemId(),
          product,
          configuration,
          quantity,
          unitPrice,
          lineTotal: unitPrice * quantity,
          areaM2,
        };

        set({ items: [...items, newItem] });
        get().recalculateTotals();
      },

      removeItem: (itemId) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== itemId) });
        get().recalculateTotals();
      },

      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const updatedItems = items.map((item) =>
          item.id === itemId
            ? { ...item, quantity, lineTotal: item.unitPrice * quantity }
            : item
        );

        set({ items: updatedItems });
        get().recalculateTotals();
      },

      clearCart: () => {
        set({
          items: [],
          itemCount: 0,
          subtotal: 0,
          staffelDiscount: 0,
          staffelDiscountAmount: 0,
          shippingCost: 0,
          voorrijkosten: 0,
          total: 0,
        });
      },

      recalculateTotals: () => {
        const { items } = get();
        
        // Calculate item count and subtotal
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
        
        // Calculate staffel discount
        const staffelDiscount = getStaffelDiscount(itemCount);
        const staffelDiscountAmount = Math.round(subtotal * staffelDiscount * 100) / 100;
        
        // Calculate subtotal after discount
        const subtotalAfterDiscount = subtotal - staffelDiscountAmount;
        
        // Calculate shipping
        const shippingCost = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        
        // Check if any item has montage service
        const hasMontage = items.some((item) => item.configuration.montageService);
        const voorrijkosten = hasMontage ? VOORRIJKOSTEN : 0;
        
        // Calculate total
        const total = Math.round((subtotalAfterDiscount + shippingCost + voorrijkosten) * 100) / 100;

        set({
          itemCount,
          subtotal: Math.round(subtotal * 100) / 100,
          staffelDiscount,
          staffelDiscountAmount,
          shippingCost,
          voorrijkosten,
          total,
        });
      },

      hasMontageService: () => {
        const { items } = get();
        return items.some((item) => item.configuration.montageService);
      },
    }),
    {
      name: "kmp-cart-storage",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        // Recalculate totals after rehydration
        if (state) {
          state.recalculateTotals();
        }
      },
    }
  )
);
