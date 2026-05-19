import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f00069',
        'primary-dark': '#c20054',
        'primary-light': '#ff338b',
        navy: '#0f0e17',
      },
    },
  },
  plugins: [],
}
export default config
