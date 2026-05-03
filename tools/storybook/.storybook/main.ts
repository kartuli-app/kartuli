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
    reactDocgenTypescriptOptions: {
      exclude: [
        '**/*.stories.tsx',
        '../../apps/game-client/src/**/*.stories.tsx',
        '../../packages/ui/src/**/*.stories.tsx',
      ],
      include: [
        '.storybook/**/*.tsx',
        '../../apps/game-client/src/**/*.tsx',
        '../../packages/ui/src/**/*.tsx',
      ],
      tsconfigPath: './tsconfig.docgen.json',
    },
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
      // Force automatic JSX for app stories (Vite 8 uses Oxc; `esbuild` is deprecated).
      // Without this, transforms follow the tsconfig nearest each file; `apps/game-client`
      // inherits Next's `jsx: "preserve"`, leaving `<` in the module. Storybook's
      // `external-globals-plugin` then runs `es-module-lexer` on that source and throws
      // misleading parse errors.
      ...(config.oxc === false
        ? {}
        : {
            oxc: {
              ...(typeof config.oxc === 'object' && config.oxc ? config.oxc : {}),
              jsx: { runtime: 'automatic' as const },
            },
          }),
      plugins: [...(config.plugins || []), tailwindcss()],
    };
  },
};

export default config;
