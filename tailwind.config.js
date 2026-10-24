/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#2B1D17',
        'espresso-light': '#3A2820',
        cream: '#F7F0E6',
        sand: '#EFE3D3',
        terracotta: '#C65D2E',
        'terracotta-dark': '#A94A21',
        ink: '#2B1D17',
        muted: '#6E5D53', // WCAG AA compliant (>= 4.5:1) on both cream (#F7F0E6) and sand (#EFE3D3)
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['Allura', 'cursive'],
      },
      borderRadius: {
        'card-sm': '16px',
        'card': '20px',
        'card-lg': '24px',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(43, 29, 23, 0.08)',
        'warm': '0 8px 24px -4px rgba(43, 29, 23, 0.12)',
        'warm-lg': '0 16px 36px -6px rgba(43, 29, 23, 0.20)',
        'warm-glow': '0 0 25px rgba(198, 93, 46, 0.25)',
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.28em',
      },
    },
  },
  plugins: [],
}
