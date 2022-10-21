const defaultTheme = require('tailwindcss/defaultTheme')

const lime = '#55F263'
const shadowGray = '#626262'

module.exports = {
  content: ['./components/**/*.{tsx,jsx}', './pages/**/*.{tsx,jsx}'],
  theme: {
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
    extend: {
      boxShadow: {
        'pixel-active-sm': `1px 1px 0 ${lime}, 2px 2px 0 ${lime}, 3px 3px 0 ${lime}, 4px 4px 0 ${lime}, 5px 5px 0 ${lime}, 6px 6px 0 ${lime}`,
        'pixel-active-lg': `2px 2px 0 ${lime}, 4px 4px 0 ${lime}, 6px 6px 0 ${lime}, 8px 8px 0 ${lime}, 10px 10px 0 ${lime}, 12px 12px 0 ${lime}`,
        'pixel-disabled-sm': `1px 1px 0 ${shadowGray}, 2px 2px 0 ${shadowGray}, 3px 3px 0 ${shadowGray}, 4px 4px 0 ${shadowGray}, 5px 5px 0 ${shadowGray}, 6px 6px 0 ${shadowGray}`,
        'pixel-disabled-lg': `2px 2px 0 ${shadowGray}, 4px 4px 0 ${shadowGray}, 6px 6px 0 ${shadowGray}, 8px 8px 0 ${shadowGray}, 10px 10px 0 ${shadowGray}, 12px 12px 0 ${shadowGray}`,
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
      colors: {
        'black-rgba-20': 'rgba(0, 0, 0, 0.2)',
        'black-rgba-70': 'rgba(0, 0, 0, 0.7)',
        lime,
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
        'shadow-gray': shadowGray,
      },
      fontFamily: {
        gensen: 'GenSenRounded',
        english: 'MplusRounded',
        mono: 'DMMono',
        noto: 'NotoSans',
        cubic: 'Cubic11',
      },
      spacing: {
        'navbar-height': '84px',
        'mobile-modal-top': '300px',
        'mobile-modal-body': '330px',
        'desktop-modal-top': '447px',
        'desktop-modal-body': '495px',
      },
      lineHeight: {
        0: '0',
        '120%': '120%',
        '150%': '150%',
      },
      zIndex: {
        reel: 20,
        modal: 30,
        confetti: 40,
        'spin-button': 50,
        navigation: 100,
      },
    },
  },
  variants: {
    boxShadow: ['responsive'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
