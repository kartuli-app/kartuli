const base = require('./dependency-cruiser.base.js');

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  ...base,
  options: {
    ...base.options,
    tsConfig: { fileName: 'tsconfig.json' },
    exclude: {
      path: [
        '/\\.next/',
        '/coverage/',
        'coverage/',
        '/dist/',
        'storybook-static',
        '/\\.vitepress\\/cache/',
        'node_modules',
      ],
    },
  },
};
