import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { EventEmitter } from "events";

EventEmitter.defaultMaxListeners = 20;

const myCustomMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://secure-backend-production.up.railway.app",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    middleware: [myCustomMiddleware], // Add your middleware function here
  },
  optimizeDeps: {
    exclude: ["react-notification-badge"],
  },
});
