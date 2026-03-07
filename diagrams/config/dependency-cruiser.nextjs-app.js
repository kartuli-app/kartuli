const base = require('./dependency-cruiser.base.js');

// Run from apps/backoffice-client; doNotFollow packages to avoid dependency-cruiser baseDir bug.
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  ...base,
  options: {
    ...base.options,
    tsConfig: { fileName: 'tsconfig.json' },
    doNotFollow: {
      path: ['node_modules', '^.*/packages/'],
    },
    exclude: {
      path: [
        '[.](?:spec|test)[.](?:ts|tsx)$',
        'node_modules',
      ],
    },
  },
};
