/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: '#f0f5fe',
        secondary: '#d0e0fe',
        Skyblue: '#5eacf5',
        Gray: '#857e8e'
      },
    },
  },
  plugins: [],
}
