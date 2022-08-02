const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./components/**/*.{tsx,jsx}', './pages/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height',
      },
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.7)',
        lime: '#55F263',
        cucumber: '#2FB500',
        lemon: '#C3FA08',
        banana: '#EDFA00',
        pomegranate: '#F8646F',
        tomato: '#FF003A',
      },
      fontFamily: {
        sans: ['GenSenRounded', ...defaultTheme.fontFamily.sans],
        english: 'MplusRounded',
        mono: 'DM Mono',
        noto: 'Noto Sans',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
