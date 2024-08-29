/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Roboto Serif', 'serif'],
        'mono': ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
