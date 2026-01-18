import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { getAllProducts, createProduct } from "@/lib/supabase/database";
import { PRODUCTS } from "@/data/products";

// GET all products (including inactive)
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

    // Try to fetch from database first
    const dbProducts = await getAllProducts();
    
    // If no products in database, return demo data
    if (dbProducts.length === 0) {
      // Transform static products to match DB format
      const products = PRODUCTS.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        type: p.type,
        description: p.description,
        features: p.features,
        base_price_per_m2: p.basePricePerM2,
        min_price: p.minPrice,
        min_width_mm: p.minWidthMm,
        max_width_mm: p.maxWidthMm,
        min_height_mm: p.minHeightMm,
        max_height_mm: p.maxHeightMm,
        image_url: p.imageUrl,
        gallery_urls: null,
        options: p.options,
        is_active: p.isActive,
        sort_order: p.sortOrder,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      return NextResponse.json({ products, source: "static" });
    }

    return NextResponse.json({ products: dbProducts, source: "database" });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van producten" },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
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
    const {
      id,
      name,
      slug,
      type,
      description,
      features,
      base_price_per_m2,
      min_price,
      min_width_mm,
      max_width_mm,
      min_height_mm,
      max_height_mm,
      image_url,
      options,
      is_active,
      sort_order,
    } = body;

    // Validate required fields
    if (!id || !name || !slug || !type) {
      return NextResponse.json(
        { error: "ID, naam, slug en type zijn verplicht" },
        { status: 400 }
      );
    }

    const product = await createProduct({
      id,
      name,
      slug,
      type,
      description: description || "",
      features: features || [],
      base_price_per_m2: base_price_per_m2 || 0,
      min_price: min_price || 0,
      min_width_mm: min_width_mm || 0,
      max_width_mm: max_width_mm || 0,
      min_height_mm: min_height_mm || 0,
      max_height_mm: max_height_mm || 0,
      image_url: image_url || "",
      options: options || [],
      is_active: is_active ?? true,
      sort_order: sort_order || 0,
    });

    if (!product) {
      return NextResponse.json(
        { error: "Er ging iets mis bij het aanmaken van het product" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Product aangemaakt",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het aanmaken van het product" },
      { status: 500 }
    );
  }
}
