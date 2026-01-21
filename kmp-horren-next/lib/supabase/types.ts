// ============================================
// SUPABASE DATABASE TYPES
// Auto-generated types matching the database schema
// ============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          role: "customer" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: "customer" | "admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: "customer" | "admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          street: string;
          house_number: string;
          house_number_addition: string | null;
          postal_code: string;
          city: string;
          country: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          street: string;
          house_number: string;
          house_number_addition?: string | null;
          postal_code: string;
          city: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          street?: string;
          house_number?: string;
          house_number_addition?: string | null;
          postal_code?: string;
          city?: string;
          country?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          type: "WINDOW" | "DOOR";
          description: string;
          features: string[];
          base_price_per_m2: number;
          min_price: number;
          min_width_mm: number;
          max_width_mm: number;
          min_height_mm: number;
          max_height_mm: number;
          image_url: string;
          gallery_urls: string[] | null;
          options: string[];
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          slug: string;
          type: "WINDOW" | "DOOR";
          description: string;
          features?: string[];
          base_price_per_m2: number;
          min_price: number;
          min_width_mm: number;
          max_width_mm: number;
          min_height_mm: number;
          max_height_mm: number;
          image_url: string;
          gallery_urls?: string[] | null;
          options?: string[];
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          type?: "WINDOW" | "DOOR";
          description?: string;
          features?: string[];
          base_price_per_m2?: number;
          min_price?: number;
          min_width_mm?: number;
          max_width_mm?: number;
          min_height_mm?: number;
          max_height_mm?: number;
          image_url?: string;
          gallery_urls?: string[] | null;
          options?: string[];
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      colors: {
        Row: {
          id: string;
          name: string;
          ral: string;
          hex: string;
          surcharge: number;
          is_active: boolean;
          sort_order: number;
        };
        Insert: {
          id: string;
          name: string;
          ral: string;
          hex: string;
          surcharge?: number;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          ral?: string;
          hex?: string;
          surcharge?: number;
          is_active?: boolean;
          sort_order?: number;
        };
      };
      mesh_types: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          surcharge: number;
          is_active: boolean;
          sort_order: number;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          surcharge?: number;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          surcharge?: number;
          is_active?: boolean;
          sort_order?: number;
        };
      };
      profile_depths: {
        Row: {
          id: string;
          depth_mm: number;
          clearance_mm: number;
          description: string | null;
          suitable_for: string | null;
          surcharge: number;
          is_active: boolean;
          sort_order: number;
        };
        Insert: {
          id: string;
          depth_mm: number;
          clearance_mm: number;
          description?: string | null;
          suitable_for?: string | null;
          surcharge?: number;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          depth_mm?: number;
          clearance_mm?: number;
          description?: string | null;
          suitable_for?: string | null;
          surcharge?: number;
          is_active?: boolean;
          sort_order?: number;
        };
      };
      frame_types: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          surcharge: number;
          is_active: boolean;
          sort_order: number;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          surcharge?: number;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          surcharge?: number;
          is_active?: boolean;
          sort_order?: number;
        };
      };
      discount_codes: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          discount_type: "percentage" | "fixed";
          discount_value: number;
          min_order_value: number | null;
          max_uses: number | null;
          used_count: number;
          valid_from: string | null;
          valid_until: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          description?: string | null;
          discount_type: "percentage" | "fixed";
          discount_value: number;
          min_order_value?: number | null;
          max_uses?: number | null;
          used_count?: number;
          valid_from?: string | null;
          valid_until?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          description?: string | null;
          discount_type?: "percentage" | "fixed";
          discount_value?: number;
          min_order_value?: number | null;
          max_uses?: number | null;
          used_count?: number;
          valid_from?: string | null;
          valid_until?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          customer_email: string;
          customer_first_name: string;
          customer_last_name: string;
          customer_phone: string | null;
          shipping_street: string;
          shipping_house_number: string;
          shipping_house_number_addition: string | null;
          shipping_postal_code: string;
          shipping_city: string;
          shipping_country: string;
          subtotal: number;
          discount_amount: number;
          discount_code: string | null;
          shipping_cost: number;
          voorrijkosten: number;
          total_price: number;
          status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
          payment_method: string | null;
          stripe_payment_id: string | null;
          paid_at: string | null;
          customer_notes: string | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id?: string | null;
          customer_email: string;
          customer_first_name: string;
          customer_last_name: string;
          customer_phone?: string | null;
          shipping_street: string;
          shipping_house_number: string;
          shipping_house_number_addition?: string | null;
          shipping_postal_code: string;
          shipping_city: string;
          shipping_country?: string;
          subtotal: number;
          discount_amount?: number;
          discount_code?: string | null;
          shipping_cost?: number;
          voorrijkosten?: number;
          total_price: number;
          status?: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
          payment_method?: string | null;
          stripe_payment_id?: string | null;
          paid_at?: string | null;
          customer_notes?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          customer_email?: string;
          customer_first_name?: string;
          customer_last_name?: string;
          customer_phone?: string | null;
          shipping_street?: string;
          shipping_house_number?: string;
          shipping_house_number_addition?: string | null;
          shipping_postal_code?: string;
          shipping_city?: string;
          shipping_country?: string;
          subtotal?: number;
          discount_amount?: number;
          discount_code?: string | null;
          shipping_cost?: number;
          voorrijkosten?: number;
          total_price?: number;
          status?: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
          payment_method?: string | null;
          stripe_payment_id?: string | null;
          paid_at?: string | null;
          customer_notes?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          width_mm: number;
          height_mm: number;
          area_m2: number;
          color_id: string;
          color_name: string;
          mesh_type_id: string;
          mesh_type_name: string;
          profile_depth_id: string | null;
          profile_depth_mm: number | null;
          frame_type_id: string | null;
          frame_type_name: string | null;
          custom_options: Record<string, string>;
          montage_service: boolean;
          unit_price: number;
          quantity: number;
          line_total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          width_mm: number;
          height_mm: number;
          area_m2: number;
          color_id: string;
          color_name: string;
          mesh_type_id: string;
          mesh_type_name: string;
          profile_depth_id?: string | null;
          profile_depth_mm?: number | null;
          frame_type_id?: string | null;
          frame_type_name?: string | null;
          custom_options?: Record<string, string>;
          montage_service?: boolean;
          unit_price: number;
          quantity?: number;
          line_total: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          width_mm?: number;
          height_mm?: number;
          area_m2?: number;
          color_id?: string;
          color_name?: string;
          mesh_type_id?: string;
          mesh_type_name?: string;
          profile_depth_id?: string | null;
          profile_depth_mm?: number | null;
          frame_type_id?: string | null;
          frame_type_name?: string | null;
          custom_options?: Record<string, string>;
          montage_service?: boolean;
          unit_price?: number;
          quantity?: number;
          line_total?: number;
          created_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
      inmeetservice_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          street: string;
          house_number: string;
          postal_code: string;
          city: string;
          preferred_date: string | null;
          preferred_time: string | null;
          notes: string | null;
          status: "pending" | "contacted" | "scheduled" | "completed";
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          street: string;
          house_number: string;
          postal_code: string;
          city: string;
          preferred_date?: string | null;
          preferred_time?: string | null;
          notes?: string | null;
          status?: "pending" | "contacted" | "scheduled" | "completed";
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          street?: string;
          house_number?: string;
          postal_code?: string;
          city?: string;
          preferred_date?: string | null;
          preferred_time?: string | null;
          notes?: string | null;
          status?: "pending" | "contacted" | "scheduled" | "completed";
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      generate_order_number: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: Record<string, never>;
  };
}

// ============================================
// HELPER TYPES
// ============================================

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// Convenience type aliases
export type Profile = Tables<"profiles">;
export type Address = Tables<"addresses">;
export type DbProduct = Tables<"products">;
export type DbColor = Tables<"colors">;
export type DbMeshType = Tables<"mesh_types">;
export type DbProfileDepth = Tables<"profile_depths">;
export type DbFrameType = Tables<"frame_types">;
export type DiscountCode = Tables<"discount_codes">;
export type DbOrder = Tables<"orders">;
export type DbOrderItem = Tables<"order_items">;
export type ContactMessage = Tables<"contact_messages">;
export type InmeetserviceRequest = Tables<"inmeetservice_requests">;

// Order with items
export type OrderWithItems = DbOrder & {
  items: DbOrderItem[];
};
