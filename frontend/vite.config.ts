import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import proxyOptions from "./proxyOptions";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: proxyOptions,
    host: true
  },
  resolve: {
    alias: {
      "@atoms": path.resolve(__dirname, "src/core/ui/atoms"),
      "@molecules": path.resolve(__dirname, "src/core/ui/molecules"),
      "@features": path.resolve(__dirname, "src/features"),
      "@templates": path.resolve(__dirname, "src/core/ui/templates"),
      "@": path.resolve(__dirname, "src"),
      "@happy-box": path.resolve(__dirname, "src/app/happy-box"),
      "@nutrition-journey": path.resolve(__dirname, "src/app/nutrition-journey"),
      "@happy-run": path.resolve(__dirname, "src/app/happy-run"),
      "@greatest-show-25": path.resolve(__dirname, "src/app/greatest-show-25"),
    },
  },
  build: {
    outDir: "../ws_event_page/public/frontend",
    emptyOutDir: true,
    target: "es2015",
    sourcemap: true,
  },
});
