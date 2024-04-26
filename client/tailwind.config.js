/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Helvetica, Arial, sans-serif',
        'sans-serif': 'Youth Action, sans-serif',
        jersey: ["'Jersey 25'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
