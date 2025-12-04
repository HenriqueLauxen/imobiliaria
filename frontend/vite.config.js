import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
        '/usuarios': 'http://localhost:8080',
        '/bairros': 'http://localhost:8080',
        '/tiposimoveis': 'http://localhost:8080',
        '/imoveis': 'http://localhost:8080',
        '/fotos': 'http://localhost:8080'
    }
  }
})
