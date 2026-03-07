const base = require('./dependency-cruiser.base.js');

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  ...base,
  options: {
    ...base.options,
    tsConfig: { fileName: 'tsconfig.json' },
    collapse: '^(apps/[^/]+|packages/[^/]+|tools/[^/]+|docs)(/|$)',
    exclude: {
      path: [
        ...(base.options.exclude?.path ?? []),
        // Unresolved path-alias refs (@/...) when cruising from root — they are internal to each app, not a separate workspace
        '^@',
        '/\\.next/',
        '/coverage/',
        'coverage/',
        '/dist/',
        'storybook-static',
        '/\\.vitepress\\/cache/',
      ],
    },
  },
};
