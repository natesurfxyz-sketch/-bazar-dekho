/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101513',
        leaf: '#b6e36a',
        paper: '#f5f4ee',
      },
      fontFamily: {
        sans: ['DM Sans', 'Hind Siliguri', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
