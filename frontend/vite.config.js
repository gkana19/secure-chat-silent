import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createServer } from "vite";

// const server = createServer({
//   middleware: [
//     (req, res, next) => {
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS"
//       );
//       res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//       );
//       next();
//     },
//   ],
// });

export default defineConfig({
  plugins: [react()],
  server: {
    // middlewareMode: true,
    // server,
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
