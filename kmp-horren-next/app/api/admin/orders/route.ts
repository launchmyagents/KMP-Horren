import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";
import { Order } from "@/types";

// Transform database order to Order type
function transformDbOrder(dbOrder: Record<string, unknown>): Order {
  return {
    id: dbOrder.id as string,
    orderNumber: dbOrder.order_number as string,
    customerEmail: dbOrder.customer_email as string,
    customerFirstName: dbOrder.customer_first_name as string,
    customerLastName: dbOrder.customer_last_name as string,
    customerPhone: dbOrder.customer_phone as string | undefined,
    shippingStreet: dbOrder.shipping_street as string,
    shippingHouseNumber: dbOrder.shipping_house_number as string,
    shippingHouseNumberAddition: dbOrder.shipping_house_number_addition as string | undefined,
    shippingPostalCode: dbOrder.shipping_postal_code as string,
    shippingCity: dbOrder.shipping_city as string,
    subtotal: parseFloat(dbOrder.subtotal as string),
    discountAmount: parseFloat((dbOrder.discount_amount as string) || "0"),
    discountCode: dbOrder.discount_code as string | undefined,
    shippingCost: parseFloat((dbOrder.shipping_cost as string) || "0"),
    voorrijkosten: parseFloat((dbOrder.voorrijkosten as string) || "0"),
    totalPrice: parseFloat(dbOrder.total_price as string),
    status: dbOrder.status as Order["status"],
    paymentMethod: dbOrder.payment_method as string | undefined,
    stripePaymentId: dbOrder.stripe_payment_id as string | undefined,
    paidAt: dbOrder.paid_at as string | undefined,
    customerNotes: dbOrder.customer_notes as string | undefined,
    adminNotes: dbOrder.admin_notes as string | undefined,
    createdAt: dbOrder.created_at as string,
    updatedAt: dbOrder.updated_at as string,
    items: ((dbOrder.order_items as Record<string, unknown>[]) || []).map((item) => ({
      id: item.id as string,
      orderId: item.order_id as string,
      productId: item.product_id as string,
      productName: item.product_name as string,
      widthMm: item.width_mm as number,
      heightMm: item.height_mm as number,
      areaM2: parseFloat(item.area_m2 as string),
      colorId: item.color_id as string,
      colorName: item.color_name as string,
      meshTypeId: item.mesh_type_id as string,
      meshTypeName: item.mesh_type_name as string,
      profileDepthId: item.profile_depth_id as string | undefined,
      profileDepthMm: item.profile_depth_mm as number | undefined,
      customOptions: (item.custom_options as Record<string, string>) || {},
      montageService: item.montage_service as boolean,
      unitPrice: parseFloat(item.unit_price as string),
      quantity: item.quantity as number,
      lineTotal: parseFloat(item.line_total as string),
    })),
  };
}

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const supabase = createAdminClient();

    // Build query
    let query = supabase
      .from("orders")
      .select("*, order_items(*)", { count: "exact" })
      .order("created_at", { ascending: false });

    // Filter by status
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // Filter by search
    if (search) {
      query = query.or(
        `order_number.ilike.%${search}%,customer_email.ilike.%${search}%,customer_first_name.ilike.%${search}%,customer_last_name.ilike.%${search}%`
      );
    }

    // Paginate
    const start = (page - 1) * limit;
    query = query.range(start, start + limit - 1);

    const { data: dbOrders, error, count } = await query;

    if (error) {
      console.error("Error fetching orders from Supabase:", error);
      return NextResponse.json(
        { error: "Er ging iets mis bij het ophalen van bestellingen" },
        { status: 500 }
      );
    }

    const orders = (dbOrders || []).map(transformDbOrder);
    
    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total: count || orders.length,
        totalPages: Math.ceil((count || orders.length) / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van bestellingen" },
      { status: 500 }
    );
  }
}
