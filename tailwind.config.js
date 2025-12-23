/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: '#10b981',
        teal: '#14b8a6',
        cyan: '#06b6d4',
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      backgroundImage: {
        'vibrant-gradient': 'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)',
      }
    },
  },
  plugins: [],
}
