import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  totalOrders: number;
  totalSpent: number;
  firstOrderDate: string;
  lastOrderDate: string;
}

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
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const supabase = createAdminClient();

    // Query to get unique customers from orders table
    // We use a raw SQL query for aggregation
    let query = supabase
      .from("orders")
      .select("customer_email, customer_first_name, customer_last_name, customer_phone, total_price, created_at")
      .order("created_at", { ascending: false });

    // Apply search filter if provided
    if (search) {
      query = query.or(
        `customer_email.ilike.%${search}%,customer_first_name.ilike.%${search}%,customer_last_name.ilike.%${search}%,customer_phone.ilike.%${search}%`
      );
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error("Error fetching orders for customers:", error);
      return NextResponse.json(
        { error: "Er ging iets mis bij het ophalen van klanten" },
        { status: 500 }
      );
    }

    // Aggregate orders by customer email
    const customerMap = new Map<string, Customer>();

    orders?.forEach((order) => {
      const email = order.customer_email;
      
      // Skip anonymized customers
      if (email === "deleted@anoniem.nl") return;

      if (customerMap.has(email)) {
        const existing = customerMap.get(email)!;
        existing.totalOrders += 1;
        existing.totalSpent += parseFloat(order.total_price || "0");
        
        // Update last order date if this order is more recent
        if (new Date(order.created_at) > new Date(existing.lastOrderDate)) {
          existing.lastOrderDate = order.created_at;
        }
        // Update first order date if this order is older
        if (new Date(order.created_at) < new Date(existing.firstOrderDate)) {
          existing.firstOrderDate = order.created_at;
        }
      } else {
        customerMap.set(email, {
          id: email, // Use email as ID since we don't have a separate customers table
          email: email,
          firstName: order.customer_first_name,
          lastName: order.customer_last_name,
          phone: order.customer_phone,
          totalOrders: 1,
          totalSpent: parseFloat(order.total_price || "0"),
          firstOrderDate: order.created_at,
          lastOrderDate: order.created_at,
        });
      }
    });

    // Convert map to array and sort by last order date (newest first)
    let customers = Array.from(customerMap.values());
    customers.sort(
      (a, b) =>
        new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
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
