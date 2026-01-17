import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-linear': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      colors: {
        btc: '#f2a900',
      },
    },
  },
  plugins: [],
}
export default config
