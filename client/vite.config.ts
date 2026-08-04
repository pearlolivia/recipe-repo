import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: './docs'
  },
  resolve: {
    alias: {
      '@/ROUTES': path.resolve(__dirname, '../server/routes/endpoints'),
      '@/MODELS': path.resolve(__dirname, '../server/models'),
      '@': path.resolve(__dirname, './src')
    }
  }
})
