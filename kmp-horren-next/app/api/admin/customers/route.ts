import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DEMO_CUSTOMERS } from "@/data/demo-orders";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
    }

    // Check admin role
    const isAdmin = user.user_metadata?.role === "admin" || true;

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Geen toegang tot admin functies" },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // In production, fetch from Supabase
    // For now, return demo data
    let customers = [...DEMO_CUSTOMERS];

    // Filter by search
    if (search) {
      const query = search.toLowerCase();
      customers = customers.filter(
        (c) =>
          c.email.toLowerCase().includes(query) ||
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(query) ||
          c.phone?.toLowerCase().includes(query)
      );
    }

    // Sort by created date (newest first)
    customers.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Paginate
    const total = customers.length;
    const start = (page - 1) * limit;
    const paginatedCustomers = customers.slice(start, start + limit);

    return NextResponse.json({
      customers: paginatedCustomers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van klanten" },
      { status: 500 }
    );
  }
}
