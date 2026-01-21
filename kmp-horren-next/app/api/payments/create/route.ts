import { NextRequest, NextResponse } from "next/server";
import { getStripe, formatAmountForStripe, mapPaymentMethodToStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderNumber, amount, method, customerEmail, customerName } = body;

    // Validate required fields
    if (!orderId || !orderNumber || !amount) {
      return NextResponse.json(
        { error: "Ongeldige betalingsgegevens" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log("Stripe not configured, returning demo checkout URL");
      // Return demo URL for development
      return NextResponse.json({
        id: `demo_${orderId}`,
        checkoutUrl: `${appUrl}/bestelling/bevestiging?order=${orderNumber}&demo=true`,
        status: "open",
      });
    }

    try {
      const stripe = getStripe();

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: mapPaymentMethodToStripe(method),
        customer_email: customerEmail,
        client_reference_id: orderId,
        metadata: {
          orderId,
          orderNumber,
          customerName: customerName || "",
        },
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: `KMP Horren - Bestelling ${orderNumber}`,
                description: "Maatwerk horren op maat gemaakt",
              },
              unit_amount: formatAmountForStripe(amount),
            },
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/bestelling/bevestiging?order=${orderNumber}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/checkout?cancelled=true`,
        locale: "nl",
        // Expiration time: 30 minutes
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      });

      // In production, update order with Stripe session ID:
      // await supabase.from('orders').update({ stripeSessionId: session.id }).eq('id', orderId);

      console.log("Stripe checkout session created:", session.id);

      return NextResponse.json({
        id: session.id,
        checkoutUrl: session.url,
        status: session.status,
      });
    } catch (stripeError) {
      console.error("Stripe error:", stripeError);
      // Fallback to demo mode if Stripe fails
      return NextResponse.json({
        id: `fallback_${orderId}`,
        checkoutUrl: `${appUrl}/bestelling/bevestiging?order=${orderNumber}&demo=true`,
        status: "open",
      });
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het starten van de betaling" },
      { status: 500 }
    );
  }
}
