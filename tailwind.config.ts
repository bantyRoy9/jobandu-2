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
        primary:        '#137a42',
        'primary-dark': '#0d5c31',
        'primary-light':'#1a9e56',
        accent:         '#e8f5ee',
        navy:           '#030306',
        border:         '#DFDFE2',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        container: '1290px',
        narrow:    '750px',
      },
      minHeight: {
        'btn': '50px',
      },
    },
  },
  plugins: [],
}
export default config
