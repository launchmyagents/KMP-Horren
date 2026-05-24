import { NextResponse } from "next/server";

// Health check endpoint for Railway monitoring
// This endpoint is called periodically to verify the application is running

interface HealthStatus {
  status: "healthy" | "unhealthy" | "degraded";
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  checks: {
    server: "ok" | "error";
    database: "ok" | "error" | "not_configured";
    stripe: "configured" | "not_configured";
    resend: "configured" | "not_configured";
  };
}

export async function GET() {
  const startTime = process.hrtime();

  const healthStatus: HealthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "0.1.0",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    checks: {
      server: "ok",
      database: "not_configured",
      stripe: "not_configured",
      resend: "not_configured",
    },
  };

  // Check Supabase connection
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseConfigured =
    supabaseUrl &&
    !supabaseUrl.includes("your-project") &&
    supabaseUrl.includes("supabase.co");

  if (supabaseConfigured) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: "HEAD",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        },
        signal: AbortSignal.timeout(5000),
      });
      healthStatus.checks.database = response.ok ? "ok" : "error";
      if (!response.ok) {
        healthStatus.status = "degraded";
      }
    } catch {
      healthStatus.checks.database = "error";
      healthStatus.status = "degraded";
    }
  }

  // Check Stripe configuration
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey && stripeKey.startsWith("sk_") && stripeKey.length > 20) {
    healthStatus.checks.stripe = "configured";
  }

  // Check Resend configuration
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && resendKey.startsWith("re_") && resendKey.length > 20) {
    healthStatus.checks.resend = "configured";
  }

  // Determine overall status
  if (healthStatus.checks.database === "error") {
    healthStatus.status = "unhealthy";
  } else if (
    healthStatus.checks.database === "not_configured" ||
    healthStatus.checks.stripe === "not_configured"
  ) {
    // In production, missing critical configs means degraded
    if (process.env.NODE_ENV === "production") {
      healthStatus.status = "degraded";
    }
  }

  // Calculate response time
  const [seconds, nanoseconds] = process.hrtime(startTime);
  const responseTimeMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

  // Always return 200 — Railway healthcheck only checks HTTP status.
  // Unhealthy/degraded state is visible in the response body.
  const statusCode = 200;

  return NextResponse.json(
    {
      ...healthStatus,
      responseTimeMs,
    },
    {
      status: statusCode,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Response-Time": `${responseTimeMs}ms`,
      },
    }
  );
}

// Also support HEAD requests for simple health checks
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
