import { NextRequest, NextResponse } from "next/server";
import { PaymentMethod } from "@mollie/api-client";
import { getMollieClient, formatAmountForMollie } from "@/lib/mollie";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderNumber, amount, method } = body;

    // Validate required fields
    if (!orderId || !orderNumber || !amount) {
      return NextResponse.json(
        { error: "Ongeldige betalingsgegevens" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kmp-horren.nl";

    // Check if Mollie is configured
    if (!process.env.MOLLIE_API_KEY) {
      console.log("Mollie not configured, returning demo checkout URL");
      // Return demo URL for development
      return NextResponse.json({
        id: `demo_${orderId}`,
        checkoutUrl: `${appUrl}/bestelling/bevestiging?order=${orderNumber}&demo=true`,
        status: "open",
      });
    }

    try {
      const mollieClient = getMollieClient();

      // Create Mollie payment
      const payment = await mollieClient.payments.create({
        amount: {
          currency: "EUR",
          value: formatAmountForMollie(amount),
        },
        description: `KMP Horren - Bestelling ${orderNumber}`,
        redirectUrl: `${appUrl}/bestelling/bevestiging?order=${orderNumber}`,
        webhookUrl: `${appUrl}/api/webhooks/mollie`,
        metadata: {
          orderId,
          orderNumber,
        },
        method: mapPaymentMethod(method),
      });

      // In production, update order with Mollie payment ID:
      // await supabase.from('orders').update({ molliePaymentId: payment.id }).eq('id', orderId);

      console.log("Mollie payment created:", payment.id);

      return NextResponse.json({
        id: payment.id,
        checkoutUrl: payment.getCheckoutUrl(),
        status: payment.status,
      });
    } catch (mollieError) {
      console.error("Mollie error:", mollieError);
      // Fallback to demo mode if Mollie fails
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

function mapPaymentMethod(method: string): PaymentMethod | undefined {
  const methodMap: Record<string, PaymentMethod> = {
    ideal: PaymentMethod.ideal,
    bancontact: PaymentMethod.bancontact,
    creditcard: PaymentMethod.creditcard,
    paypal: PaymentMethod.paypal,
    klarna: PaymentMethod.klarnapaylater,
  };
  return methodMap[method];
}
