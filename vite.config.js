import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/lib/styles/variables.css";',
      },
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code
          vendor: ['@prismicio/client', '@prismicio/svelte'],
        },
      },
    },
  },
  server: {
    fs: {
      allow: ["..", "./slicemachine.config.json"],
    },
  },
});
