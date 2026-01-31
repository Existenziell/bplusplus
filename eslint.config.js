const nextConfig = require('eslint-config-next');

module.exports = [
  ...nextConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: ['coverage.json', 'coverage/**', 'test/**'],
  },
];
