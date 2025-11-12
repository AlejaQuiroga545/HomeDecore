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
        beige: {
          50: '#faf8f5',
          100: '#f5f1e8',
          200: '#e8ddd0',
          300: '#d4c4b0',
          400: '#b8a088',
          500: '#a0886f',
          600: '#8b7359',
          700: '#735d4a',
          800: '#604e3f',
          900: '#514235',
        },
        brown: {
          50: '#faf7f4',
          100: '#f3ede6',
          200: '#e5d8c8',
          300: '#d4bca3',
          400: '#c09a7a',
          500: '#b0855f',
          600: '#9d6f4f',
          700: '#825a42',
          800: '#6b4b39',
          900: '#583f32',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

