import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";

// DEVELOPMENT ONLY: Make the current logged-in user an admin
// This endpoint should be removed or protected in production
export async function POST() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Not authenticated. Please log in first." },
      { status: 401 }
    );
  }

  // Use admin client to bypass RLS and update the role
  const adminClient = createAdminClient();

  // First check if profile exists
  const { data: existingProfile, error: profileError } = await adminClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError && profileError.code !== "PGRST116") {
    return NextResponse.json(
      { error: "Error checking profile", details: profileError.message },
      { status: 500 }
    );
  }

  if (!existingProfile) {
    // Create profile with admin role
    const { error: insertError } = await adminClient.from("profiles").insert({
      id: user.id,
      email: user.email || "",
      first_name: user.user_metadata?.first_name || "Admin",
      last_name: user.user_metadata?.last_name || "",
      role: "admin",
    });

    if (insertError) {
      return NextResponse.json(
        { error: "Error creating profile", details: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile created with admin role",
      user: {
        id: user.id,
        email: user.email,
        role: "admin",
      },
    });
  }

  // Update existing profile to admin
  const { error: updateError } = await adminClient
    .from("profiles")
    .update({ role: "admin" })
    .eq("id", user.id);

  if (updateError) {
    return NextResponse.json(
      { error: "Error updating profile", details: updateError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Profile updated to admin role",
    user: {
      id: user.id,
      email: user.email,
      previousRole: existingProfile.role,
      newRole: "admin",
    },
  });
}

// GET: Check current user's role
export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  // Get profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
    profile: profile || null,
    profileError: profileError?.message || null,
    isAdmin: profile?.role === "admin",
  });
}
