import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // Output standalone for Docker/serverless deployment
  // output: 'standalone',
};

export default nextConfig;
