// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: { main: resolve(__dirname, "index.html") },
    },
  },
  server: {
    port: 3000,
    open: true,
    hmr: { overlay: true },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // ✅ Use legacy API for @import compatibility
        api: "legacy",
        // ✅ Inject variables globally via @import
        additionalData: `@import "@/styles/variables";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
