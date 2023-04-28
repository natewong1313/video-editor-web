/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "chivo-mono": ["Chivo Mono", "sans-serif"],
      },
      colors: {
        "lilac": {
          50: "#f0effe",
          100: "#e2e1fe",
          200: "#cecafb",
          300: "#b2a9f8",
          400: "#9c87f2",
          500: "#8d6aea",
          600: "#804dde",
          700: "#6739b7",
          800: "#5a359e",
          900: "#4b327d"
        } 
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
