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

  // Single-threaded compilation: the parallel build workers were
  // getting OOM-killed on Railway's build server, which webpack then
  // misreports as random "Module not found" errors for files that do
  // exist. This trades some build speed for reliability under memory
  // constraints. See: https://nextjs.org/docs/messages/webpack5
  webpack: (config) => {
    config.parallelism = 1;
    return config;
  },
  cpus: 1,
  
  // ===========================================
  // LOGGING
  // ===========================================
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
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
