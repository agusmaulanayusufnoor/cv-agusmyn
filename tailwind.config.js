/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        palette: {
          dark: '#202734',
          slate: '#36415A',
          sage: '#B7D894',
          pale: '#E0F8C7',
        }
      }
    },
  },
  plugins: [],
}
