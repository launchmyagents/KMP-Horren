import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadProductImage, updateProduct } from "@/lib/supabase/database";

// DEV MODE: Skip auth in development
const DEV_SKIP_AUTH = process.env.NODE_ENV === "development"; // TODO: Set to false before production!

// POST upload product image
export async function POST(request: NextRequest) {
  try {
    // Skip auth check in development mode
    if (!DEV_SKIP_AUTH) {
      const supabase = await createClient();

      // Check authentication
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
      }

      // Check admin role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const isAdmin = profile?.role === "admin" || user.user_metadata?.role === "admin";

      if (!isAdmin) {
        return NextResponse.json(
          { error: "Geen toegang tot admin functies" },
          { status: 403 }
        );
      }
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

    // Update product with new image URL (only for main image)
    const updatedProduct = await updateProduct(productId, {
      image_url: imageUrl,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Afbeelding geüpload maar product niet bijgewerkt" },
        { status: 500 }
      );
    }

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
