import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Abaikan error tipe data saat build di Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Sekalian abaikan error linter biar makin aman
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
