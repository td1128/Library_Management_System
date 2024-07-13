import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Library_Management_System/', // Ensure this has the leading and trailing slashes
  plugins: [react()],
  resolve: {
    alias: {
      src: './src',
    },
  },
  server: {
    port: 5173,
  },
  define: {
    'process.env': {},
  },
  esbuild: {
    supported: {
      'top-level-await': true // browsers can handle top-level-await features
    },
  }
})
