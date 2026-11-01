/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: "#0B0B0C",
          surface: "#151517",
          card: "#1D1D20",
          elevated: "#242428",
          border: "#28282D",
          borderLight: "#383840",
          gold: "#C5A46D",
          goldHover: "#D5B982",
          goldLight: "#E8D8B8",
          goldMuted: "rgba(197, 164, 109, 0.15)",
          textPrimary: "#F5F3EF",
          textSecondary: "#A7A5A0",
          textMuted: "#6E6D68",
          lightBg: "#F7F5F0",
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'luxury-gold': '0 10px 30px -10px rgba(197, 164, 109, 0.25)',
        'luxury-glow': '0 0 25px rgba(197, 164, 109, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
