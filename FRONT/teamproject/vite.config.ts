import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/1262000': {
        target: 'https://apis.data.go.kr', 
        changeOrigin: true, 
      },
      '/kosis': {
        target: 'https://kosis.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kosis/, ''),
      },
    },
    
  }
});