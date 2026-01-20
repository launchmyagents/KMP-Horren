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
    molliePaymentId: dbOrder.mollie_payment_id as string | undefined,
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { id } = await params;
    const supabase = createAdminClient();

    // Try to find order by id first
    let { data: dbOrder, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", id)
      .single();

    // If not found by id, try by order_number
    if (!dbOrder || error) {
      const result = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("order_number", id)
        .single();
      
      dbOrder = result.data;
      error = result.error;
    }

    if (error || !dbOrder) {
      return NextResponse.json(
        { error: "Bestelling niet gevonden" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      order: transformDbOrder(dbOrder),
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van de bestelling" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { id } = await params;
    const supabase = createAdminClient();

    // First check if order exists
    const { data: existingOrder, error: findError } = await supabase
      .from("orders")
      .select("id, order_number")
      .eq("id", id)
      .single();

    if (findError || !existingOrder) {
      return NextResponse.json(
        { error: "Bestelling niet gevonden" },
        { status: 404 }
      );
    }

    // Delete the order (order_items will be deleted via CASCADE)
    const { error: deleteError } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting order:", deleteError);
      return NextResponse.json(
        { error: "Er ging iets mis bij het verwijderen van de bestelling" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Bestelling ${existingOrder.order_number} is verwijderd`,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het verwijderen van de bestelling" },
      { status: 500 }
    );
  }
}
