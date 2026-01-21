import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

interface InmeetserviceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  preferredDate: string | null;
  preferredTime: string | null;
  notes: string | null;
  status: "pending" | "contacted" | "scheduled" | "completed";
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

// Transform database record to frontend type
function transformDbRequest(dbRequest: Record<string, unknown>): InmeetserviceRequest {
  return {
    id: dbRequest.id as string,
    name: dbRequest.name as string,
    email: dbRequest.email as string,
    phone: dbRequest.phone as string,
    street: dbRequest.street as string,
    houseNumber: dbRequest.house_number as string,
    postalCode: dbRequest.postal_code as string,
    city: dbRequest.city as string,
    preferredDate: dbRequest.preferred_date as string | null,
    preferredTime: dbRequest.preferred_time as string | null,
    notes: dbRequest.notes as string | null,
    status: dbRequest.status as InmeetserviceRequest["status"],
    adminNotes: dbRequest.admin_notes as string | null,
    createdAt: dbRequest.created_at as string,
    updatedAt: dbRequest.updated_at as string,
  };
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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const supabase = createAdminClient();

    // Build query
    let query = supabase
      .from("inmeetservice_requests")
      .select("*")
      .order("created_at", { ascending: false });

    // Filter by status if provided
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data: requests, error } = await query;

    if (error) {
      console.error("Error fetching inmeetservice requests:", error);
      return NextResponse.json(
        { error: "Er ging iets mis bij het ophalen van aanvragen" },
        { status: 500 }
      );
    }

    const transformedRequests = (requests || []).map(transformDbRequest);

    // Calculate status counts
    const { data: allRequests } = await supabase
      .from("inmeetservice_requests")
      .select("status");

    const statusCounts: Record<string, number> = {
      all: allRequests?.length || 0,
      pending: 0,
      contacted: 0,
      scheduled: 0,
      completed: 0,
    };

    allRequests?.forEach((req) => {
      if (req.status in statusCounts) {
        statusCounts[req.status as string]++;
      }
    });

    return NextResponse.json({
      requests: transformedRequests,
      statusCounts,
    });
  } catch (error) {
    console.error("Error in inmeetservice GET:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is verplicht" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Build update object
    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updates.status = status;
    }

    if (adminNotes !== undefined) {
      updates.admin_notes = adminNotes;
    }

    const { data: updatedRequest, error } = await supabase
      .from("inmeetservice_requests")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating inmeetservice request:", error);
      return NextResponse.json(
        { error: "Kon aanvraag niet bijwerken" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      request: transformDbRequest(updatedRequest),
      message: "Aanvraag bijgewerkt",
    });
  } catch (error) {
    console.error("Error in inmeetservice PATCH:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is verplicht" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase
      .from("inmeetservice_requests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting inmeetservice request:", error);
      return NextResponse.json(
        { error: "Kon aanvraag niet verwijderen" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Aanvraag verwijderd",
    });
  } catch (error) {
    console.error("Error in inmeetservice DELETE:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
