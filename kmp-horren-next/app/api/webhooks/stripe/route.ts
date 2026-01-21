import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/resend";
import { paymentConfirmationEmail } from "@/lib/email-templates/payment-confirmation";
import { createAdminClient } from "@/lib/supabase/server";
import { Order } from "@/types";
import Stripe from "stripe";

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
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log("Stripe webhook received but not configured");
      return NextResponse.json({ received: true });
    }

    if (!signature) {
      console.error("No Stripe signature found");
      return NextResponse.json(
        { error: "No signature" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    // Verify webhook signature
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 400 }
        );
      }
    } else {
      // In development without webhook secret, parse the event directly
      console.warn("STRIPE_WEBHOOK_SECRET not set, skipping signature verification");
      event = JSON.parse(body) as Stripe.Event;
    }

    console.log("Stripe webhook received:", {
      type: event.type,
      id: event.id,
    });

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionExpired(session);
        break;
      }
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent succeeded:", paymentIntent.id);
        // Usually handled via checkout.session.completed
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent failed:", paymentIntent.id);
        // Could update order status to failed
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    // Return 200 to prevent Stripe from retrying
    return NextResponse.json({ received: true, error: "Processing error" });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  const orderNumber = session.metadata?.orderNumber;

  if (!orderId || !orderNumber) {
    console.error("No orderId or orderNumber in session metadata");
    return;
  }

  const supabase = createAdminClient();

  // Update order status in database
  const { error: updateError } = await supabase
    .from("orders")
    .update({
      status: "paid",
      stripe_payment_id: session.payment_intent as string,
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (updateError) {
    console.error("Error updating order status:", updateError);
    return;
  }

  console.log(`Order ${orderNumber} marked as paid at ${new Date().toISOString()}`);

  // Fetch order from database for email
  const { data: dbOrder, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (fetchError || !dbOrder) {
    console.error("Error fetching order for email:", fetchError);
    return;
  }

  // Fetch order items
  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  const order = transformDbOrderToOrder(dbOrder, items || []);

  // Get payment method from session
  const paymentMethodType = session.payment_method_types?.[0] || "card";
  const paymentMethodMap: Record<string, string> = {
    card: "Creditcard",
    ideal: "iDEAL",
    bancontact: "Bancontact",
    klarna: "Klarna",
    paypal: "PayPal",
  };

  // Send payment confirmation email
  const emailResult = await sendEmail({
    to: order.customerEmail,
    subject: `Betaling ontvangen - Bestelling ${order.orderNumber}`,
    html: paymentConfirmationEmail({
      order: {
        ...order,
        status: "paid",
        paidAt: new Date().toISOString(),
        paymentMethod: paymentMethodMap[paymentMethodType] || paymentMethodType,
      },
    }),
  });

  if (emailResult.success) {
    console.log(`Payment confirmation email sent to ${order.customerEmail}`);
  } else {
    console.error(`Failed to send payment confirmation: ${emailResult.error}`);
  }
}

async function handleCheckoutSessionExpired(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  const orderNumber = session.metadata?.orderNumber;

  if (!orderId || !orderNumber) {
    return;
  }

  const supabase = createAdminClient();

  // Update order status to cancelled
  const { error: updateError } = await supabase
    .from("orders")
    .update({
      status: "cancelled",
      admin_notes: "Betaling verlopen - checkout sessie is vervallen",
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (updateError) {
    console.error("Error updating expired order:", updateError);
    return;
  }

  console.log(`Checkout session expired for order ${orderNumber}, status set to cancelled`);
}
