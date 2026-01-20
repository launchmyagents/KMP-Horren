import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

// GET - Fetch all contact messages
export async function GET() {
  try {
    // Check if Supabase is configured
    const hasSupabaseConfig = !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    if (!hasSupabaseConfig) {
      console.warn("Supabase not configured, returning empty messages array");
      return NextResponse.json({ data: [] });
    }

    // Verify user is admin
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error("Auth error:", authError);
      return NextResponse.json({ error: "Authenticatie fout" }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
    }

    // Check admin role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      // If profile doesn't exist, user is not admin
      return NextResponse.json({ error: "Geen toegang" }, { status: 403 });
    }

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Geen toegang" }, { status: 403 });
    }

    // Use admin client to bypass RLS
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json(
        { error: "Kon berichten niet laden: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("Error in messages API:", error);
    return NextResponse.json(
      { error: "Er ging iets mis: " + (error instanceof Error ? error.message : "Onbekende fout") },
      { status: 500 }
    );
  }
}

// PATCH - Update a message (mark as read)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ids, is_read } = body;

    // Verify user is admin
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Geen toegang" }, { status: 403 });
    }

    const adminClient = createAdminClient();

    // Update single message or multiple messages
    if (ids && Array.isArray(ids)) {
      const { error } = await adminClient
        .from("contact_messages")
        .update({ is_read })
        .in("id", ids);

      if (error) {
        console.error("Error updating messages:", error);
        return NextResponse.json(
          { error: "Kon berichten niet bijwerken" },
          { status: 500 }
        );
      }
    } else if (id) {
      const { error } = await adminClient
        .from("contact_messages")
        .update({ is_read })
        .eq("id", id);

      if (error) {
        console.error("Error updating message:", error);
        return NextResponse.json(
          { error: "Kon bericht niet bijwerken" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Geen id opgegeven" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in messages PATCH:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a message
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Geen id opgegeven" },
        { status: 400 }
      );
    }

    // Verify user is admin
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Geen toegang" }, { status: 403 });
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting message:", error);
      return NextResponse.json(
        { error: "Kon bericht niet verwijderen" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in messages DELETE:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
