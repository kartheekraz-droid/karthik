/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: { DEFAULT: '#ff9933', deep: '#c56a00', tint: '#fff1de' },
        green: { DEFAULT: '#138808', deep: '#0b5c05', tint: '#e7f6e5' },
        navy: { DEFAULT: '#000080', 2: '#00005c', tint: '#ecefff' },
        ink: '#111118',
        muted: '#3d3d4a',
        line: '#d6d0c4',
        paper: '#faf8f3',
        red: '#9b1c1c',
      },
      fontFamily: {
        sans: ['Figtree', 'Noto Sans', 'sans-serif'],
        serif: ['Noto Serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 12px 40px rgba(0, 0, 80, 0.08)',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
}
