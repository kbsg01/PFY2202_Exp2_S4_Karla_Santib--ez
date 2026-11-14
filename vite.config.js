import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base absoluta para GitHub Pages: https://kbsg01.github.io/PFY2202_Exp2_S4_Karla_Santib--ez/
export default defineConfig({
  base: '/PFY2202_Exp2_S4_Karla_Santib--ez/',
  plugins: [react()],
});
