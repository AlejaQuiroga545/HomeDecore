import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C2416',
          50: '#faf9f7',
          100: '#f5f2ed',
          200: '#e8e0d4',
          300: '#d4c7b0',
          400: '#b8a689',
          500: '#9d8a6f',
          600: '#7a6a55',
          700: '#5d5042',
          800: '#3d3429',
          900: '#2C2416',
        },
        accent: {
          DEFAULT: '#C97D60',
          50: '#fdf6f4',
          100: '#faebe6',
          200: '#f4d4c8',
          300: '#ebb5a0',
          400: '#df8f72',
          500: '#C97D60',
          600: '#b8664a',
          700: '#99513d',
          800: '#7d4335',
          900: '#67392e',
        },
        warm: {
          50: '#fef8f4',
          100: '#fceee2',
          200: '#f8dac0',
          300: '#f2be94',
          400: '#ea9966',
          500: '#e37a3f',
          600: '#d4622a',
          700: '#b04d23',
          800: '#914021',
          900: '#77381f',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf1e3',
          300: '#f5e5cc',
          400: '#eed3ad',
          500: '#e4ba87',
          600: '#d49d63',
          700: '#b87f4f',
          800: '#986843',
          900: '#7d5638',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config

