/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#060606',
        bg2: '#0c0c0c',
        bg3: '#121212',
        accent: '#e8c547',
        accent2: '#ff6b35',
        accent3: '#4fc3f7',
        card: '#0f0f0f',
        border: '#1c1c1c',
        muted: '#585250',
        muted2: '#3a3836',
        'text-primary': '#f0ece4',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        arabic: ['var(--font-tajawal)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
