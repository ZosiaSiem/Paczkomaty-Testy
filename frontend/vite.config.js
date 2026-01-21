import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //przekierowanie zapytań API do backendu
        changeOrigin: true, //udaje ze zadanie pochodzi bezpośrednio z backendu
        rewrite: path => path.replace(/^\/api/, ''), //usuwanie /api z początku ścieżki przed wysłaniem zadania do backendu
      },
    },
  },
})
