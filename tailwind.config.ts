import type { Config } from 'tailwindcss'
import { colors } from './src/constants/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': colors.brand,
        'green': colors.green,
        'orange': colors.orange,
        'red': colors.red,
        'black': colors.black,
        'dark-bg': colors.darkBg,
        'dark-border': colors.darkBorder,
        'dark-text': colors.darkText,
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
