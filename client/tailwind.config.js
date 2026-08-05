/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F7F7F5',
        foreground: '#111111',
        night: '#111111',
        surface: '#FFFFFF',
        earth: '#F0F0EC',
        steel: {
          DEFAULT: '#4F6B85',
          soft: 'rgba(79, 107, 133, 0.12)',
          muted: 'rgba(79, 107, 133, 0.25)',
        },
        brown: {
          DEFAULT: '#2C1E16',
          soft: 'rgba(44, 30, 22, 0.08)',
        },
        'ink-soft': '#555555',
        'ink-muted': '#777777',
        border: 'rgba(17, 17, 17, 0.08)',
        'border-dark': 'rgba(255, 255, 255, 0.1)',
        primary: {
          DEFAULT: '#111111',
          foreground: '#F7F7F5',
        }
      },
      fontFamily: {
        sans: ['Inter', '"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Inter', '"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
        'premium': '0 20px 40px -10px rgba(0, 0, 0, 0.07)',
        'glow': '0 0 50px -10px rgba(79, 107, 133, 0.2)',
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        pulseSlow: 'pulse 4s ease-in-out infinite',
        floatSlow: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
