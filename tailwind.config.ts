import type { Config } from 'tailwindcss'
import { tokens } from './src/config/tokens'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:  tokens.colors.primary,
        base:     tokens.colors.base,
        accent:   tokens.colors.accent,
        support:  tokens.colors.support,

        'primary-dim':    tokens.colors.primaryDim,
        'accent-strong':  tokens.colors.accentStrong,
      },

      fontFamily: {
        display: tokens.fonts.display,
        body:    tokens.fonts.body,
      },

      fontSize: tokens.fontSize,

      spacing: tokens.spacing,

      borderRadius: tokens.radius,

      boxShadow: tokens.shadow,

      backdropBlur: tokens.blur,

      transitionDuration: tokens.motion,

      transitionTimingFunction: tokens.easing,

      zIndex: tokens.zIndex,

      maxWidth: {
        container: tokens.container['2xl'],
      },

      screens: {
        sm:    '640px',
        md:    '768px',
        lg:    '1024px',
        xl:    '1280px',
        '2xl': '1440px',
      },

      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'mask-reveal': {
          '0%':   { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      animation: {
        'fade-up':      'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':      'fade-in 0.4s ease forwards',
        'mask-reveal':  'mask-reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in':     'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
