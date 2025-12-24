import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0', // This is the secret to fixing the 8080 error
    port: 8080,
    strictPort: true
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true
  },
  build: {
    outDir: 'dist'
  }
})
