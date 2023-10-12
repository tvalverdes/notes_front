/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: {
        50: '#E6E9EC',
        100: '#B0BCC4',
        200: '#8A9BA8',
        300: '#546E80',
        400: '#335168',
        500: '#002742',
        600: '#00233C',
        700: '#001B2F',
        800: '#001524',
        900: '#00101C',
      },
      secondary: {
        50: '#FCF4E6',
        100: '#F7DEB0',
        200: '#F3CE8A',
        300: '#EEB854',
        400: '#EAAA33',
        500: '#E59500',
        600: '#D08800',
        700: '#A36A00',
        800: '#7E5200',
        900: '#603F00',
      },
      accent: '#850033',
      text: '#E6DBDB',
      background: '#130E01',
    },
    extend: {},
  },
  plugins: [],
}
