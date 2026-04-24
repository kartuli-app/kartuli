const base = require('./dependency-cruiser.base.js');

// Run from apps/backoffice-client; doNotFollow packages to avoid dependency-cruiser baseDir bug.
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  ...base,
  options: {
    ...base.options,
    tsConfig: { fileName: '../../tsconfig.json' },
    webpackConfig: { fileName: '../../tools/diagram-generator/config/dependency-cruiser.webpack-resolve.cjs' },
    doNotFollow: {
      path: ['node_modules', '^.*/packages/'],
    },
    exclude: {
      path: [
        ...(base.options.exclude?.path ?? []),
        '[.](?:spec|test)[.](?:ts|tsx)$',
        'vitest-setup.d.ts',
        'dev-logger.ts',
        // Omit @kartuli/ui (../../packages/ui/... from apps/*-client) from diagrams — still a real dep in code.
        String.raw`(?:^|[/\\])packages[/\\]ui(?:[/\\]|$)`,
      ],
    },
  },
};
