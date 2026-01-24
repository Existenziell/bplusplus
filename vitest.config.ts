import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx', 'tests/**/*.spec.ts', 'tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['app/**/*.ts', 'app/**/*.tsx', 'scripts/**/*.js'],
      exclude: ['app/docs/**/*.md', '**/*.test.*', '**/*.spec.*', '**/types/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
