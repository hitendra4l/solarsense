/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#F8EEE7",
          soft: "#C0B3A0",
          hard: "#E14658",
        },
        dark: {
          soft: "#3F3250",
          hard: "#22252C",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      screens: {
        print: { raw: "print" },
        screen: { raw: "screen" },
      },
    },
  },
  plugins: [],
};
