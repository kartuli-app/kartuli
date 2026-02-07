import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Add your config options here
  devIndicators: false,
  serverExternalPackages: ['esbuild-wasm'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app/freestyle',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
