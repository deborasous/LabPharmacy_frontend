/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    maxWidth: {
      320: "19.375rem",
    },
    minWidth: {
      280: "15rem",
    },
    extend: {
      minHeight: {
        390: "24.375rem",
      },
      height: {
        card: "32rem",
        180: "11.25rem",
      },
    },
  },
  plugins: [],
};
