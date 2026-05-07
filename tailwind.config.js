/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        arabic: ['"Amiri"', 'serif'],
        body: ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
