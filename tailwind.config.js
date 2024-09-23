/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.js", "./templates/**/*.html.twig"],
  theme: {
    extend: {
      colors: {
        azure: "#31a7ff",
        "dark-blue": "#4960b5",
        "light-gray": "#cccccc",
        "dark-gray": "#464a58",
        red: "#aa1c25",
        orange: "#aa6021",
      },
    },
  },
  plugins: [],
};
