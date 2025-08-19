/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/**/*.{js,ts}',
    './src/**/*.svelte'
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary: Purple #921E8D
        primary: {
          50: '#f7eaf7',
          100: '#efd5ef',
          200: '#dfabe0',
          300: '#ce81d0',
          400: '#bc57c1',
          500: '#a334a8',
          600: '#921E8D', // base
          700: '#7b1d7b',
          800: '#6f1b6e',
          900: '#4f1350',
        },
        // Brand secondary: Yellow #FFF00C
        secondary: {
          50: '#fffde6',
          100: '#fffac2',
          200: '#fff68f',
          300: '#fff14d',
          400: '#FFE91A',
          500: '#FFF00C', // base
          600: '#e6da10',
          700: '#bfb50d',
          800: '#998f0a',
          900: '#736a08',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      }
    },
  },
  plugins: [],
}
