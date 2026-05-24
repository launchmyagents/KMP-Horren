import { createClient, createAdminClient } from "./server";
import type {
  Profile,
  Address,
  DbProduct,
  DbColor,
  DbMeshType,
  DbProfileDepth,
  DbFrameType,
  DiscountCode,
  DbOrder,
  ContactMessage,
  InmeetserviceRequest,
  OrderWithItems,
  InsertTables,
  UpdateTables,
} from "./types";

// ============================================
// PROFILE FUNCTIONS
// ============================================

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data;
}

export async function updateProfile(
  userId: string,
  updates: UpdateTables<"profiles">
): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }
  return data;
}

export async function isUserAdmin(userId: string): Promise<boolean> {
  const profile = await getProfile(userId);
  return profile?.role === "admin";
}

// ============================================
// ADDRESS FUNCTIONS
// ============================================

export async function getUserAddresses(userId: string): Promise<Address[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false });

  if (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
  return data || [];
}

export async function createAddress(
  address: InsertTables<"addresses">
): Promise<Address | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("addresses")
    .insert(address)
    .select()
    .single();

  if (error) {
    console.error("Error creating address:", error);
    return null;
  }
  return data;
}

export async function updateAddress(
  addressId: string,
  updates: UpdateTables<"addresses">
): Promise<Address | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("addresses")
    .update(updates)
    .eq("id", addressId)
    .select()
    .single();

  if (error) {
    console.error("Error updating address:", error);
    return null;
  }
  return data;
}

export async function deleteAddress(addressId: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId);

  if (error) {
    console.error("Error deleting address:", error);
    return false;
  }
  return true;
}

// ============================================
// PRODUCT FUNCTIONS
// ============================================

export async function getProducts(): Promise<DbProduct[]> {
  // Use admin client to bypass RLS
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data || [];
}

export async function getProductBySlug(slug: string): Promise<DbProduct | null> {
  // Use admin client to bypass RLS
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

export async function getProductsByType(
  type: "WINDOW" | "DOOR"
): Promise<DbProduct[]> {
  // Use admin client to bypass RLS
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("type", type)
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("Error fetching products by type:", error);
    return [];
  }
  return data || [];
}

// ============================================
// ADMIN PRODUCT FUNCTIONS
// ============================================

export async function getAllProducts(): Promise<DbProduct[]> {
  // Use admin client to bypass RLS
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
  return data || [];
}

export async function getProductById(productId: string): Promise<DbProduct | null> {
  // Use admin client to bypass RLS
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
  return data;
}

export async function createProduct(
  product: InsertTables<"products">
): Promise<DbProduct | null> {
  // Use admin client to bypass RLS
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    return null;
  }
  return data;
}

export async function updateProduct(
  productId: string,
  updates: UpdateTables<"products">
): Promise<DbProduct | null> {
  // Use admin client to bypass RLS
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    return null;
  }
  return data;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  // Use admin client to bypass RLS
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.error("Error deleting product:", error);
    return false;
  }
  return true;
}

export async function uploadProductImage(
  productId: string,
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string | null> {
  // Use admin client to bypass RLS for storage
  const supabase = createAdminClient();
  
  // Generate unique file name
  const fileExtension = fileName.split(".").pop() || "jpg";
  const uniqueFileName = `${productId}/${Date.now()}.${fileExtension}`;
  
  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(uniqueFileName, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (uploadError) {
    console.error("Error uploading product image:", uploadError);
    return null;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(uniqueFileName);

  return urlData.publicUrl;
}

// ============================================
// CONFIGURATOR DATA FUNCTIONS
// ============================================

export async function getColors(): Promise<DbColor[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("colors")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
  return data || [];
}

export async function getMeshTypes(): Promise<DbMeshType[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mesh_types")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("Error fetching mesh types:", error);
    return [];
  }
  return data || [];
}

export async function getProfileDepths(): Promise<DbProfileDepth[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile_depths")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("Error fetching profile depths:", error);
    return [];
  }
  return data || [];
}

export async function getFrameTypes(): Promise<DbFrameType[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("frame_types")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("Error fetching frame types:", error);
    return [];
  }
  return data || [];
}

// ============================================
// DISCOUNT CODE FUNCTIONS
// ============================================

export async function validateDiscountCode(
  code: string,
  orderTotal: number
): Promise<DiscountCode | null> {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return null;
  }

  // Check validity period
  if (data.valid_from && new Date(data.valid_from) > new Date(now)) {
    return null;
  }
  if (data.valid_until && new Date(data.valid_until) < new Date(now)) {
    return null;
  }

  // Check minimum order value
  if (data.min_order_value && orderTotal < data.min_order_value) {
    return null;
  }

  // Check max uses
  if (data.max_uses && data.used_count >= data.max_uses) {
    return null;
  }

  return data;
}

export async function incrementDiscountCodeUsage(codeId: string): Promise<void> {
  const supabase = await createClient();
  await supabase.rpc("increment_discount_usage", { code_id: codeId });
}

// ============================================
// ORDER FUNCTIONS
// ============================================

export async function createOrder(
  order: InsertTables<"orders">,
  items: InsertTables<"order_items">[]
): Promise<OrderWithItems | null> {
  const supabase = await createClient();

  // Generate order number
  const { data: orderNumber } = await supabase.rpc("generate_order_number");

  // Insert order
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({ ...order, order_number: orderNumber })
    .select()
    .single();

  if (orderError || !orderData) {
    console.error("Error creating order:", orderError);
    return null;
  }

  // Insert order items
  const itemsWithOrderId = items.map((item) => ({
    ...item,
    order_id: orderData.id,
  }));

  const { data: itemsData, error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsWithOrderId)
    .select();

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    // Rollback order
    await supabase.from("orders").delete().eq("id", orderData.id);
    return null;
  }

  return { ...orderData, items: itemsData || [] };
}

export async function getOrderById(orderId: string): Promise<OrderWithItems | null> {
  const supabase = await createClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    console.error("Error fetching order:", orderError);
    return null;
  }

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  if (itemsError) {
    console.error("Error fetching order items:", itemsError);
    return null;
  }

  return { ...order, items: items || [] };
}

export async function getOrderByNumber(
  orderNumber: string
): Promise<OrderWithItems | null> {
  const supabase = await createClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .single();

  if (orderError || !order) {
    return null;
  }

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", order.id);

  return { ...order, items: items || [] };
}

export async function getUserOrders(userId: string): Promise<OrderWithItems[]> {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !orders) {
    console.error("Error fetching user orders:", error);
    return [];
  }

  // Fetch items for each order
  const ordersWithItems = await Promise.all(
    orders.map(async (order: DbOrder) => {
      const { data: items } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);
      return { ...order, items: items || [] };
    })
  );

  return ordersWithItems;
}

export async function updateOrderStatus(
  orderId: string,
  status: DbOrder["status"],
  additionalUpdates?: UpdateTables<"orders">
): Promise<DbOrder | null> {
  const supabase = await createClient();

  const updates: UpdateTables<"orders"> = {
    status,
    ...additionalUpdates,
  };

  if (status === "paid") {
    updates.paid_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status:", error);
    return null;
  }
  return data;
}

export async function updateOrderPayment(
  orderId: string,
  stripePaymentId: string,
  paymentMethod?: string
): Promise<DbOrder | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .update({
      stripe_payment_id: stripePaymentId,
      payment_method: paymentMethod,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order payment:", error);
    return null;
  }
  return data;
}

// ============================================
// ADMIN ORDER FUNCTIONS
// ============================================

export async function getAllOrders(
  limit = 50,
  offset = 0
): Promise<{ orders: OrderWithItems[]; total: number }> {
  const supabase = await createClient();

  // Get total count
  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // Get orders
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error || !orders) {
    console.error("Error fetching all orders:", error);
    return { orders: [], total: 0 };
  }

  // Fetch items for each order
  const ordersWithItems = await Promise.all(
    orders.map(async (order: DbOrder) => {
      const { data: items } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);
      return { ...order, items: items || [] };
    })
  );

  return { orders: ordersWithItems, total: count || 0 };
}

// ============================================
// CONTACT MESSAGE FUNCTIONS
// ============================================

export async function createContactMessage(
  message: InsertTables<"contact_messages">
): Promise<ContactMessage | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .insert(message)
    .select()
    .single();

  if (error) {
    console.error("Error creating contact message:", error);
    return null;
  }
  return data;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }
  return data || [];
}

export async function markMessageAsRead(messageId: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: true })
    .eq("id", messageId);

  if (error) {
    console.error("Error marking message as read:", error);
    return false;
  }
  return true;
}

// ============================================
// INMEETSERVICE REQUEST FUNCTIONS
// ============================================

export async function createInmeetserviceRequest(
  request: InsertTables<"inmeetservice_requests">
): Promise<InmeetserviceRequest | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inmeetservice_requests")
    .insert(request)
    .select()
    .single();

  if (error) {
    console.error("Error creating inmeetservice request:", error);
    return null;
  }
  return data;
}

export async function getInmeetserviceRequests(): Promise<InmeetserviceRequest[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inmeetservice_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inmeetservice requests:", error);
    return [];
  }
  return data || [];
}

export async function updateInmeetserviceStatus(
  requestId: string,
  status: InmeetserviceRequest["status"],
  adminNotes?: string
): Promise<InmeetserviceRequest | null> {
  const supabase = await createClient();

  const updates: UpdateTables<"inmeetservice_requests"> = { status };
  if (adminNotes !== undefined) {
    updates.admin_notes = adminNotes;
  }

  const { data, error } = await supabase
    .from("inmeetservice_requests")
    .update(updates)
    .eq("id", requestId)
    .select()
    .single();

  if (error) {
    console.error("Error updating inmeetservice status:", error);
    return null;
  }
  return data;
}
