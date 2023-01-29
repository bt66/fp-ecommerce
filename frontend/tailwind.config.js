/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'default-white' : '#F4F4EC',
        'default-dark': '#1E1E1E',
        'dark-secondary': '#121212',
        'white-secondary' : '#ADAFB2',
        'btn-primary' : '#C4EB12',
        'btn-primary-hover' : '#1a8a42',
        'primary-color' :  '#C4EB12',
        'grey' : '#2F2F2F',
        'divider' : '#575757',
        'secondary-grey' : '#D9D9D9',
        'base-grey' : '#2F2F2F',
        'third-grey' : '#454545',
        'fourth-grey' : '#5D5C5C',

      },
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
