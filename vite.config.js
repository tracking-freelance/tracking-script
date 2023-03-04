// vite.config.js
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
    },
    define: {
      VITE_SERVER: env.VITE_SERVER
    }
  };
});
