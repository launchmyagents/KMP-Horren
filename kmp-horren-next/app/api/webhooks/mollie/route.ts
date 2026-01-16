import { NextRequest, NextResponse } from "next/server";
import { getMollieClient } from "@/lib/mollie";
import { sendEmail } from "@/lib/resend";
import { paymentConfirmationEmail } from "@/lib/email-templates/payment-confirmation";
import { DEMO_ORDERS } from "@/data/demo-orders";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const paymentId = body.get("id") as string;

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    // Check if Mollie is configured
    if (!process.env.MOLLIE_API_KEY) {
      console.log("Mollie webhook received but not configured:", paymentId);
      return NextResponse.json({ received: true });
    }

    const mollieClient = getMollieClient();

    // Fetch payment details from Mollie
    const payment = await mollieClient.payments.get(paymentId);

    console.log("Mollie webhook received:", {
      paymentId: payment.id,
      status: payment.status,
      metadata: payment.metadata,
    });

    const metadata = payment.metadata as { orderId?: string; orderNumber?: string } | undefined;
    const orderId = metadata?.orderId;
    const orderNumber = metadata?.orderNumber;

    if (!orderId) {
      console.error("No orderId in payment metadata");
      return NextResponse.json({ received: true });
    }

    // Update order status based on payment status
    let orderStatus: string;

    switch (payment.status) {
      case "paid":
        orderStatus = "paid";
        console.log(`Order ${orderNumber} marked as paid at ${new Date().toISOString()}`);
        
        // Send payment confirmation email
        // In production, fetch order from database. For demo, use mock data or construct order object
        const order = DEMO_ORDERS.find((o) => o.id === orderId || o.orderNumber === orderNumber);
        if (order) {
          const emailResult = await sendEmail({
            to: order.customerEmail,
            subject: `Betaling ontvangen - Bestelling ${order.orderNumber}`,
            html: paymentConfirmationEmail({ 
              order: { 
                ...order, 
                status: "paid", 
                paidAt: new Date().toISOString(),
                paymentMethod: payment.method || order.paymentMethod,
              } 
            }),
          });
          
          if (emailResult.success) {
            console.log(`Payment confirmation email sent to ${order.customerEmail}`);
          } else {
            console.error(`Failed to send payment confirmation: ${emailResult.error}`);
          }
        }
        break;
      case "failed":
      case "canceled":
      case "expired":
        orderStatus = "cancelled";
        console.log(`Order ${orderNumber} cancelled due to ${payment.status}`);
        break;
      default:
        // pending, open, etc. - keep as pending
        orderStatus = "pending";
    }

    // In production, update order in Supabase:
    // await supabase
    //   .from('orders')
    //   .update({
    //     status: orderStatus,
    //     paidAt,
    //     updatedAt: new Date().toISOString(),
    //   })
    //   .eq('id', orderId);

    return NextResponse.json({ received: true, status: orderStatus });
  } catch (error) {
    console.error("Mollie webhook error:", error);
    // Return 200 to prevent Mollie from retrying
    return NextResponse.json({ received: true, error: "Processing error" });
  }
}
