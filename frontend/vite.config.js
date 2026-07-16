import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",

    // Allow external hosts such as ngrok
    allowedHosts: true,

    proxy: {
      "/api": {
        target: "http://backend-service:5001",
        changeOrigin: true,
      },
    },
  },
});