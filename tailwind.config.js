const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./components/**/*.{tsx,jsx}', './pages/**/*.{tsx,jsx}'],
  theme: {
    extend: {
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
