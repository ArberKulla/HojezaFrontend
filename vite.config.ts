import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '~', replacement: resolve(__dirname) },
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/test.config.ts',
  },
});
