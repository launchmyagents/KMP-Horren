import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { sendEmail } from "@/lib/resend";
import { paymentConfirmationEmail } from "@/lib/email-templates/payment-confirmation";
import {
  shippingNotificationEmail,
  deliveredNotificationEmail,
} from "@/lib/email-templates/shipping-notification";
import { createAdminClient } from "@/lib/supabase/server";
import { OrderStatus, Order } from "@/types";

interface StatusUpdateBody {
  status: OrderStatus;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  estimatedDelivery?: string;
  adminNotes?: string;
  sendEmail?: boolean;
}

export async function PATCH(
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
    const body: StatusUpdateBody = await request.json();
    const { status, trackingNumber, trackingUrl, carrier, estimatedDelivery, adminNotes, sendEmail: shouldSendEmail = true } = body;

    // Validate status
    const validStatuses: OrderStatus[] = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Ongeldige status" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    
    // Try to find order by id first
    let { data: dbOrder, error: fetchError } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", id)
      .single();

    // If not found by id, try by order_number
    if (!dbOrder || fetchError) {
      const result = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("order_number", id)
        .single();
      
      dbOrder = result.data;
      fetchError = result.error;
    }

    if (!dbOrder || fetchError) {
      return NextResponse.json(
        { error: "Bestelling niet gevonden" },
        { status: 404 }
      );
    }

    const previousStatus = dbOrder.status;
    
    // Update order in Supabase
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status,
        admin_notes: adminNotes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", dbOrder.id);

    if (updateError) {
      console.error("Error updating order in Supabase:", updateError);
      return NextResponse.json(
        { error: "Er ging iets mis bij het bijwerken van de bestelling" },
        { status: 500 }
      );
    }

    console.log(`Order ${dbOrder.order_number} status updated: ${previousStatus} -> ${status}`);
    if (adminNotes !== undefined) {
      console.log(`Admin notes updated for order ${dbOrder.order_number}`);
    }

    // Transform database order to Order type for email
    const order: Order = {
      id: dbOrder.id,
      orderNumber: dbOrder.order_number,
      customerEmail: dbOrder.customer_email,
      customerFirstName: dbOrder.customer_first_name,
      customerLastName: dbOrder.customer_last_name,
      customerPhone: dbOrder.customer_phone,
      shippingStreet: dbOrder.shipping_street,
      shippingHouseNumber: dbOrder.shipping_house_number,
      shippingHouseNumberAddition: dbOrder.shipping_house_number_addition,
      shippingPostalCode: dbOrder.shipping_postal_code,
      shippingCity: dbOrder.shipping_city,
      subtotal: parseFloat(dbOrder.subtotal),
      discountAmount: parseFloat(dbOrder.discount_amount || "0"),
      discountCode: dbOrder.discount_code,
      shippingCost: parseFloat(dbOrder.shipping_cost || "0"),
      voorrijkosten: parseFloat(dbOrder.voorrijkosten || "0"),
      totalPrice: parseFloat(dbOrder.total_price),
      status: dbOrder.status,
      paymentMethod: dbOrder.payment_method,
      stripePaymentId: dbOrder.stripe_payment_id,
      paidAt: dbOrder.paid_at,
      customerNotes: dbOrder.customer_notes,
      adminNotes: dbOrder.admin_notes,
      createdAt: dbOrder.created_at,
      updatedAt: dbOrder.updated_at,
      items: (dbOrder.order_items || []).map((item: Record<string, unknown>) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        productName: item.product_name,
        widthMm: item.width_mm,
        heightMm: item.height_mm,
        areaM2: parseFloat(item.area_m2 as string),
        colorId: item.color_id,
        colorName: item.color_name,
        meshTypeId: item.mesh_type_id,
        meshTypeName: item.mesh_type_name,
        profileDepthId: item.profile_depth_id,
        profileDepthMm: item.profile_depth_mm,
        customOptions: item.custom_options || {},
        montageService: item.montage_service,
        unitPrice: parseFloat(item.unit_price as string),
        quantity: item.quantity,
        lineTotal: parseFloat(item.line_total as string),
      })),
    };

    // Send email notifications based on status change
    if (shouldSendEmail && order.customerEmail) {
      await sendStatusEmail(order, status, {
        trackingNumber,
        trackingUrl,
        carrier,
        estimatedDelivery,
      });
    }

    return NextResponse.json({
      success: true,
      order: {
        id: dbOrder.id,
        orderNumber: dbOrder.order_number,
        status,
        previousStatus,
        adminNotes,
      },
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het bijwerken van de status" },
      { status: 500 }
    );
  }
}

async function sendStatusEmail(
  order: Order,
  newStatus: OrderStatus,
  options: {
    trackingNumber?: string;
    trackingUrl?: string;
    carrier?: string;
    estimatedDelivery?: string;
  }
) {
  let emailHtml: string | null = null;
  let subject: string | null = null;

  switch (newStatus) {
    case "paid":
      subject = `Betaling ontvangen - Bestelling ${order.orderNumber}`;
      emailHtml = paymentConfirmationEmail({ order: { ...order, status: "paid" } });
      break;

    case "shipped":
      subject = `Je bestelling is verzonden - ${order.orderNumber}`;
      emailHtml = shippingNotificationEmail({
        order: { ...order, status: "shipped" },
        trackingNumber: options.trackingNumber,
        trackingUrl: options.trackingUrl,
        carrier: options.carrier,
        estimatedDelivery: options.estimatedDelivery,
      });
      break;

    case "delivered":
      subject = `Je bestelling is bezorgd - ${order.orderNumber}`;
      emailHtml = deliveredNotificationEmail({ order: { ...order, status: "delivered" } });
      break;

    // No email for other statuses
    default:
      return;
  }

  if (emailHtml && subject) {
    const result = await sendEmail({
      to: order.customerEmail,
      subject,
      html: emailHtml,
    });

    if (result.success) {
      console.log(`Status email sent to ${order.customerEmail} for status: ${newStatus}`);
    } else {
      console.error(`Failed to send status email: ${result.error}`);
    }
  }
}
