const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./components/**/*.{tsx,jsx}', './pages/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height',
      },
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.6)',
        lime: '#55F263',
        lemon: '#C3FA08',
      },
      fontFamily: {
        sans: ['GenSenRounded', ...defaultTheme.fontFamily.sans],
        english: 'MplusRounded',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
