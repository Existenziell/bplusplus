const nextConfig = require('eslint-config-next');

module.exports = [
  ...nextConfig,
  {
    ignores: ['coverage.json', 'coverage/**', 'test/**'],
  },
];
