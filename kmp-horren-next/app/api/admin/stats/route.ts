import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const supabase = createAdminClient();

    // Get current date boundaries
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    // Fetch all orders
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("id, status, total_price, created_at, paid_at, customer_email");

    if (ordersError) {
      console.error("Error fetching orders for stats:", ordersError);
      throw ordersError;
    }

    const allOrders = orders || [];

    // Calculate order stats
    const totalOrders = allOrders.length;
    const pendingOrders = allOrders.filter((o) => o.status === "pending").length;
    const processingOrders = allOrders.filter(
      (o) => o.status === "processing" || o.status === "paid"
    ).length;

    // Paid orders (not pending, not cancelled)
    const paidOrders = allOrders.filter(
      (o) => o.status !== "pending" && o.status !== "cancelled"
    );

    // Revenue calculations
    const totalRevenue = paidOrders.reduce(
      (sum, o) => sum + parseFloat(String(o.total_price || 0)),
      0
    );

    // Today's stats
    const ordersToday = allOrders.filter(
      (o) => o.created_at && o.created_at >= todayStart
    );
    const revenueToday = ordersToday
      .filter((o) => o.status !== "pending" && o.status !== "cancelled")
      .reduce((sum, o) => sum + parseFloat(String(o.total_price || 0)), 0);

    // This week's stats
    const ordersThisWeek = allOrders.filter(
      (o) => o.created_at && o.created_at >= weekStart
    );
    const revenueThisWeek = ordersThisWeek
      .filter((o) => o.status !== "pending" && o.status !== "cancelled")
      .reduce((sum, o) => sum + parseFloat(String(o.total_price || 0)), 0);

    // This month's stats
    const ordersThisMonth = allOrders.filter(
      (o) => o.created_at && o.created_at >= monthStart
    );
    const revenueThisMonth = ordersThisMonth
      .filter((o) => o.status !== "pending" && o.status !== "cancelled")
      .reduce((sum, o) => sum + parseFloat(String(o.total_price || 0)), 0);

    // Unique customers count (by email)
    const uniqueEmails = new Set(allOrders.map((o) => o.customer_email));
    const totalCustomers = uniqueEmails.size;

    // New customers this month
    const customersThisMonth = new Set(
      ordersThisMonth.map((o) => o.customer_email)
    ).size;

    // Fetch unread messages count
    const { count: unreadMessages } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    // Fetch pending inmeetservice requests
    const { count: pendingInmeetservice } = await supabase
      .from("inmeetservice_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    const stats = {
      totalOrders,
      pendingOrders,
      processingOrders,
      totalRevenue,
      totalCustomers,
      newCustomersThisMonth: customersThisMonth,
      unreadMessages: unreadMessages || 0,
      pendingInmeetservice: pendingInmeetservice || 0,
      revenueToday,
      revenueThisWeek,
      revenueThisMonth,
      ordersToday: ordersToday.length,
      ordersThisWeek: ordersThisWeek.length,
      ordersThisMonth: ordersThisMonth.length,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van statistieken" },
      { status: 500 }
    );
  }
}
