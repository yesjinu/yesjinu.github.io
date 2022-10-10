/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF8036",
        secondary: "#FFD154",
        tertiary: "#A9BED0",
        dark: "#212121",
        white: "#FFFFFF",
        gray: "#737D8D",
      },
    },
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1280px",
    },
  },
  plugins: [],
}
