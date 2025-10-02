// vite.config.ts for a Vite + React project

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitePluginSingleSpa from "vite-plugin-single-spa";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginSingleSpa({
      serverPort: 4102,
      spaEntryPoints: "src/main.tsx",
    }),
  ],
  define: {
    // Garante que global existe para compatibilidade
    global: 'globalThis',
  },
  server: {
    cors: true,
    hmr: false, // HotReload no React apenas funciona se rodar em standalone fora do root
  },
});
