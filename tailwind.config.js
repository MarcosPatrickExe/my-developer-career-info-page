/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1220",
        surface: "#0F1C30",
        surface2: "#152B44",
        line: "#28405F",
        teal: "#2DD4BF",
        violet: "#8B7CF6",
        mist: "#8496AC",
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
