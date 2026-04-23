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
    },
  },
  plugins: [],
};
