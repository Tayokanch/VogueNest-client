/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        '2/0.9': '2/0.9',
      },
      backgroundColor: {
        Pearl: '#FCFCF7',
        Lavender: '#F4F1F8',
        AliceBlue: '#F0F8FF',
      },
      mixBlendMode: {
        darken: 'darken',
      },
    },
  },
  plugins: [],
};
