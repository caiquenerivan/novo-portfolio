/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        londrina: ['"Londrina Solid"', 'sans-serif'],
        josefin: ['"Josefin Slab"', 'serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
      },
    },
    screens: {
      'sm': "376px",
      'md': "640px",
      'lg': "769px",
      'mxl': "900px",
      'xl': "1024px",
      '2xl': "1280px",
      '3xl': "1536px",
    },
  },
  plugins: [],
};
