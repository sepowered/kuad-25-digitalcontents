import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
      },
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // TypeScript 경고들을 무시
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        if (warning.code === 'TS6133') return;
        warn(warning);
      },
    },
  },
  esbuild: {
    // TypeScript 관련 에러를 경고로 변경
    logOverride: {
      'this-is-undefined-in-esm': 'silent',
    },
  },
});
