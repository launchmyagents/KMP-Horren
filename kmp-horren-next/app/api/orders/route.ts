import { NextRequest, NextResponse } from "next/server";
import { sendEmail, sendAdminNotification } from "@/lib/resend";
import { orderConfirmationEmail } from "@/lib/email-templates/order-confirmation";
import { orderAdminNotificationEmail } from "@/lib/email-templates/order-admin-notification";
import { createAdminClient } from "@/lib/supabase/server";
import { Order } from "@/types";
import { InsertTables } from "@/lib/supabase/types";

// Transform database order to frontend Order type
function transformDbOrderToOrder(
  dbOrder: Record<string, unknown>,
  items: Record<string, unknown>[]
): Order {
  return {
    id: dbOrder.id as string,
    orderNumber: dbOrder.order_number as string,
    userId: dbOrder.user_id as string | undefined,
    customerEmail: dbOrder.customer_email as string,
    customerFirstName: dbOrder.customer_first_name as string,
    customerLastName: dbOrder.customer_last_name as string,
    customerPhone: dbOrder.customer_phone as string | undefined,
    shippingStreet: dbOrder.shipping_street as string,
    shippingHouseNumber: dbOrder.shipping_house_number as string,
    shippingHouseNumberAddition: dbOrder.shipping_house_number_addition as string | undefined,
    shippingPostalCode: dbOrder.shipping_postal_code as string,
    shippingCity: dbOrder.shipping_city as string,
    subtotal: parseFloat(String(dbOrder.subtotal)),
    discountAmount: parseFloat(String(dbOrder.discount_amount || 0)),
    discountCode: dbOrder.discount_code as string | undefined,
    shippingCost: parseFloat(String(dbOrder.shipping_cost || 0)),
    voorrijkosten: parseFloat(String(dbOrder.voorrijkosten || 0)),
    totalPrice: parseFloat(String(dbOrder.total_price)),
    status: dbOrder.status as Order["status"],
    paymentMethod: dbOrder.payment_method as string | undefined,
    stripePaymentId: dbOrder.stripe_payment_id as string | undefined,
    paidAt: dbOrder.paid_at as string | undefined,
    customerNotes: dbOrder.customer_notes as string | undefined,
    adminNotes: dbOrder.admin_notes as string | undefined,
    createdAt: dbOrder.created_at as string,
    updatedAt: dbOrder.updated_at as string,
    items: items.map((item) => ({
      id: item.id as string,
      orderId: item.order_id as string,
      productId: item.product_id as string,
      productName: item.product_name as string,
      widthMm: item.width_mm as number,
      heightMm: item.height_mm as number,
      areaM2: parseFloat(String(item.area_m2)),
      colorId: item.color_id as string,
      colorName: item.color_name as string,
      meshTypeId: item.mesh_type_id as string,
      meshTypeName: item.mesh_type_name as string,
      profileDepthId: item.profile_depth_id as string | undefined,
      profileDepthMm: item.profile_depth_mm as number | undefined,
      frameTypeId: item.frame_type_id as string | undefined,
      frameTypeName: item.frame_type_name as string | undefined,
      customOptions: (item.custom_options as Record<string, string>) || {},
      montageService: item.montage_service as boolean,
      unitPrice: parseFloat(String(item.unit_price)),
      quantity: item.quantity as number,
      lineTotal: parseFloat(String(item.line_total)),
    })),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerDetails,
      items,
      subtotal,
      discountCode,
      discountAmount,
      shippingCost,
      voorrijkosten,
      totalPrice,
      paymentMethod,
    } = body;

    // Validate required fields
    if (!customerDetails || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Ongeldige bestelgegevens" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Generate order number using database function
    const { data: orderNumber, error: orderNumberError } = await supabase.rpc(
      "generate_order_number"
    );

    if (orderNumberError || !orderNumber) {
      console.error("Error generating order number:", orderNumberError);
      return NextResponse.json(
        { error: "Kon ordernummer niet genereren" },
        { status: 500 }
      );
    }

    // Prepare order data for database
    const orderData: InsertTables<"orders"> = {
      order_number: orderNumber,
      customer_email: customerDetails.email,
      customer_first_name: customerDetails.firstName,
      customer_last_name: customerDetails.lastName,
      customer_phone: customerDetails.phone || null,
      shipping_street: customerDetails.street,
      shipping_house_number: customerDetails.houseNumber,
      shipping_house_number_addition: customerDetails.houseNumberAddition || null,
      shipping_postal_code: customerDetails.postalCode,
      shipping_city: customerDetails.city,
      subtotal,
      discount_amount: discountAmount || 0,
      discount_code: discountCode || null,
      shipping_cost: shippingCost || 0,
      voorrijkosten: voorrijkosten || 0,
      total_price: totalPrice,
      status: "pending",
      payment_method: paymentMethod || null,
      customer_notes: customerDetails.notes || null,
    };

    // Insert order into database
    const { data: savedOrder, error: orderError } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (orderError || !savedOrder) {
      console.error("Error creating order:", orderError);
      return NextResponse.json(
        { error: "Kon bestelling niet opslaan" },
        { status: 500 }
      );
    }

    // Prepare order items for database
    const orderItems: InsertTables<"order_items">[] = items.map(
      (item: Record<string, unknown>) => ({
        order_id: savedOrder.id,
        product_id: item.productId as string,
        product_name: item.productName as string,
        width_mm: item.widthMm as number,
        height_mm: item.heightMm as number,
        area_m2: item.areaM2 as number,
        color_id: item.colorId as string,
        color_name: item.colorName || item.colorId as string,
        mesh_type_id: item.meshTypeId as string,
        mesh_type_name: item.meshTypeName || item.meshTypeId as string,
        profile_depth_id: (item.profileDepthId as string) || null,
        profile_depth_mm: (item.profileDepthMm as number) || null,
        frame_type_id: (item.frameTypeId as string) || null,
        frame_type_name: (item.frameTypeName as string) || null,
        custom_options: (item.customOptions as Record<string, string>) || {},
        montage_service: (item.montageService as boolean) || false,
        unit_price: item.unitPrice as number,
        quantity: (item.quantity as number) || 1,
        line_total: item.lineTotal as number,
      })
    );

    // Insert order items into database
    const { data: savedItems, error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems)
      .select();

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      // Rollback: delete the order if items failed
      await supabase.from("orders").delete().eq("id", savedOrder.id);
      return NextResponse.json(
        { error: "Kon bestelitems niet opslaan" },
        { status: 500 }
      );
    }

    // Transform to frontend Order type for email
    const order = transformDbOrderToOrder(savedOrder, savedItems || []);

    console.log("Order created:", order.orderNumber);

    // Send order confirmation email to customer
    if (order.customerEmail) {
      const emailResult = await sendEmail({
        to: order.customerEmail,
        subject: `Orderbevestiging ${order.orderNumber} - KMP Horren`,
        html: orderConfirmationEmail({ order }),
      });

      if (emailResult.success) {
        console.log(`Order confirmation email sent to ${order.customerEmail}`);
      } else {
        console.error(`Failed to send order confirmation: ${emailResult.error}`);
      }
    }

    // Send notification email to admin
    const adminEmailResult = await sendAdminNotification(
      `Nieuwe bestelling ${order.orderNumber}`,
      orderAdminNotificationEmail({ order }),
      order.customerEmail // Reply-to customer email
    );

    if (adminEmailResult.success) {
      console.log(`Admin notification email sent for order ${order.orderNumber}`);
    } else {
      console.error(`Failed to send admin notification: ${adminEmailResult.error}`);
    }

    return NextResponse.json({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het aanmaken van de bestelling" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber");

  if (!orderNumber) {
    return NextResponse.json(
      { error: "Ordernummer is verplicht" },
      { status: 400 }
    );
  }

  try {
    const supabase = createAdminClient();

    // Fetch order from database
    const { data: dbOrder, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", orderNumber)
      .single();

    if (orderError || !dbOrder) {
      return NextResponse.json(
        { error: "Bestelling niet gevonden" },
        { status: 404 }
      );
    }

    // Fetch order items
    const { data: items } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", dbOrder.id);

    const order = transformDbOrderToOrder(dbOrder, items || []);

    return NextResponse.json({
      order,
      message: "Order gevonden",
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van de bestelling" },
      { status: 500 }
    );
  }
}
