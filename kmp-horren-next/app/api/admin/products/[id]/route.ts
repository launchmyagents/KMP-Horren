import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { getProductById, updateProduct, deleteProduct } from "@/lib/supabase/database";

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
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
    
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    
    // Remove fields that shouldn't be updated directly
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, created_at: _createdAt, ...updateData } = body;

    const product = await updateProduct(id, updateData);

    if (!product) {
      return NextResponse.json(
        { error: "Er ging iets mis bij het bijwerken van het product" },
        { status: 500 }
      );
    }

    revalidatePath("/producten");
    revalidatePath(`/producten/${product.slug}`);
    revalidatePath("/");

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
    
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const product = await getProductById(id);
    const success = await deleteProduct(id);

    if (!success) {
      return NextResponse.json(
        { error: "Er ging iets mis bij het verwijderen van het product" },
        { status: 500 }
      );
    }

    revalidatePath("/producten");
    if (product) {
      revalidatePath(`/producten/${product.slug}`);
    }
    revalidatePath("/");

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
