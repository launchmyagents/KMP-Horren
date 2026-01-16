import { NextRequest, NextResponse } from "next/server";

// Demo discount codes - in production these would come from Supabase
const DISCOUNT_CODES: Record<
  string,
  {
    type: "percentage" | "fixed";
    value: number;
    minOrderValue?: number;
    description: string;
  }
> = {
  WELKOM10: {
    type: "percentage",
    value: 10,
    description: "10% welkomstkorting",
  },
  KORTING20: {
    type: "fixed",
    value: 20,
    minOrderValue: 100,
    description: "€20 korting bij minimaal €100",
  },
  ZOMER2024: {
    type: "percentage",
    value: 15,
    minOrderValue: 200,
    description: "15% zomerkorting bij minimaal €200",
  },
  NIEUWEKLANT: {
    type: "percentage",
    value: 5,
    description: "5% korting voor nieuwe klanten",
  },
  GRATISVERZENDING: {
    type: "fixed",
    value: 6.95,
    description: "Gratis verzending",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Kortingscode is verplicht" },
        { status: 400 }
      );
    }

    const normalizedCode = code.toUpperCase().trim();
    const discount = DISCOUNT_CODES[normalizedCode];

    if (!discount) {
      return NextResponse.json(
        { error: "Ongeldige kortingscode" },
        { status: 400 }
      );
    }

    // Check minimum order value
    if (discount.minOrderValue && subtotal < discount.minOrderValue) {
      return NextResponse.json(
        {
          error: `Deze code is geldig vanaf €${discount.minOrderValue.toFixed(2)}`,
        },
        { status: 400 }
      );
    }

    // Calculate discount amount
    const discountAmount =
      discount.type === "percentage"
        ? subtotal * (discount.value / 100)
        : discount.value;

    return NextResponse.json({
      valid: true,
      code: normalizedCode,
      type: discount.type,
      value: discount.value,
      discountAmount: Math.min(discountAmount, subtotal), // Can't exceed subtotal
      description: discount.description,
    });
  } catch (error) {
    console.error("Error validating discount code:", error);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}
