/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        body: "#F9F7F5",
        pink: "#FEF0E5",
        bar: "#101630",
        yellow: "#FDD400",
        button: "#3B10E3",
        blue: "#3498DB",
        bgrgba: "rgba(104,109,224,0.1)",
        overlay: "rgba(0,0,0,0.6)",
        darkBlue: "#2C3E50",
      },
      animation: {
        "open-popup": "popup linear .2s",
        "blur-option": "blurShow linear .2s",
        copied: "fromTop linear .2s",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
