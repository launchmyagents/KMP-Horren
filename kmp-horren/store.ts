import { create } from 'zustand';
import { CartItem } from './types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
  total: () => {
    const baseTotal = get().items.reduce((sum, item) => sum + item.totalPrice, 0);
    // Staffel logic can be applied here
    let discount = 0;
    const count = get().items.length;
    if (count >= 12) discount = 0.12;
    else if (count >= 8) discount = 0.10;
    else if (count >= 5) discount = 0.08;
    else if (count >= 3) discount = 0.05;
    
    return baseTotal * (1 - discount);
  }
}));
