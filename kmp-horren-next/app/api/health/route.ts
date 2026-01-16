import { NextResponse } from "next/server";

// Health check endpoint for Railway monitoring
// This endpoint is called periodically to verify the application is running

interface HealthStatus {
  status: "healthy" | "unhealthy";
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  checks: {
    server: "ok" | "error";
    database?: "ok" | "error" | "not_configured";
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
    },
  };

  // Check Supabase connection if configured
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  ) {
    try {
      // Simple connectivity check - just verify the URL is reachable
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: "HEAD",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      healthStatus.checks.database = response.ok ? "ok" : "error";
    } catch {
      healthStatus.checks.database = "error";
      healthStatus.status = "unhealthy";
    }
  } else {
    healthStatus.checks.database = "not_configured";
  }

  // Calculate response time
  const [seconds, nanoseconds] = process.hrtime(startTime);
  const responseTimeMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

  // Return appropriate status code
  const statusCode = healthStatus.status === "healthy" ? 200 : 503;

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
