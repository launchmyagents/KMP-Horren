import { create } from "zustand";

export interface CustomerDetails {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  houseNumber: string;
  houseNumberAddition: string;
  postalCode: string;
  city: string;
  country: string;
  notes: string;
}

export interface CheckoutState {
  step: number;
  customerDetails: CustomerDetails;
  discountCode: string;
  discountAmount: number;
  discountType: "percentage" | "fixed" | null;
  isProcessing: boolean;
  orderId: string | null;
  paymentUrl: string | null;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCustomerDetails: (details: Partial<CustomerDetails>) => void;
  setDiscountCode: (code: string) => void;
  applyDiscount: (amount: number, type: "percentage" | "fixed") => void;
  clearDiscount: () => void;
  setProcessing: (isProcessing: boolean) => void;
  setOrderId: (orderId: string) => void;
  setPaymentUrl: (url: string) => void;
  resetCheckout: () => void;
}

const initialCustomerDetails: CustomerDetails = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  street: "",
  houseNumber: "",
  houseNumberAddition: "",
  postalCode: "",
  city: "",
  country: "Nederland",
  notes: "",
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  step: 1,
  customerDetails: initialCustomerDetails,
  discountCode: "",
  discountAmount: 0,
  discountType: null,
  isProcessing: false,
  orderId: null,
  paymentUrl: null,

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  setCustomerDetails: (details) =>
    set((state) => ({
      customerDetails: { ...state.customerDetails, ...details },
    })),

  setDiscountCode: (code) => set({ discountCode: code }),

  applyDiscount: (amount, type) =>
    set({ discountAmount: amount, discountType: type }),

  clearDiscount: () =>
    set({ discountCode: "", discountAmount: 0, discountType: null }),

  setProcessing: (isProcessing) => set({ isProcessing }),

  setOrderId: (orderId) => set({ orderId }),

  setPaymentUrl: (url) => set({ paymentUrl: url }),

  resetCheckout: () =>
    set({
      step: 1,
      customerDetails: initialCustomerDetails,
      discountCode: "",
      discountAmount: 0,
      discountType: null,
      isProcessing: false,
      orderId: null,
      paymentUrl: null,
    }),
}));
