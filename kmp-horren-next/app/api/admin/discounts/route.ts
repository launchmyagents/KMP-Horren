import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { DEMO_DISCOUNTS } from "@/data/demo-orders";
import { DiscountCode } from "@/types";

// GET all discounts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    // Check admin authentication
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    // In production, fetch from Supabase
    // For now, return demo data
    return NextResponse.json({ discounts: DEMO_DISCOUNTS });
  } catch (error) {
    console.error("Error fetching discounts:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het ophalen van kortingscodes" },
      { status: 500 }
    );
  }
}

// POST create new discount
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
      code,
      description,
      discountType,
      discountValue,
      minOrderValue,
      maxUses,
      validFrom,
      validUntil,
      isActive,
    } = body;

    // Validate required fields
    if (!code || !discountType || !discountValue) {
      return NextResponse.json(
        { error: "Code, type en waarde zijn verplicht" },
        { status: 400 }
      );
    }

    // In production, insert into Supabase:
    // const { data, error } = await supabase
    //   .from('discount_codes')
    //   .insert({
    //     code: code.toUpperCase(),
    //     description,
    //     discountType,
    //     discountValue,
    //     minOrderValue,
    //     maxUses,
    //     validFrom,
    //     validUntil,
    //     isActive,
    //     usedCount: 0,
    //   })
    //   .select()
    //   .single();

    // For demo, just return success
    const newDiscount: DiscountCode = {
      id: `disc_${Date.now()}`,
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue,
      minOrderValue,
      maxUses,
      validFrom,
      validUntil,
      isActive: isActive ?? true,
      usedCount: 0,
    };

    return NextResponse.json({
      message: "Kortingscode aangemaakt",
      discount: newDiscount,
    });
  } catch (error) {
    console.error("Error creating discount:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het aanmaken van de kortingscode" },
      { status: 500 }
    );
  }
}

// PUT update discount
export async function PUT(request: NextRequest) {
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
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Kortingscode ID is verplicht" },
        { status: 400 }
      );
    }

    // In production, update in Supabase:
    // const { data, error } = await supabase
    //   .from('discount_codes')
    //   .update(updateData)
    //   .eq('id', id)
    //   .select()
    //   .single();

    console.log(`Discount ${id} updated:`, updateData);

    return NextResponse.json({
      message: "Kortingscode bijgewerkt",
      id,
    });
  } catch (error) {
    console.error("Error updating discount:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het bijwerken van de kortingscode" },
      { status: 500 }
    );
  }
}

// DELETE discount
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
        { error: "Kortingscode ID is verplicht" },
        { status: 400 }
      );
    }

    // In production, delete from Supabase:
    // const { error } = await supabase
    //   .from('discount_codes')
    //   .delete()
    //   .eq('id', id);

    console.log(`Discount ${id} deleted`);

    return NextResponse.json({
      message: "Kortingscode verwijderd",
      id,
    });
  } catch (error) {
    console.error("Error deleting discount:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het verwijderen van de kortingscode" },
      { status: 500 }
    );
  }
}
