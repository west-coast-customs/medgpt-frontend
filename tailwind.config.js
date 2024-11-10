/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      screens: {
        'desktop': '1024px'
      }
    },
    colors: {
      'blue': '#2196F3',
      'black': '#1C1C1C',
      'white': '#FFFFFF',
      'light-grey': '#F7F9FB',
      'mid-grey': '#F4F4F4',
      'disabled-grey': '#D9D9D9',
      'grey': '#7D7D7D',
      'border-grey': '#CCCCCC',
      'red': '#EE3B15'
    },
    fontFamily: {
      display: 'Inter, sans-serif'
    }
  },
  plugins: []
};
