import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: fileURLToPath(new URL("../..", import.meta.url)) },
  reactStrictMode: true,
  async redirects() {
    return [{"source": "/resources/private-label-underwear-manufacturer", "destination": "/manufacturers/private-label-underwear-manufacturer", "statusCode": 301}, {"source": "/resources/mens-underwear-manufacturer-private-label", "destination": "/manufacturers/mens-underwear-manufacturer", "statusCode": 301}, {"source": "/resources/120-pcs-moq-underwear-manufacturer", "destination": "/manufacturers/low-moq-underwear-manufacturer", "statusCode": 301}];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
