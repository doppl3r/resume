import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: false, // Disable hot reload on save
  },
  plugins: [
    react()
  ],
  base: './',
  build: {
    emptyOutDir: true,
    rollupOptions: {
      treeshake: false
    }
  }
})
