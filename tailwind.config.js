/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#07070A",
        surface: "#0E0E12",
        surface2: "#17171C",
        line: "#2B2B32",
        teal: "#2DD4BF",
        violet: "#8B7CF6",
        mist: "#8B92A0",
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
