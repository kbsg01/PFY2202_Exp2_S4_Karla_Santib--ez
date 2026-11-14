/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Animación de la barra de progreso global
      keyframes: {
        progreso: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(300%)' },
        },
      },
      animation: {
        progreso: 'progreso 1.1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
