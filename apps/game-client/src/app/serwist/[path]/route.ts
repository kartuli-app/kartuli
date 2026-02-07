import { spawnSync } from 'node:child_process';
import { createSerwistRoute } from '@serwist/turbopack';

// Compute revision from git HEAD or use random UUID as fallback
const revision =
  spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).stdout?.trim() ||
  crypto.randomUUID();

const { GET } = createSerwistRoute({
  swSrc: 'src/app/sw.ts',
  additionalPrecacheEntries: [{ url: '/app', revision }],
  nextConfig: {},
});

export { GET };
