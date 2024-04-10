/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffe049",
        primary2: "#ffca22",
        dark: "#393E46",
        dark2: "#222831",
        white: "#fafafa",
        lightgrey: "#ebebeb",
        grey: "#c4c4c4",
      },
      screens: {
        "2xs": "375px",
        xs: "430px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        skeleton: {
          "0%": {
            background: "rgba(0,0,0,0.1)",
          },
          "100%": {
            background: "rgba(0,0,0,0.25)",
          },
        },
      },
      animation: {
        skeleton: "skeleton 2.5s infinite alternate",
      },
    },
  },
  plugins: [],
};
