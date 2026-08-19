/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#000000',
        card: '#0A0A0A',
        cardHover: '#111111',
        border: '#1F1F1F',
        primary: '#FFFFFF',
        primaryHover: '#EBEBEB',
        muted: '#8A8F98',
        subtle: '#27272A',
        accent: '#3B82F6',

        /* QEVRIX New Global Design Tokens */
        qx: {
          primary: 'var(--qx-primary)',
          primaryHover: 'var(--qx-primary-hover)',
          secondary: 'var(--qx-secondary)',
          background: 'var(--qx-background)',
          backgroundAlt: 'var(--qx-background-alt)',
          surface: 'var(--qx-surface)',
          surfaceHover: 'var(--qx-surface-hover)',
          border: 'var(--qx-border)',
          borderHover: 'var(--qx-border-hover)',
          text: 'var(--qx-text)',
          textMuted: 'var(--qx-text-muted)',
          textSecondary: 'var(--qx-text-secondary)',
          textInverse: 'var(--qx-text-inverse)',
          success: 'var(--qx-success)',
          warning: 'var(--qx-warning)',
          error: 'var(--qx-error)',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
