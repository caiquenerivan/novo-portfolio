/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'sm': "376px",
      'md': "640px",
      'lg': "769px",
      'xl': "1024px",
      '2xl': "1280px",
      '3xl': "1536px",
    },
  },
  plugins: [],
};
