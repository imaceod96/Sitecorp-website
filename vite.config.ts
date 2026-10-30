import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "url";

export default defineConfig(() => ({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
