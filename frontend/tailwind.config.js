/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    spacing: {
      0: "0px",
      none: "0px",
      thin: "1px",
      xs: "4px",
      sm: "8px",
      md: "12px",
      "2m": "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "36px",
      "3xl": "44px",
      "4xl": "60px",
    },
    fontSize: {
      "2xs": "9px",
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "32px",
    },
    extend: {},
  },
  plugins: [],
};
