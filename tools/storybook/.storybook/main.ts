import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import type { Alias, AliasOptions } from 'vite';

function mergeViteAlias(
  existing: AliasOptions | undefined,
  additions: Record<string, string>,
): Alias[] {
  const extra: Alias[] = Object.entries(additions).map(([find, replacement]) => ({
    find,
    replacement,
  }));
  if (!existing) {
    return extra;
  }
  if (Array.isArray(existing)) {
    return [...existing, ...extra];
  }
  const fromObject: Alias[] = Object.entries(existing).map(([find, replacement]) => ({
    find,
    replacement: replacement as string,
  }));
  return [...fromObject, ...extra];
}

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

const config: StorybookConfig = {
  stories: [
    '../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../../apps/game-client/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    return {
      ...config,
      resolve: {
        ...config.resolve,
        // Mirror the root tsconfig path aliases; merge so array-form aliases from
        // presets or plugins are preserved.
        alias: mergeViteAlias(config.resolve?.alias, {
          '@game-client': resolve(repoRoot, 'apps/game-client/src'),
          '@kartuli/ui': resolve(repoRoot, 'packages/ui/src'),
        }),
      },
      // Force the automatic JSX runtime for every file `storybook build`
      // hands to esbuild. Without this, esbuild reads the tsconfig nearest
      // each source file: packages/ui and tools/storybook both set
      // `jsx: "react-jsx"`, but apps/game-client/tsconfig.json inherits
      // `jsx: "preserve"` from the root tsconfig (required by Next.js).
      // That leaves JSX + TS generics intact in stories under
      // apps/game-client/src, and the downstream
      // `storybook:external-globals-plugin` then fails with a parse error
      // on the first `<` (e.g. `Meta<typeof ...>`). The Vitest / addon-vitest
      // pipeline uses oxc instead (whose default runtime is already
      // 'automatic'), so only esbuild needs pinning here.
      esbuild: {
        ...config.esbuild,
        jsx: 'automatic',
      },
      define: {
        ...config.define,
        // Polyfill process.env for components that read it (e.g. DeploymentDebugPanel in Storybook)
        'process.env': JSON.stringify({
          NODE_ENV: process.env.NODE_ENV || 'development',
          NEXT_PUBLIC_BUILD_TIME: process.env.NEXT_PUBLIC_BUILD_TIME || '',
          NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
          VERCEL_ENV: process.env.VERCEL_ENV,
          NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
          NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
          NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
          NEXT_PUBLIC_VERCEL_REGION: process.env.NEXT_PUBLIC_VERCEL_REGION,
        }),
      },
      plugins: [...(config.plugins || []), tailwindcss()],
    };
  },
};

export default config;
