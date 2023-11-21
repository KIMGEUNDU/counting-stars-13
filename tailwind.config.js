/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        starPink: '#EAAA95',
        starYellow: '#FFB902',
        starBlack: '#333333',
        starGreen: '#C4DEC3',
        starRed: '#FA622F',
      },
      screens: {
        s: { min: '280px', max: '1024px' },
      },
    },
  },
  plugins: [],
};
