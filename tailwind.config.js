/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // We rely on the default Tailwind palette for Emerald, Teal, Cyan, and Red
      // so we can use shades like emerald-50, teal-600, etc.
      fontFamily: { 
        sans: ['Inter', 'sans-serif', 'system-ui'] 
      },
      backgroundImage: {
        'vibrant-gradient': 'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)',
      },
      // Optional: Add custom animation support if needed later
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
