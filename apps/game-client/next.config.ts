import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Add your config options here
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app/freestyle',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
