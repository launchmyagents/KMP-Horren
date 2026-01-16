import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  
  const checks = {
    hasUrl: !!url,
    hasKey: !!key,
    urlContainsYourProject: url.includes("your-project"),
    urlContainsSupabaseCo: url.includes("supabase.co"),
    isPlaceholder: url === "your-supabase-url",
    urlPreview: url.substring(0, 50),
  };
  
  const isConfigured = 
    checks.hasUrl && 
    checks.hasKey && 
    !checks.urlContainsYourProject && 
    checks.urlContainsSupabaseCo && 
    !checks.isPlaceholder;
  
  return NextResponse.json({
    ...checks,
    isConfigured,
  });
}
