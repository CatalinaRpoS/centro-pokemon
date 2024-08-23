import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@elements': path.resolve(__dirname, 'src/elements'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
    },
  },
  plugins: [react()],
})
