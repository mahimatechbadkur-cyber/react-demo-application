import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  test: {
    globals: true,           // Allows using describe/it/expect without manual imports
    environment: 'jsdom',    // Simulates a browser in Node.js
    setupFiles: './src/setupTests.js', // Global setup file
  },
})
