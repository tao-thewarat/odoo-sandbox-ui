import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Must match the redirect URI registered in Entra
    port: 5173,
    strictPort: true,
    // The odoo-sandbox proxy; keeps the session cookie same-origin
    proxy: { '/api': 'http://localhost:8080', '/auth': 'http://localhost:8080' },
  },
})
