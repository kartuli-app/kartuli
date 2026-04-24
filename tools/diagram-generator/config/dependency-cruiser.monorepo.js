const base = require('./dependency-cruiser.base.js');

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  ...base,
  options: {
    ...base.options,
    tsConfig: { fileName: 'tsconfig.json' },
    // collapse: '^(apps/[^/]+|packages/[^/]+|tools/[^/]+|docs)(/|$)',
    exclude: {
      path: [
        ...(base.options.exclude?.path ?? []),
        '[.](?:spec|test)[.](?:ts|tsx)$',
        String.raw`/\.next/`,
        '/coverage/',
        'coverage/',
        '/dist/',
        'storybook-static',
        String.raw`/\.vitepress/cache/`,
        'diagrams/',
        'tools/diagram-generator/node_modules',
        'vitest.config.mts',
        'next-env.d.ts',
        'postcss.config.mjs',
        'next.config.ts',
        'playwright.config.ts',
        'vitest-setup.d.ts',
        'setupTests.ts',
        'vitest.config.ts',
        'postcss.config.js',
      ],
    },
  },
};
