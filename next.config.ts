import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  experimental: {
    esmExternals: false,
  },
};

export default nextConfig;
