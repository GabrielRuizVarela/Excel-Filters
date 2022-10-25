/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(255, 122,110)",
        secondary: "rgb(213, 63, 138)",
        // "danger": "#e3342f",
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("daisyui")],
}
