import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFDF8',
        foreground: '#100A08',
        muted: '#100A08',
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
        script: ['var(--font-script)'],
      },
      fontSize: {
        base: ['14px', { lineHeight: '100%', letterSpacing: '0%' }],
      },
      spacing: {
        'page': '71px',
        'header': '46px',
        'grid-gap': '15px',
        'label-gap': '22px',
      },
      width: {
        'card': '433px',
        'card-lg': '866px',
        'initials': '1264px',
      },
      height: {
        'card': '541px',
        'card-lg': '1082px',
        'initials': '601px',
      },
      aspectRatio: {
        'card': '433 / 541',
        'card-lg': '866 / 1082',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
