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
          DEFAULT: '#96a141',
          '50': '#f9f9ec',
          '100': '#eff0d7',
          '200': '#e0e3b3',
          '300': '#c5cc7b',
          '400': '#b3bc5f',
          '500': '#96a141',
          '600': '#757f31',
          '700': '#596229',
          '800': '#484f25',
          '900': '#3e4423',
          '950': '#20240f',
        },
        wine: {
          DEFAULT: '#582b36',
          '50': '#faf5f7',
          '100': '#f7ecf1',
          '200': '#f0dae3',
          '300': '#e5bccc',
          '400': '#d393aa',
          '500': '#c3718d',
          '600': '#ae546e',
          '700': '#944257',
          '800': '#7b3949',
          '900': '#582b36',
          '950': '#3e1922',
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
