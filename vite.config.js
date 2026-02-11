import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/russmaennchen-cursor/', // WICHTIG: Name deines Repos auf GitHub!
})