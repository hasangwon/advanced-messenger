/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/features/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors,
    theme: {},
    extend: {
      flex: {
        0.5: "0.5 0.5 0%",
        1.5: "1.5 1.5 0%",
        1.75: "1.75 1.75 0%",
        2: "2 2 0%",
        3: "3 3 0%",
        3.5: "3.5 3.5 0%",
        3.75: "3.75 3.75 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      keyframes: {
        gradient: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        opacity: {
          "0%": {
            opacity: "50%",
          },
          "50%": {
            opacity: "75%",
          },
          "100%": {
            opacity: "100%",
          },
        },
      },
      background: {
        gradient: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
      },
      animation: {
        gradient: "gradient 15s ease infinite",
        "spin-slow": "spin 4s linear infinite",
        "bounce-welcome": "bounce 3s ease-in-out infinite",
        "bounce-ease": "bounce 2.5s ease infinite",
        "cubic-bounce": "bounce 2.2s cubic-bezier(0.4, 0, 1, 1) infinite",
        "cubic-bounce-offbeat": "bounce 2.7s cubic-bezier(0.25, 0.5, 0.75, 1) infinite",
        opacity: "opacity 4.5s ease-in-out infinite",
      },
      colors: {
        creamBlack: "#363840",
        periwinkle: "#BCD5FF",
        anakiwa: "#95BEFF",
        primary: {
          DEFAULT: "#FF9200",
          light: "#FFF4E5",
          // 600: '#4430E0',
        },
        secondary: {
          dark: "#F2F3F3",
          light: "#F5F6FA",
          normal: "#F5F6FA",
        },
        neutral: {
          dark: "#000000A6",
          light: "#00000040",
          normal: "#00000073",
        },
      },
      height: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "2/3": "66%",
        "3/4": "75%",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "95/100": "95%",
      },
      maxHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "45/100": "45%",
        "47/100": "47%",
        "95/100": "95%",
      },
      screens: {
        xl: "1440px",
        "2xl": "1680px",
        "3xl": "1920px",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  variants: {},
  plugins: [],
};
