/** @type {import('next').NextConfig} */
const nextConfig = {
  // ===========================================
  // PRODUCTION / DEPLOYMENT SETTINGS
  // ===========================================
  
  // Standalone output for optimized Docker/Railway deployment
  // This creates a self-contained build with all dependencies
  output: "standalone",
  
  // Generate build ID based on git commit or timestamp
  generateBuildId: async () => {
    return process.env.RAILWAY_GIT_COMMIT_SHA || 
           process.env.GIT_COMMIT_SHA || 
           `build-${Date.now()}`;
  },
  
  // Disable source maps in production for smaller bundle size
  productionBrowserSourceMaps: false,
  
  // ===========================================
  // IMAGE OPTIMIZATION
  // ===========================================
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
    // Modern image formats for better compression
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for layout optimization
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize image optimization in production for faster builds
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Enable compression
  compress: true,
  
  // Strict mode for better React practices
  reactStrictMode: true,
  
  // Power by header removal for security
  poweredByHeader: false,
  
  // ===========================================
  // EXPERIMENTAL FEATURES
  // ===========================================
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
    ],
  },

  // Build reliability on Railway: three consecutive Railway builds each
  // reported spurious "Module not found" for a DIFFERENT-but-consistent
  // set of files that verifiably exist in the repo (correct casing,
  // correct imports, git-tracked). The log line
  // "[webpack.cache.PackFileCacheStrategy] Serializing big strings ...
  // impacts deserialization performance" right before each failure
  // points at webpack's persistent filesystem cache getting corrupted
  // during serialization on Railway's build server. Disabling that
  // cache for production builds removes the corruption source at the
  // cost of slightly slower (but reliable) builds. Single-threaded
  // compilation (config.parallelism = 1) is kept as a secondary
  // safeguard against build-worker memory pressure.
  webpack: (config, { dev }) => {
    config.parallelism = 1;
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
  
  // ===========================================
  // LOGGING
  // ===========================================
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
  
  // www -> non-www consolidation (SEO fix #5): kmp-horren.nl is the canonical
  // host everywhere else (BASE_URL, canonicals, sitemap), but www.kmp-horren.nl
  // was reachable as a separate 200 instead of redirecting, creating duplicate
  // content. Host-based redirect requires the `has` matcher; a plain source
  // rewrite can't distinguish hosts.
  // Removed-product redirects (weekly health-check 2026-W31): the 2026-07-20
  // catalog cleanup (PR #20) took the product count from 15 to 7 confirmed
  // items but never added redirects for the 9 dropped slugs, so they've been
  // serving hard 404s ever since, right as Google started re-crawling the
  // site after the domain move. None of the 9 has a confirmed 1:1 replacement
  // product, so each redirects to its category page rather than guessing an
  // equivalence that hasn't been confirmed by the client. `voorzethor` is a
  // straight rename (2026-07-20) to `voorzet-plisse-hor`, so that one does
  // get a specific product-to-product redirect.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kmp-horren.nl" }],
        destination: "https://kmp-horren.nl/:path*",
        permanent: true,
      },
      {
        source: "/producten/voorzethor",
        destination: "/producten/voorzet-plisse-hor",
        permanent: true,
      },
      {
        source: "/producten/:slug(luxe-rolhor|luxe-klemhor|luxe-veerstifthor|vaste-raamhor)",
        destination: "/producten/raamhorren",
        permanent: true,
      },
      {
        source: "/producten/:slug(scharnier-hordeur|royal-22-enkel|royal-32-enkel|royal-32-dubbel|schuifpui-hor)",
        destination: "/producten/deurhorren",
        permanent: true,
      },
    ];
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache fonts
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
