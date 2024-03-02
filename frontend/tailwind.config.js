/** @type {import('tailwindcss').Config} */
const defaultTheme = require ('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'xs':'360px' ,
      'sm':'640px',
      ...defaultTheme.screens
    },
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}