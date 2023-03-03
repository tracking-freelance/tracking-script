// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/tracking.ts"),
      name: "tracking",
      fileName: "tracking"
    },
    rollupOptions: {
      treeshake: true
    },
    minify: true
  }
});
