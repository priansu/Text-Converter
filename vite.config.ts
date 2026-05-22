import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemapPlugin from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemapPlugin({
      hostname: 'http://localhost:3000/',
      generateRobotsTxt: true,
      exclude: ['/404']
    })
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
