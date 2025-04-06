/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        plum: '#331025',
      },
      keyframes: {
        bubble: {
          "0%": { transform: "scale(1)", boxShadow: "0 0 0 rgba(255, 0, 129, 0.5)" },
          "50%": { transform: "scale(1.2)", boxShadow: "0 4px 25px rgba(255, 0, 129, 0.7)" },
          "100%": { transform: "scale(1)", boxShadow: "0 2px 15px rgba(255, 0, 129, 0.5)" }
        },
        shimmer: {
          "0%, 100%": {
            opacity: "0.9",
            transform: "scale(1)"
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.02)"
          }
        }
      },
      animation: {
        bubble: "bubble 0.75s ease-in-out",
        shimmer: "shimmer 2s ease-in-out infinite"
      }
    }
  },
  plugins: [],
};

