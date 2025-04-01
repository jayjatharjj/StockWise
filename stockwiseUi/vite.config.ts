import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'datatables.net-dt': path.resolve(__dirname, 'node_modules/datatables.net-dt'),
    },
  },
})
