// vite.config.js
import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: ".",
  publicDir: "public",

  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },

  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "legacy",
        silenceDeprecations: ["import"],
      },
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
