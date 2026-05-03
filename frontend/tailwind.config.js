/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        magistral: ["var(--font-magistral)"],
        beausans: ["var(--font-beausans)"],
        roboto: ["var(--font-roboto)"],
        sarabun: ["var(--font-sarabun)"],
      },
        colors: {
          grayLow: "#F2F2F2",
          grayNormal: "#44494D",
          grayMedium: "#B5B4B4",
          primary: "#EE0033",
          black: "#000000",
        }
    },
  },
  plugins: [],
};
