// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(button|navbar|progress|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F7",
        primary: "#8AA398",
        primaryLight: "#CDEAE3",
        accent: "#FFEBD2",
        text: "#4D4D4D",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};