import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Your Vite configuration goes here
  // For example, to change the server port:
  server: {
    port: 3001,
    open: '/test.html', // Automatically open test.html in the browser
  },
});