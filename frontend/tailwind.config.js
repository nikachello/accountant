/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "BPG-Glaho": ["BPG Glaho", "sans-serif"],
        Nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        textGray: "#818194",
        textActive: "#605BFF",
        pageBG: "#F7F7F8",
        primaryButton: "#605BFF",
        primaryButtonHover: "#4D4ADC",
      },
    },
  },
  plugins: [],
};
