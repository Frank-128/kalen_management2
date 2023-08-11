/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
        sx:'480px',
        mg:'580px'
      },
      colors:{backG:'#293450',
              backG2:'#2B2A40',
              backG3:'#f23f4a'
    }
    },
  },
  plugins: [],
};
