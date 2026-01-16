import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "@/lib/resend";
import { orderConfirmationEmail } from "@/lib/email-templates/order-confirmation";
import { Order } from "@/types";

// Generate a unique order number
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `KMP${year}${month}${day}${random}`;
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

    // Create order object
    const order: Order = {
      id: uuidv4(),
      orderNumber: generateOrderNumber(),
      userId: undefined, // Guest checkout
      customerEmail: customerDetails.email,
      customerFirstName: customerDetails.firstName,
      customerLastName: customerDetails.lastName,
      customerPhone: customerDetails.phone,
      shippingStreet: customerDetails.street,
      shippingHouseNumber: customerDetails.houseNumber,
      shippingHouseNumberAddition: customerDetails.houseNumberAddition || undefined,
      shippingPostalCode: customerDetails.postalCode,
      shippingCity: customerDetails.city,
      subtotal,
      discountAmount: discountAmount || 0,
      discountCode: discountCode || undefined,
      shippingCost,
      voorrijkosten: voorrijkosten || 0,
      totalPrice,
      status: "pending" as const,
      paymentMethod,
      molliePaymentId: undefined,
      paidAt: undefined,
      customerNotes: customerDetails.notes || undefined,
      adminNotes: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: items.map((item: Record<string, unknown>) => ({
        id: uuidv4(),
        ...item,
      })) as Order["items"],
    };

    // In production, save to Supabase:
    // const { data, error } = await supabase.from('orders').insert(order).select().single();

    // For now, return the order object (demo mode)
    console.log("Order created:", order.orderNumber);

    // Send order confirmation email
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

  // In production, fetch from Supabase:
  // const { data, error } = await supabase.from('orders').select('*').eq('orderNumber', orderNumber).single();

  // For demo, return mock data
  return NextResponse.json({
    orderNumber,
    status: "pending",
    message: "Order gevonden",
  });
}
