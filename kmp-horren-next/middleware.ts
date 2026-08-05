import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";
import { BASE_URL } from "@/lib/seo-config";

// Routes that require authentication
const protectedRoutes = ["/account"];

// Routes that should redirect to account if already logged in
const authRoutes = ["/login", "/registreren"];

// Admin routes are handled in the layout, not middleware
// This allows demo mode to work without authentication

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Send the Railway-generated host to the real domain.
  //
  // Google has been treating https://kmp-horren-production.up.railway.app as
  // the canonical version of the homepage: URL inspection on 2026-08-05 still
  // reported "Duplicate, Google chose different canonical than user", and
  // kmp-horren.nl/ had not had a single impression between 1 June and 5 August.
  // The on-page canonicals already point at the real domain, but the preview
  // host stayed reachable with HTTP 200 and its own self-referencing canonical,
  // so both hosts served the same site.
  //
  // /api/ is deliberately excluded. Railway's healthcheck hits /api/health
  // (railway.toml) and would fail on a redirect, and the payment and webhook
  // routes under /api are POST endpoints that must not be redirected either.
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".up.railway.app") && !pathname.startsWith("/api/")) {
    const target = new URL(`${pathname}${request.nextUrl.search}`, BASE_URL);
    return NextResponse.redirect(target, 301);
  }

  // Check route types
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If not a protected or auth route, just update session and return
  if (!isProtectedRoute && !isAuthRoute) {
    return await updateSession(request);
  }

  // Check if Supabase is properly configured
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  
  const supabaseConfigured = 
    url && 
    key && 
    url !== "your-supabase-url" && 
    url.indexOf("your-project") === -1 &&
    key !== "your-supabase-anon-key" &&
    url.indexOf("supabase.co") !== -1;

  // If Supabase is not configured, redirect protected routes to login
  if (!supabaseConfigured) {
    if (isProtectedRoute) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Supabase IS configured - update session first
  const response = await updateSession(request);

  // Create a Supabase client to check auth status
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to account if accessing auth routes while logged in
  if (isAuthRoute && user) {
    const redirectTo = request.nextUrl.searchParams.get("redirect");
    const destination = redirectTo || "/account";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (handled by layout)
     */
    "/((?!_next/static|_next/image|favicon.ico|admin|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
