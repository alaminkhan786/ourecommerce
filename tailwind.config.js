/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff0ed',
          100: '#ffe1db',
          200: '#ffc3b7',
          300: '#ffa593',
          400: '#ff876f',
          500: '#FF5733', // Main primary color
          600: '#cc4629',
          700: '#99341f',
          800: '#662315',
          900: '#33110a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
