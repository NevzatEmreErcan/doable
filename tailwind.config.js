/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        background: {
          100: "#d2d2d2",
          200: "#a5a5a5",
          300: "#797979",
          400: "#4c4c4c",
          500: "#1f1f1f",
          600: "#191919",
          700: "#131313",
          800: "#0c0c0c",
          900: "#060606",
        },
        primary: {
          100: "#decdee",
          200: "#be9cde",
          300: "#9d6acd",
          400: "#7d39bd",
          500: "#5c07ac",
          600: "#4a068a",
          700: "#370467",
          800: "#250345",
          900: "#120122",
        },
        secondary: {
          100: "#d6ccd8",
          200: "#ac99b2",
          300: "#83668b",
          400: "#593365",
          500: "#30003e",
          600: "#260032",
          700: "#1d0025",
          800: "#130019",
          900: "#0a000c",
        },
        accent: {
          100: "#f8eada",
          200: "#f1d5b5",
          300: "#eac08f",
          400: "#e3ab6a",
          500: "#dc9645",
          600: "#b07837",
          700: "#845a29",
          800: "#583c1c",
          900: "#2c1e0e",
        },
      },
    },
  },
  plugins: [],
};
