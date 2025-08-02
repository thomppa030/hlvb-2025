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
  server: {
    fs: {
      allow: [".."],
    },
  },
});
