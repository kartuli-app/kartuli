const path = require('node:path');

module.exports = {
  resolve: {
    alias: {
      '@game-client': path.resolve(__dirname, '../../apps/game-client/src'),
      '@backoffice-client': path.resolve(__dirname, '../../apps/backoffice-client/src'),
      '@kartuli/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
  },
};
