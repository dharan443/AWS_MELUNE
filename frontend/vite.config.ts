import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host:"0.0.0.0",
    port: 2885,
   proxy: {
      "/api": "http://localhost:5000", // This ensures /api calls go to the backend
    },  }, 
 
});
