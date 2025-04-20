
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for better performance
    target: "es2020",
    // Generate sourcemaps for debugging in production
    sourcemap: mode === 'production' ? 'hidden' : true,
    // Minify output
    minify: mode === 'production' ? 'esbuild' : false,
    // Configure CSS optimization
    cssMinify: mode === 'production',
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            '@tanstack/react-query',
            'lucide-react',
          ],
          ui: [
            '@/components/ui',
          ],
        },
      },
    },
    // Configure to decrease bundle size
    chunkSizeWarningLimit: 800,
  },
}));
