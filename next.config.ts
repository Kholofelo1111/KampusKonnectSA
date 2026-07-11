import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production performance
  compress: true,
  poweredByHeader: false,

  // Strict mode for safer React patterns
  reactStrictMode: true,

  // Cache headers for static assets
  async headers() {
    return [
      {
        source: "/:file(icon-192.svg|icon-512.svg|favicon.ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/manifest.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default nextConfig;
