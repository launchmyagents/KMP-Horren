import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/supabase/database";

// DEV MODE: Skip auth in development
const DEV_SKIP_AUTH = process.env.NODE_ENV === "development"; // TODO: Set to false before production!

// Helper function to check admin auth
async function checkAdminAuth() {
  if (DEV_SKIP_AUTH) {
    return { authorized: true };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { authorized: false, error: "Niet geautoriseerd", status: 401 };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin" || user.user_metadata?.role === "admin";

  if (!isAdmin) {
    return { authorized: false, error: "Geen toegang tot admin functies", status: 403 };
  }

  return { authorized: true };
}

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const authResult = await checkAdminAuth();
    if (!authResult.authorized) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product niet gevonden" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van het product" },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const authResult = await checkAdminAuth();
    if (!authResult.authorized) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const body = await request.json();
    
    // Remove fields that shouldn't be updated directly
    const { id: _id, created_at: _createdAt, ...updateData } = body;

    const product = await updateProduct(id, updateData);

    if (!product) {
      return NextResponse.json(
        { error: "Er ging iets mis bij het bijwerken van het product" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Product bijgewerkt",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het bijwerken van het product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const authResult = await checkAdminAuth();
    if (!authResult.authorized) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const success = await deleteProduct(id);

    if (!success) {
      return NextResponse.json(
        { error: "Er ging iets mis bij het verwijderen van het product" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Product verwijderd",
      id,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het verwijderen van het product" },
      { status: 500 }
    );
  }
}
