import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiPlugin } from './server/apiPlugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    apiPlugin()
  ],
  server: {
    port: 5173,
    host: true
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-gsap': ['gsap'],
        }
      }
    }
  }
})
