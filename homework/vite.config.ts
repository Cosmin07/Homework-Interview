import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(() => {
  const plugins = [react()];
  return {
    plugins,
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './testSetup.ts', 
      mockReset: true
    },
  }
})
