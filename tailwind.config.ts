import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/sections/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', xl: '2.5rem' },
      screens: { '2xl': '1380px' }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-primary)', 'system-ui', 'sans-serif'],
        display: ['var(--font-primary)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-alexandria)', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#fff1f1',
          100: '#ffe0e0',
          200: '#ffc5c5',
          300: '#ff9a9a',
          400: '#ff6060',
          500: '#dc2626',
          600: '#c41f1f',
          700: '#a41a1a',
          800: '#881818',
          900: '#6f1818',
          950: '#3c0909'
        }
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px -4px rgba(0,0,0,0.1)',
        card: '0 2px 8px rgba(0,0,0,0.06), 0 20px 40px -20px rgba(0,0,0,0.15)',
        brand: '0 8px 30px -8px rgba(220,38,38,0.45)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'marquee': 'marquee 40s linear infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')]
};

export default config;
