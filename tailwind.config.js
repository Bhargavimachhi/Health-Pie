/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/index.html',
    './views/signup.html',
    './views/login.html',
    './views/*.{html}'
  
  ],
  theme: {
    extend: {
      fontFamily: {
       "font-family": "Kaushan Script", cursive,
      }
    },
  },
  plugins: [],
}

