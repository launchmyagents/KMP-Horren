import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

interface CustomerDetail {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  totalOrders: number;
  totalSpent: number;
  firstOrderDate: string;
  lastOrderDate: string;
  orders: Array<{
    id: string;
    orderNumber: string;
    totalPrice: number;
    status: string;
    createdAt: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
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

    const { email } = await params;
    const decodedEmail = decodeURIComponent(email);
    const supabase = createAdminClient();

    // Fetch all orders for this customer
    const { data: orders, error } = await supabase
      .from("orders")
      .select("id, order_number, customer_email, customer_first_name, customer_last_name, customer_phone, total_price, status, created_at")
      .eq("customer_email", decodedEmail)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching customer orders:", error);
      return NextResponse.json(
        { error: "Er ging iets mis bij het ophalen van klantgegevens" },
        { status: 500 }
      );
    }

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { error: "Klant niet gevonden" },
        { status: 404 }
      );
    }

    // Build customer detail from orders
    const firstOrder = orders[orders.length - 1];
    const lastOrder = orders[0];

    const customer: CustomerDetail = {
      email: decodedEmail,
      firstName: lastOrder.customer_first_name,
      lastName: lastOrder.customer_last_name,
      phone: lastOrder.customer_phone,
      totalOrders: orders.length,
      totalSpent: orders.reduce((sum, o) => sum + parseFloat(o.total_price || "0"), 0),
      firstOrderDate: firstOrder.created_at,
      lastOrderDate: lastOrder.created_at,
      orders: orders.map((o) => ({
        id: o.id,
        orderNumber: o.order_number,
        totalPrice: parseFloat(o.total_price || "0"),
        status: o.status,
        createdAt: o.created_at,
      })),
    };

    return NextResponse.json({ customer });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van klantgegevens" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
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

    const { email } = await params;
    const decodedEmail = decodeURIComponent(email);
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "anonymize";

    const supabase = createAdminClient();

    // First, check if customer exists
    const { data: existingOrders, error: findError } = await supabase
      .from("orders")
      .select("id, customer_first_name, customer_last_name")
      .eq("customer_email", decodedEmail);

    if (findError || !existingOrders || existingOrders.length === 0) {
      return NextResponse.json(
        { error: "Klant niet gevonden" },
        { status: 404 }
      );
    }

    const customerName = `${existingOrders[0].customer_first_name} ${existingOrders[0].customer_last_name}`;
    const orderCount = existingOrders.length;

    if (mode === "delete") {
      // Delete all orders for this customer (order_items will be deleted via CASCADE)
      const { error: deleteError } = await supabase
        .from("orders")
        .delete()
        .eq("customer_email", decodedEmail);

      if (deleteError) {
        console.error("Error deleting customer orders:", deleteError);
        return NextResponse.json(
          { error: "Er ging iets mis bij het verwijderen van de klant" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `${customerName} en ${orderCount} bestelling(en) zijn verwijderd`,
      });
    } else {
      // Anonymize: Update customer data to remove PII
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          customer_email: "deleted@anoniem.nl",
          customer_first_name: "Verwijderd",
          customer_last_name: "Klant",
          customer_phone: null,
        })
        .eq("customer_email", decodedEmail);

      if (updateError) {
        console.error("Error anonymizing customer:", updateError);
        return NextResponse.json(
          { error: "Er ging iets mis bij het anonimiseren van de klant" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `${customerName} is geanonimiseerd. ${orderCount} bestelling(en) zijn behouden.`,
      });
    }
  } catch (error) {
    console.error("Error processing customer deletion:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het verwerken van het verzoek" },
      { status: 500 }
    );
  }
}
