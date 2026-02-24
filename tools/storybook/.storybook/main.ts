import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ['../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
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
      define: {
        ...config.define,
        // Polyfill process.env for components that read it (e.g. DeploymentDebugPanel in Storybook)
        'process.env': JSON.stringify({
          NODE_ENV: process.env.NODE_ENV || 'development',
          NEXT_PUBLIC_BUILD_TIME: '',
          NEXT_PUBLIC_VERCEL_ENV: undefined,
          VERCEL_ENV: undefined,
          NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: undefined,
          NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: undefined,
          NEXT_PUBLIC_VERCEL_URL: undefined,
          NEXT_PUBLIC_VERCEL_REGION: undefined,
        }),
      },
      plugins: [...(config.plugins || []), tailwindcss()],
    };
  },
};

export default config;
