import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Force dynamic rendering to avoid build-time errors
export const dynamic = "force-dynamic";

// Check if Supabase is properly configured (not just placeholder values)
const isSupabaseConfigured = () => {
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
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userName = "Demo Admin";
  let userEmail = "admin@demo.kmphorren.nl";

  // Only check auth if Supabase is configured
  if (isSupabaseConfigured()) {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect to login if not authenticated
    if (!user) {
      redirect("/login?redirect=/admin");
    }

    // Check if user has admin role
    // In production, this would check the user's role in the database
    // For demo purposes, we check user_metadata or allow all authenticated users
    const isAdmin = user.user_metadata?.role === "admin" || true; // Demo: allow all users

    if (!isAdmin) {
      redirect("/?error=unauthorized");
    }

    userName = user.user_metadata?.first_name
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`
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
