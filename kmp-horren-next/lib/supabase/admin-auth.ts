import { createClient, createAdminClient } from "./server";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "./types";

// ============================================
// ADMIN AUTHENTICATION HELPER
// ============================================
// Centralized helper for admin route authentication.
// Always checks the profiles table for role verification.
// Uses admin client to bypass RLS and avoid infinite recursion.
// ============================================

export type AdminAuthSuccess = {
  authorized: true;
  user: User;
  profile: Profile;
};

export type AdminAuthFailure = {
  authorized: false;
  error: string;
  status: number;
};

export type AdminAuthResult = AdminAuthSuccess | AdminAuthFailure;

/**
 * Verifies that the current user is authenticated and has admin role.
 * Checks the profiles table in the database for role verification.
 * Uses admin client to bypass RLS policies and avoid infinite recursion.
 * 
 * @returns AdminAuthResult with user and profile if authorized, or error details if not
 * 
 * @example
 * ```typescript
 * const authResult = await requireAdmin();
 * if (!authResult.authorized) {
 *   return NextResponse.json({ error: authResult.error }, { status: authResult.status });
 * }
 * // authResult.user and authResult.profile are now available
 * ```
 */
export async function requireAdmin(): Promise<AdminAuthResult> {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      authorized: false,
      error: "Niet geautoriseerd",
      status: 401,
    };
  }

  // Use admin client to bypass RLS for role verification
  // This avoids the infinite recursion issue with RLS policies on profiles table
  const adminClient = createAdminClient();
  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    // Profile doesn't exist - user is authenticated but not set up properly
    return {
      authorized: false,
      error: "Gebruikersprofiel niet gevonden",
      status: 403,
    };
  }

  // Check if user has admin role
  if (profile.role !== "admin") {
    return {
      authorized: false,
      error: "Geen toegang tot admin functies",
      status: 403,
    };
  }

  return {
    authorized: true,
    user,
    profile,
  };
}

/**
 * Helper to check if Supabase is properly configured.
 * Returns false if environment variables are missing or contain placeholder values.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check if values exist
  if (!url || !key) return false;

  // Check for common placeholder patterns
  if (url.includes("your-project")) return false;
  if (url.includes("your-supabase")) return false;
  if (key.includes("your-")) return false;
  if (key === "your-anon-key") return false;

  // Must be a real supabase URL (contains actual project ID)
  if (!url.includes(".supabase.co")) return false;

  // Check if URL has a real project ID (not placeholder)
  const projectId = url.replace("https://", "").split(".")[0];
  if (projectId.length < 10) return false; // Real project IDs are longer

  return true;
}
