/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "chivo-mono": ["Chivo Mono", "sans-serif"],
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
}
