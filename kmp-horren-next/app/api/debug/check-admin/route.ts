import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const adminClient = createAdminClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({
      authenticated: false,
      error: authError?.message || "No user found",
    });
  }

  // Try to get profile with regular client (respects RLS)
  const { data: profileWithRLS, error: rlsError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Try to get profile with admin client (bypasses RLS)
  const { data: profileWithoutRLS, error: adminError } = await adminClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
    },
    profileWithRLS: {
      data: profileWithRLS,
      error: rlsError?.message || null,
    },
    profileWithoutRLS: {
      data: profileWithoutRLS,
      error: adminError?.message || null,
    },
    isAdminWithRLS: profileWithRLS?.role === "admin",
    isAdminWithoutRLS: profileWithoutRLS?.role === "admin",
  });
}
