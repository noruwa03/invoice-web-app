/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        GeneralSans: ["GeneralSans", "serif"],
      },
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [],
};
