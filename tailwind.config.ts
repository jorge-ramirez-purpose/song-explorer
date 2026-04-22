import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#6fc13e',
        'orange': '#ff8e00',
        'red': '#dc001c',
        'black': '#000',
        'dark-bg': '#101010',
        'dark-border': '#383635',
        'dark-text': '#939393',
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
