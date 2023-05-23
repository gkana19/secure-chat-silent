// vite.config.js
import { defineConfig } from "file:///E:/Coding/KMUTT-course/cpe393-cybersecurity/secure-chat-silent/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Coding/KMUTT-course/cpe393-cybersecurity/secure-chat-silent/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createServer } from "file:///E:/Coding/KMUTT-course/cpe393-cybersecurity/secure-chat-silent/frontend/node_modules/vite/dist/node/index.js";
var server = createServer({
  middleware: [
    (req, res, next) => {
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
    }
  ]
});
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    // middlewareMode: true,
    server,
    proxy: {
      "/api": {
        target: "https://secure-backend-production.up.railway.app",
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    exclude: ["react-notification-badge"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RpbmdcXFxcS01VVFQtY291cnNlXFxcXGNwZTM5My1jeWJlcnNlY3VyaXR5XFxcXHNlY3VyZS1jaGF0LXNpbGVudFxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcQ29kaW5nXFxcXEtNVVRULWNvdXJzZVxcXFxjcGUzOTMtY3liZXJzZWN1cml0eVxcXFxzZWN1cmUtY2hhdC1zaWxlbnRcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0NvZGluZy9LTVVUVC1jb3Vyc2UvY3BlMzkzLWN5YmVyc2VjdXJpdHkvc2VjdXJlLWNoYXQtc2lsZW50L2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVNlcnZlciB9IGZyb20gXCJ2aXRlXCI7XG5cbmNvbnN0IHNlcnZlciA9IGNyZWF0ZVNlcnZlcih7XG4gIG1pZGRsZXdhcmU6IFtcbiAgICAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgIHJlcy5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgICAgcmVzLnNldEhlYWRlcihcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzXCIsXG4gICAgICAgIFwiR0VULCBQT1NULCBQVVQsIERFTEVURSwgT1BUSU9OU1wiXG4gICAgICApO1xuICAgICAgcmVzLnNldEhlYWRlcihcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsXG4gICAgICAgIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgQXV0aG9yaXphdGlvblwiXG4gICAgICApO1xuICAgICAgbmV4dCgpO1xuICAgIH0sXG4gIF0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBzZXJ2ZXI6IHtcbiAgICAvLyBtaWRkbGV3YXJlTW9kZTogdHJ1ZSxcbiAgICBzZXJ2ZXIsXG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwczovL3NlY3VyZS1iYWNrZW5kLXByb2R1Y3Rpb24udXAucmFpbHdheS5hcHBcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbXCJyZWFjdC1ub3RpZmljYXRpb24tYmFkZ2VcIl0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVosU0FBUyxvQkFBb0I7QUFDaGIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBRTdCLElBQU0sU0FBUyxhQUFhO0FBQUEsRUFDMUIsWUFBWTtBQUFBLElBQ1YsQ0FBQyxLQUFLLEtBQUssU0FBUztBQUNsQixVQUFJLFVBQVUsK0JBQStCLEdBQUc7QUFDaEQsVUFBSTtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUNBLFVBQUk7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFDQSxXQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQTtBQUFBLElBRU47QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsMEJBQTBCO0FBQUEsRUFDdEM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
