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
        mandarin: '#FF6216',
        steel: '#00EAFF',
        cement: '#C4C4C4',
        'dark-gray': '#7D7676',
      },
      fontFamily: {
        gensen: 'GenSenRounded',
        english: 'MplusRounded',
        mono: 'DMMono',
        noto: 'NotoSansTC',
      },
      spacing: {
        'navbar-height': '84px',
        'mobile-modal-top': '300px',
        'mobile-modal-body': '330px',
        'desktop-modal-top': '447px',
        'desktop-modal-body': '495px',
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
