import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { DEMO_ORDERS } from "@/data/demo-orders";

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // In production, fetch from Supabase with filters
    // For now, return demo data
    let orders = [...DEMO_ORDERS];

    // Filter by status
    if (status && status !== "all") {
      orders = orders.filter((o) => o.status === status);
    }

    // Filter by search
    if (search) {
      const query = search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(query) ||
          o.customerEmail.toLowerCase().includes(query) ||
          `${o.customerFirstName} ${o.customerLastName}`
            .toLowerCase()
            .includes(query)
      );
    }

    // Sort by date (newest first)
    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Paginate
    const total = orders.length;
    const start = (page - 1) * limit;
    const paginatedOrders = orders.slice(start, start + limit);

    return NextResponse.json({
      orders: paginatedOrders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van bestellingen" },
      { status: 500 }
    );
  }
}
