import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: los assets funcionan en GitHub Pages (https://<usuario>.github.io/<repo>/).
export default defineConfig({
  base: './',
  plugins: [react()],
});
