import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getDemoStats } from "@/data/demo-orders";

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

    // Check admin role (in production, verify from database)
    const isAdmin = user.user_metadata?.role === "admin" || true; // Demo: allow all

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Geen toegang tot admin functies" },
        { status: 403 }
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
