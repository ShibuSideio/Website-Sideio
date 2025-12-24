import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // THIS IS THE FIX: Forces all libraries to use the exact same React instance
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  base: '/',
  build: {
    outDir: 'dist',
    commonjsOptions: {
      // Helps older libraries (like AOS) work with modern Vite
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 8080
  }
})
