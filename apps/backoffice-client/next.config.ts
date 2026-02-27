import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf-8')) as {
  version: string;
};

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION ?? pkg.version,
  },
  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: false },
      { source: '/debug', destination: '/en/debug', permanent: false },
    ];
  },
};

export default nextConfig;
