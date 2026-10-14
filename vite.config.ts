import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemapPlugin from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemapPlugin({
      hostname: 'https://caseconverters.in/',
      generateRobotsTxt: true,
      exclude: ['/404'],
      dynamicRoutes: [
        '/guide/camel-case-vs-pascal-case',
        '/guide/how-to-format-json-keys',
        '/guide/title-case-rules-for-essays',
        '/guide/snake-case-vs-kebab-case-in-api-design',
        '/guide/sentence-case-in-modern-ui-design',
      ]
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
