import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/tests/setup.ts',
    coverage: {
      reporter: 'text',
      reportsDirectory: 'src/tests/coverage',
    },
  },
});
