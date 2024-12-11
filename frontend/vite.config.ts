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
  },
  resolve: {
    alias: {
      "@atoms": path.resolve(__dirname, "src/core/ui/atoms"),
      "@molecules": path.resolve(__dirname, "src/core/ui/molecules"),
      "@features": path.resolve(__dirname, "src/features"),
      "@templates": path.resolve(__dirname, "src/core/ui/templates"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../ws_event_page/public/frontend",
    emptyOutDir: true,
    target: "es2015",
  },
});
