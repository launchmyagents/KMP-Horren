import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Force dynamic rendering to avoid build-time errors
export const dynamic = "force-dynamic";

// Check if we're in production
const isProduction = process.env.NODE_ENV === "production";

// Check if admin client is properly configured (has service role key)
function isAdminClientConfigured(): boolean {
  return !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In production, ALWAYS require authentication - no demo mode
  if (isProduction) {
    // Check if service role key is configured
    if (!isAdminClientConfigured()) {
      // Service role key not configured - block access entirely
      redirect("/?error=admin-not-configured");
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect to login if not authenticated
    if (!user) {
      redirect("/login?redirect=/admin");
    }

    // Use admin client to bypass RLS for role verification
    const adminClient = createAdminClient();
    const { data: profile } = await adminClient
      .from("profiles")
      .select("role, first_name, last_name")
      .eq("id", user.id)
      .single();

    // Check if user has admin role in the profiles table
    const isAdmin = profile?.role === "admin";

    if (!isAdmin) {
      redirect("/?error=unauthorized");
    }

    const userName = profile?.first_name
      ? `${profile.first_name} ${profile.last_name || ""}`
      : "Admin";
    const userEmail = user.email || "admin@kmphorren.nl";

    return (
      <div className="min-h-screen bg-gray-100">
        <AdminSidebar userName={userName} userEmail={userEmail} />
        <main className="pl-64">
          <div className="p-8">{children}</div>
        </main>
      </div>
    );
  }

  // Development mode - allow demo access if Supabase is not fully configured
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userName = "Demo Admin";
  let userEmail = "admin@demo.kmphorren.nl";

  if (user && isAdminClientConfigured()) {
    // User is logged in and admin client is configured - verify admin role
    const adminClient = createAdminClient();
    const { data: profile } = await adminClient
      .from("profiles")
      .select("role, first_name, last_name")
      .eq("id", user.id)
      .single();

    const isAdmin = profile?.role === "admin";

    if (!isAdmin) {
      redirect("/?error=unauthorized");
    }

    userName = profile?.first_name
      ? `${profile.first_name} ${profile.last_name || ""}`
      : "Admin";
    userEmail = user.email || "admin@kmphorren.nl";
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar userName={userName} userEmail={userEmail} />
      <main className="pl-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
