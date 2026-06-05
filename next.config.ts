import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  cacheComponents: true,
  experimental: {
    optimizeCss: true
  }
};

export default nextConfig;
