/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          light: '#2d4a7c',
          dark: '#102442',
        },
        secondary: {
          DEFAULT: '#2d3748',
          light: '#4a5568',
          dark: '#1a202c',
        },
      },
    },
  },
  plugins: [],
}