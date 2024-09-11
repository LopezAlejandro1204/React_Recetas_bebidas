/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  //Aqui se puede usar clases personalizadas
  theme: {
    extend: {
      backgroundImage : {
        "header" : "url('/bg.jpg')"
      }
    },
  },
  plugins: [],
}

