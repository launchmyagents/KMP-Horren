import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { getDemoStats } from "@/data/demo-orders";

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

    // Return demo stats for now
    // In production, fetch from Supabase
    const stats = getDemoStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van statistieken" },
      { status: 500 }
    );
  }
}
