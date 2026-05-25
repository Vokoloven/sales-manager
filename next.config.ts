import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizeCss: true
  }
};

export default nextConfig;
