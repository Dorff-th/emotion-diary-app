import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // ✅ 이거 꼭 필요!


export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },

   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ⬅️ 이거 중요!
    },
  },
})


