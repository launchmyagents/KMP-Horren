import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header, Footer } from "@/components/layout";
import { AccountSidebar } from "@/components/account/AccountSidebar";

// Force dynamic rendering to avoid build-time errors
export const dynamic = "force-dynamic";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login?redirect=/account");
  }

  // Get user profile data
  const userName = user.user_metadata?.first_name
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`
    : undefined;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <AccountSidebar userName={userName} userEmail={user.email} />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
