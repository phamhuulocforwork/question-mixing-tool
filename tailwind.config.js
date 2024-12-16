module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "736px",
      lg: "768px",
      xl: "800px",
    },
    extend: {
      backgroundImage: {
        "square-pattern": "url('/src/assets/svgs/background.svg')",
      },
    },
  },
  plugins: [],
};
