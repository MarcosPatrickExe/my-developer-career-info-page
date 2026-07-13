/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#080C11",
        surface: "#0F1620",
        surface2: "#141D2A",
        line: "#223047",
        teal: "#2DD4BF",
        violet: "#8B7CF6",
        mist: "#7C8A99",
        paper: "#E7ECEF",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
