/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ADD THIS LINE
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can define Arkynix specific reds here
        arkyRed: '#ef4444',
      }
    },
  },
  plugins: [],
}