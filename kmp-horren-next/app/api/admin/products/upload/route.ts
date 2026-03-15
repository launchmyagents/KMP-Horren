import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { uploadProductImage, updateProduct, getProductById } from "@/lib/supabase/database";

// POST upload product image
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

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const productId = formData.get("productId") as string | null;
    const isGallery = formData.get("isGallery") === "true";

    if (!file) {
      return NextResponse.json(
        { error: "Geen bestand geüpload" },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is verplicht" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Alleen JPG, PNG en WebP afbeeldingen zijn toegestaan" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Afbeelding mag niet groter zijn dan 5MB" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    // For gallery images, add a unique suffix to prevent overwriting
    const fileName = isGallery 
      ? `gallery_${Date.now()}_${file.name}`
      : file.name;
    
    const imageUrl = await uploadProductImage(
      productId,
      buffer,
      fileName,
      file.type
    );

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Er ging iets mis bij het uploaden van de afbeelding" },
        { status: 500 }
      );
    }

    // For gallery images, don't update the product - let the frontend handle it
    if (isGallery) {
      return NextResponse.json({
        message: "Galerij afbeelding geüpload",
        imageUrl,
      });
    }

    // For new product (productId === "new"), product doesn't exist yet - just return imageUrl.
    // The frontend stores it in form state and will save it when creating the product.
    if (productId === "new") {
      return NextResponse.json({
        message: "Afbeelding geüpload",
        imageUrl,
      });
    }

    // Update existing product with new image URL (main image)
    const updatedProduct = await updateProduct(productId, {
      image_url: imageUrl,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Afbeelding geüpload maar product niet bijgewerkt" },
        { status: 500 }
      );
    }

    revalidatePath("/producten");
    revalidatePath(`/producten/${updatedProduct.slug}`);
    revalidatePath("/");

    return NextResponse.json({
      message: "Afbeelding geüpload",
      imageUrl,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error uploading product image:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het uploaden van de afbeelding" },
      { status: 500 }
    );
  }
}
