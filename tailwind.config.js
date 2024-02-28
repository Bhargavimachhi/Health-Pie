/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.html"],
  theme: {
    extend: {
      backgroundImage: {
      'hero': "url('../assets/images/stethoscop.jpg')",
      "doc":"url('../assets/images/doc.jpg)"
    },
    blur: {
      xs: '2px',
    }},
  },
  plugins: [],
}

