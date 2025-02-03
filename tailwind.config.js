/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        saira: ["Saira", "sans-serif"],
        poller: ["Poller One", "cursive"],
        baumans: ["Baumans", "system-ui"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        richPink: {
          100: "#B84B68",
        },
        richBlue: {
          100: "#385F98",
        },
        richYellow: "#FED83C",
      },
    },
  },
  plugins: [],
};
