// Product Types
export type ProductType = "WINDOW" | "DOOR";

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  description: string;
  features: string[];
  basePricePerM2: number;
  minPrice: number;
  minWidthMm: number;
  maxWidthMm: number;
  minHeightMm: number;
  maxHeightMm: number;
  imageUrl: string;
  galleryUrls?: string[];
  options: string[];
  isActive: boolean;
  sortOrder: number;
}

// Color Types
export interface Color {
  id: string;
  name: string;
  ral: string;
  hex: string;
  surcharge: number;
}

// Mesh Types
export interface MeshType {
  id: string;
  name: string;
  description: string;
  surcharge: number;
}

// Profile Types
export interface ProfileDepth {
  id: string;
  depthMm: number;
  clearanceMm: number;
  description: string;
  suitableFor?: string;
  surcharge: number;
}

// Frame Types
export interface FrameType {
  id: string;
  name: string;
  description?: string;
  surcharge: number;
}

// Montage Option Types
export interface MontageOption {
  id: string;
  name: string;
  description: string;
  pricePerUnit: number;
}

// Product Option Types
export interface ProductOptionValue {
  value: string;
  label: string;
  surcharge?: number;
}

export interface ProductOption {
  key: string;
  label: string;
  type: "select" | "radio" | "toggle";
  hasPriceImpact: boolean;
  helpText?: string;
  values: ProductOptionValue[];
}

// Configuration Types
export interface Configuration {
  widthMm: number;
  heightMm: number;
  colorId: string;
  meshId: string;
  profileId: string;
  frameTypeId?: string;
  customOptions: Record<string, string>;
  montageService: boolean;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  configuration: Configuration;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  areaM2: number;
}

// Order Types
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone?: string;
  shippingStreet: string;
  shippingHouseNumber: string;
  shippingHouseNumberAddition?: string;
  shippingPostalCode: string;
  shippingCity: string;
  subtotal: number;
  discountAmount: number;
  discountCode?: string;
  shippingCost: number;
  voorrijkosten: number;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod?: string;
  stripePaymentId?: string;
  paidAt?: string;
  customerNotes?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  widthMm: number;
  heightMm: number;
  areaM2: number;
  colorId: string;
  colorName: string;
  meshTypeId: string;
  meshTypeName: string;
  profileDepthId?: string;
  profileDepthMm?: number;
  frameTypeId?: string;
  frameTypeName?: string;
  customOptions: Record<string, string>;
  montageService: boolean;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

// User Types
export type UserRole = "customer" | "admin";

export interface Profile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  houseNumber: string;
  houseNumberAddition?: string;
  postalCode: string;
  city: string;
  country: string;
  isDefault: boolean;
}

// Contact & Inmeetservice Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface InmeetserviceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status: "pending" | "contacted" | "scheduled" | "completed";
  adminNotes?: string;
  createdAt: string;
}

// Pricing Types
export interface PriceCalculation {
  basePrice: number;
  areaM2: number;
  colorSurcharge: number;
  meshSurcharge: number;
  profileSurcharge: number;
  optionsSurcharge: number;
  montageService: number;
  unitPrice: number;
}

// Discount Types
export interface DiscountCode {
  id: string;
  code: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue?: number;
  maxUses?: number;
  usedCount: number;
  validFrom?: string;
  validUntil?: string;
  isActive: boolean;
}

// Staffel Discount
export const STAFFEL_DISCOUNTS = [
  { minItems: 12, discount: 0.12 },
  { minItems: 8, discount: 0.1 },
  { minItems: 5, discount: 0.08 },
  { minItems: 3, discount: 0.05 },
] as const;

// Constants
export const COSTS = {
  montageService: 15.0,
  voorrijkosten: 85.0,
  minAreaM2: 0.25,
} as const;
