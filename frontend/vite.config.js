import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { EventEmitter } from "events";

EventEmitter.defaultMaxListeners = 20;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://secure-backend-production.up.railway.app",
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    exclude: ["react-notification-badge"],
  },
});
