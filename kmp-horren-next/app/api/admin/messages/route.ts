import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";

// GET - Fetch all contact messages
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

    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
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

    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
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
