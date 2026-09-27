import type { NextConfig } from "next";

// Static art in /public is not fingerprinted, so it gets a day of caching plus
// stale-while-revalidate instead of "immutable".
const STATIC_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Quality values allowed for <Image quality={...}>
    qualities: [60, 70, 75, 85],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      { source: "/locations/:path*", headers: [{ key: "Cache-Control", value: STATIC_CACHE }] },
      { source: "/badges/:path*", headers: [{ key: "Cache-Control", value: STATIC_CACHE }] },
      { source: "/demo/:path*", headers: [{ key: "Cache-Control", value: STATIC_CACHE }] },
      { source: "/hero-bg.jpg", headers: [{ key: "Cache-Control", value: STATIC_CACHE }] },
      { source: "/og-image.png", headers: [{ key: "Cache-Control", value: STATIC_CACHE }] },
    ];
  },
};

export default nextConfig;
