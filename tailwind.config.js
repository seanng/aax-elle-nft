const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./components/**/*.{tsx,jsx}', './pages/**/*.{tsx,jsx}'],
  theme: {
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
    extend: {
      transitionProperty: {
        'max-height': 'max-height',
      },
      colors: {
        'black-rgba-20': 'rgba(0, 0, 0, 0.2)',
        'black-rgba-70': 'rgba(0, 0, 0, 0.7)',
        lime: '#55F263',
        cucumber: '#2FB500',
        lemon: '#C3FA08',
        banana: '#EDFA00',
        pomegranate: '#F8646F',
        tomato: '#FF003A',
        guava: '#FF66FF',
        orange: '#ff7a00',
        cement: '#C4C4C4',
      },
      fontFamily: {
        sans: ['GenSenRounded', ...defaultTheme.fontFamily.sans],
        english: 'MplusRounded',
        mono: 'DMMono',
        noto: 'NotoSansTC',
      },
      spacing: {
        'navbar-height': '84px',
      },
      lineHeight: {
        '120%': '120%',
        '150%': '150%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
