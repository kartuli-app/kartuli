import { withSerwist } from '@serwist/turbopack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: false },
      { source: '/debug', destination: '/en/debug', permanent: false },
    ];
  },
};

export default withSerwist(nextConfig);
