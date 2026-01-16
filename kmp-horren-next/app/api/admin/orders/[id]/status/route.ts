import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { paymentConfirmationEmail } from "@/lib/email-templates/payment-confirmation";
import {
  shippingNotificationEmail,
  deliveredNotificationEmail,
} from "@/lib/email-templates/shipping-notification";
import { DEMO_ORDERS } from "@/data/demo-orders";
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

    // Find order (demo mode - search by id or orderNumber)
    const order = DEMO_ORDERS.find((o) => o.id === id || o.orderNumber === id);

    if (!order) {
      return NextResponse.json(
        { error: "Bestelling niet gevonden" },
        { status: 404 }
      );
    }

    const previousStatus = order.status;
    
    // In production, update in Supabase:
    // const { error } = await supabase
    //   .from('orders')
    //   .update({ status, adminNotes, updatedAt: new Date().toISOString() })
    //   .eq('id', id);

    console.log(`Order ${order.orderNumber} status updated: ${previousStatus} -> ${status}`);

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
        id: order.id,
        orderNumber: order.orderNumber,
        status,
        previousStatus,
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
