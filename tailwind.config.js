/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '430px'
      }
    },
    colors: {
      'blue': '#2196F3',
      'black': '#1C1C1C',
    },
    fontFamily: {
      display: 'Inter, sans-serif'
    }
  },
  plugins: []
};
