/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans'],
    },
    colors: {
        brand: {
            DEFAULT: '#2990ff',
            50: '#eef8ff',
            100: '#d9eeff',
            200: '#bce2ff',
            300: '#8ed0ff',
            400: '#59b5ff',
            500: '#2990ff',
            600: '#1b75f5',
            700: '#145fe1',
            800: '#174cb6',
            900: '#19438f',
            950: '#142a57',
        },
        neutral: {
            50: '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d4d4d8',
            400: '#a1a1aa',
            500: '#71717a',
            600: '#52525b',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
            950: '#09090b',
        }
      }
    },
  },
  plugins: [],
}
