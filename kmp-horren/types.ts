export enum ProductType {
  WINDOW = 'WINDOW',
  DOOR = 'DOOR',
  SERVICE = 'SERVICE'
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  basePricePerM2: number;
  minPrice: number;
  description: string;
  image: string;
  features: string[];
}

export interface ColorOption {
  id: string;
  name: string;
  ral: string;
  hex: string;
  surcharge: number;
}

export interface MeshOption {
  id: string;
  name: string;
  description: string;
  surcharge: number;
}

export interface ProfileOption {
  id: string;
  depthMm: number;
  description: string;
  surcharge: number;
}

export interface Configuration {
  widthMm: number;
  heightMm: number;
  colorId: string;
  meshId: string;
  profileId: string;
  montageService: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  configuration: Configuration;
  totalPrice: number;
  areaM2: number;
}
