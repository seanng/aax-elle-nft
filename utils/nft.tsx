import React from 'react'
import ReactDOM from 'react-dom'
import html2canvas from 'html2canvas'

import type { Files, NFTParameters, NFTParametersBasic } from 'shared/types'
import CompsNFTMain from 'components/NFT/Main'
import Icon01 from 'components/NFT/shared/background-icons/01'
import Icon02 from 'components/NFT/shared/background-icons/02'
import Icon03 from 'components/NFT/shared/background-icons/03'
import Icon04 from 'components/NFT/shared/background-icons/04'
import Icon05 from 'components/NFT/shared/background-icons/05'
import Icon06 from 'components/NFT/shared/background-icons/06'
import Icon07 from 'components/NFT/shared/background-icons/07'
import Icon08 from 'components/NFT/shared/background-icons/08'
import Icon09 from 'components/NFT/shared/background-icons/09'
import Icon10 from 'components/NFT/shared/background-icons/10'
import Icon11 from 'components/NFT/shared/background-icons/11'
import Icon12 from 'components/NFT/shared/background-icons/12'
import Icon13 from 'components/NFT/shared/background-icons/13'
import Icon14 from 'components/NFT/shared/background-icons/14'
import Icon15 from 'components/NFT/shared/background-icons/15'
import Icon16 from 'components/NFT/shared/background-icons/16'
import Icon17 from 'components/NFT/shared/background-icons/17'
import Icon18 from 'components/NFT/shared/background-icons/18'
import Icon19 from 'components/NFT/shared/background-icons/19'
import Icon20 from 'components/NFT/shared/background-icons/20'
import Icon21 from 'components/NFT/shared/background-icons/21'
import Icon22 from 'components/NFT/shared/background-icons/22'
import Icon23 from 'components/NFT/shared/background-icons/23'
import Icon24 from 'components/NFT/shared/background-icons/24'
import Icon25 from 'components/NFT/shared/background-icons/25'

import KolIcon01 from 'components/NFT/shared/kol-icons/01'
import KolIcon02 from 'components/NFT/shared/kol-icons/02'
import KolIcon03 from 'components/NFT/shared/kol-icons/03'
import KolIcon04 from 'components/NFT/shared/kol-icons/04'
import KolIcon05 from 'components/NFT/shared/kol-icons/05'
import KolIcon06 from 'components/NFT/shared/kol-icons/06'
import KolIcon07 from 'components/NFT/shared/kol-icons/07'
import KolIcon08 from 'components/NFT/shared/kol-icons/08'
import KolIcon09 from 'components/NFT/shared/kol-icons/09'
import KolIcon10 from 'components/NFT/shared/kol-icons/10'
import KolIcon11 from 'components/NFT/shared/kol-icons/11'
import KolIcon12 from 'components/NFT/shared/kol-icons/12'
import KolIcon13 from 'components/NFT/shared/kol-icons/13'
import KolIcon14 from 'components/NFT/shared/kol-icons/14'
import KolIcon15 from 'components/NFT/shared/kol-icons/15'
import KolIcon16 from 'components/NFT/shared/kol-icons/16'
import KolIcon17 from 'components/NFT/shared/kol-icons/17'
import KolIcon18 from 'components/NFT/shared/kol-icons/18'
import KolIcon19 from 'components/NFT/shared/kol-icons/19'
import KolIcon20 from 'components/NFT/shared/kol-icons/20'
import KolIcon21 from 'components/NFT/shared/kol-icons/21'
import KolIcon22 from 'components/NFT/shared/kol-icons/22'
import KolIcon23 from 'components/NFT/shared/kol-icons/23'
import KolIcon24 from 'components/NFT/shared/kol-icons/24'
import KolIcon25 from 'components/NFT/shared/kol-icons/25'
import KolIcon26 from 'components/NFT/shared/kol-icons/26'
import KolIcon27 from 'components/NFT/shared/kol-icons/27'
import KolIcon28 from 'components/NFT/shared/kol-icons/28'
import KolIcon29 from 'components/NFT/shared/kol-icons/29'
import KolIcon30 from 'components/NFT/shared/kol-icons/30'
import KolIcon31 from 'components/NFT/shared/kol-icons/31'
import KolIcon32 from 'components/NFT/shared/kol-icons/32'
import KolIcon33 from 'components/NFT/shared/kol-icons/33'
import KolIcon34 from 'components/NFT/shared/kol-icons/34'
import KolIcon35 from 'components/NFT/shared/kol-icons/35'
import KolIcon36 from 'components/NFT/shared/kol-icons/36'
import KolIcon37 from 'components/NFT/shared/kol-icons/37'
import KolIcon38 from 'components/NFT/shared/kol-icons/38'
import KolIcon39 from 'components/NFT/shared/kol-icons/39'
import KolIcon40 from 'components/NFT/shared/kol-icons/40'
import KolIcon41 from 'components/NFT/shared/kol-icons/41'
import KolIcon42 from 'components/NFT/shared/kol-icons/42'
import KolIcon43 from 'components/NFT/shared/kol-icons/43'
import KolIcon44 from 'components/NFT/shared/kol-icons/44'
import KolIcon45 from 'components/NFT/shared/kol-icons/45'
import KolIcon46 from 'components/NFT/shared/kol-icons/46'
import KolIcon47 from 'components/NFT/shared/kol-icons/47'
import KolIcon48 from 'components/NFT/shared/kol-icons/48'
import KolIcon49 from 'components/NFT/shared/kol-icons/49'
import KolIcon50 from 'components/NFT/shared/kol-icons/50'
import KolIcon51 from 'components/NFT/shared/kol-icons/51'
import KolIcon52 from 'components/NFT/shared/kol-icons/52'
import KolIcon53 from 'components/NFT/shared/kol-icons/53'
import KolIcon54 from 'components/NFT/shared/kol-icons/54'
import KolIcon55 from 'components/NFT/shared/kol-icons/55'
import KolIcon56 from 'components/NFT/shared/kol-icons/56'
import KolIcon57 from 'components/NFT/shared/kol-icons/57'
import KolIcon58 from 'components/NFT/shared/kol-icons/58'
import KolIcon59 from 'components/NFT/shared/kol-icons/59'
import KolIcon60 from 'components/NFT/shared/kol-icons/60'
import KolIcon61 from 'components/NFT/shared/kol-icons/61'
import KolIcon62 from 'components/NFT/shared/kol-icons/62'
import KolIcon63 from 'components/NFT/shared/kol-icons/63'
import KolIcon64 from 'components/NFT/shared/kol-icons/64'
import KolIcon65 from 'components/NFT/shared/kol-icons/65'
import KolIcon66 from 'components/NFT/shared/kol-icons/66'
import KolIcon67 from 'components/NFT/shared/kol-icons/67'
import KolIcon68 from 'components/NFT/shared/kol-icons/68'
import KolIcon69 from 'components/NFT/shared/kol-icons/69'
import KolIcon70 from 'components/NFT/shared/kol-icons/70'
import KolIcon71 from 'components/NFT/shared/kol-icons/71'
import KolIcon72 from 'components/NFT/shared/kol-icons/72'
import KolIcon73 from 'components/NFT/shared/kol-icons/73'
import KolIcon74 from 'components/NFT/shared/kol-icons/74'
import KolIcon75 from 'components/NFT/shared/kol-icons/75'
import KolIcon76 from 'components/NFT/shared/kol-icons/76'
import KolIcon77 from 'components/NFT/shared/kol-icons/77'
import KolIcon78 from 'components/NFT/shared/kol-icons/78'
import KolIcon79 from 'components/NFT/shared/kol-icons/79'
import KolIcon80 from 'components/NFT/shared/kol-icons/80'
import KolIcon81 from 'components/NFT/shared/kol-icons/81'
import KolIcon82 from 'components/NFT/shared/kol-icons/82'
import KolIcon83 from 'components/NFT/shared/kol-icons/83'
import KolIcon84 from 'components/NFT/shared/kol-icons/84'
import KolIcon85 from 'components/NFT/shared/kol-icons/85'
import KolIcon86 from 'components/NFT/shared/kol-icons/86'
import KolIcon87 from 'components/NFT/shared/kol-icons/87'
import KolIcon88 from 'components/NFT/shared/kol-icons/88'
import KolIcon89 from 'components/NFT/shared/kol-icons/89'
import KolIcon90 from 'components/NFT/shared/kol-icons/90'
import KolIcon91 from 'components/NFT/shared/kol-icons/91'
import KolIcon92 from 'components/NFT/shared/kol-icons/92'
import KolIcon93 from 'components/NFT/shared/kol-icons/93'
import KolIcon94 from 'components/NFT/shared/kol-icons/94'
import KolIcon95 from 'components/NFT/shared/kol-icons/95'
import KolIcon96 from 'components/NFT/shared/kol-icons/96'
import KolIcon97 from 'components/NFT/shared/kol-icons/97'
import KolIcon98 from 'components/NFT/shared/kol-icons/98'
import KolIcon99 from 'components/NFT/shared/kol-icons/99'
import KolIcon100 from 'components/NFT/shared/kol-icons/100'
import KolIcon101 from 'components/NFT/shared/kol-icons/101'
import KolIcon102 from 'components/NFT/shared/kol-icons/102'
import KolIcon103 from 'components/NFT/shared/kol-icons/103'
import KolIcon104 from 'components/NFT/shared/kol-icons/104'
import KolIcon105 from 'components/NFT/shared/kol-icons/105'
import KolIcon106 from 'components/NFT/shared/kol-icons/106'
import KolIcon107 from 'components/NFT/shared/kol-icons/107'
import KolIcon108 from 'components/NFT/shared/kol-icons/108'
import KolIcon109 from 'components/NFT/shared/kol-icons/109'
import KolIcon110 from 'components/NFT/shared/kol-icons/110'
import KolIcon111 from 'components/NFT/shared/kol-icons/111'
import KolIcon112 from 'components/NFT/shared/kol-icons/112'
import KolIcon113 from 'components/NFT/shared/kol-icons/113'

const IMAGE_DEBUG = false
const HTML_DEBUG = false

const PALETTE_A = [
  '#449649',
  '#81E87B',
  '#C6BB9F',
  '#D7F850',
  '#E93329',
  '#EB6C33',
  '#EC72F7',
  '#F2AEC2',
  '#FFFD89',
  '#FFFFFF',
]
export const genRandomAColor = () => {
  return PALETTE_A[Math.floor(Math.random() * PALETTE_A.length)]
}

const PALETTE_B = [
  '#24573D',
  '#4282D8',
  '#5DC9F9',
  '#78BBD5',
  '#7F1719',
  '#8B26F4',
  '#8F78F0',
  '#DBDBDB',
  '#F09D9B',
  '#F9DE6B',
]
export const genRandomBColor = () => {
  return PALETTE_B[Math.floor(Math.random() * PALETTE_B.length)]
}

const COMBINATION_EXCLUSIONS = {
  '#449649': ['#4282D8', '#8F78F0'],
  '#81E87B': ['#DBDBDB'],
  '#C6BB9F': ['#5DC9F9', '#78BBD5', '#F09D9B'],
  '#D7F850': ['#DBDBDB', '#F9DE6B'],
  '#EC72F7': ['#F09D9B'],
}
const KOL_EXCLUSIONS = ['#FFFD89', '#FFFFFF']

export const genColorPair = (isKol) => {
  const colorA = genRandomAColor()
  const colorB = genRandomBColor()

  const isExcluded = COMBINATION_EXCLUSIONS[colorA]?.includes(colorB)
  const isKolExcluded = isKol && KOL_EXCLUSIONS.includes(colorA)

  if (isExcluded || isKolExcluded) {
    return genColorPair(isKol)
  }

  return [colorA, colorB]
}

const NORMAL_GI_TEMPLATES = [
  Icon01,
  Icon02,
  Icon03,
  Icon04,
  Icon05,
  Icon06,
  Icon07,
  Icon08,
  Icon09,
  Icon10,
  Icon11,
  Icon12,
  Icon13,
  Icon14,
  Icon15,
  Icon16,
  Icon17,
  Icon18,
  Icon19,
  Icon20,
  Icon21,
  Icon22,
  Icon23,
  Icon24,
  Icon25,
]
export const genRandomNormalGITemplate = () => {
  return NORMAL_GI_TEMPLATES[
    Math.floor(Math.random() * NORMAL_GI_TEMPLATES.length)
  ]
}

const KOL_GI_TEMPLATES = [
  KolIcon01,
  KolIcon02,
  KolIcon03,
  KolIcon04,
  KolIcon05,
  KolIcon06,
  KolIcon07,
  KolIcon08,
  KolIcon09,
  KolIcon10,
  KolIcon11,
  KolIcon12,
  KolIcon13,
  KolIcon14,
  KolIcon15,
  KolIcon16,
  KolIcon17,
  KolIcon18,
  KolIcon19,
  KolIcon20,
  KolIcon21,
  KolIcon22,
  KolIcon23,
  KolIcon24,
  KolIcon25,
  KolIcon26,
  KolIcon27,
  KolIcon28,
  KolIcon29,
  KolIcon30,
  KolIcon31,
  KolIcon32,
  KolIcon33,
  KolIcon34,
  KolIcon35,
  KolIcon36,
  KolIcon37,
  KolIcon38,
  KolIcon39,
  KolIcon40,
  KolIcon41,
  KolIcon42,
  KolIcon43,
  KolIcon44,
  KolIcon45,
  KolIcon46,
  KolIcon47,
  KolIcon48,
  KolIcon49,
  KolIcon50,
  KolIcon51,
  KolIcon52,
  KolIcon53,
  KolIcon54,
  KolIcon55,
  KolIcon56,
  KolIcon57,
  KolIcon58,
  KolIcon59,
  KolIcon60,
  KolIcon61,
  KolIcon62,
  KolIcon63,
  KolIcon64,
  KolIcon65,
  KolIcon66,
  KolIcon67,
  KolIcon68,
  KolIcon69,
  KolIcon70,
  KolIcon71,
  KolIcon72,
  KolIcon73,
  KolIcon74,
  KolIcon75,
  KolIcon76,
  KolIcon77,
  KolIcon78,
  KolIcon79,
  KolIcon80,
  KolIcon81,
  KolIcon82,
  KolIcon83,
  KolIcon84,
  KolIcon85,
  KolIcon86,
  KolIcon87,
  KolIcon88,
  KolIcon89,
  KolIcon90,
  KolIcon91,
  KolIcon92,
  KolIcon93,
  KolIcon94,
  KolIcon95,
  KolIcon96,
  KolIcon97,
  KolIcon98,
  KolIcon99,
  KolIcon100,
  KolIcon101,
  KolIcon102,
  KolIcon103,
  KolIcon104,
  KolIcon105,
  KolIcon106,
  KolIcon107,
  KolIcon108,
  KolIcon109,
  KolIcon110,
  KolIcon111,
  KolIcon112,
  KolIcon113,
]
export const genRandomKolGITemplate = () => {
  return KOL_GI_TEMPLATES[Math.floor(Math.random() * KOL_GI_TEMPLATES.length)]
}

// ? Settings
// gridIconTemplate | FC | required if gridStyle is hex or gradient | IconSet for beforeOpen & neverOpened
// backgroundStyle | hex, gradient, link
// gridStyle | hex, gradient, link | color/png for beforeOpen & neverOpened & afterOpen
// aroundTextColor | hex
// iconOutlineColor | hex
// iconFillColor | hex
// messageColor | hex
// signature? | link | currently uses png link, modification to component will be need for svg comps | optional
// opacity? | '0.0' to '1.0' | optional
export const getNFTSettings = (settings) => {
  const { isKol, ...otherSettings } = settings
  const [bgColor, tgColor] = genColorPair(isKol)
  const [iIColor, iOColor] = genColorPair(isKol)

  // ? Other Configurable Settings
  // backgroundStyle: 'https://i.imgur.com/4q7eRSU.png',
  // backgroundStyle: 'radial-gradient(60.05% 60.05% at 50.55% 55.01%, #FFFF00 3%, #FFFF00 24%, #33FF99 100%)',
  // gridStyle: 'https://i.imgur.com/3meuTyr.png', // the exported png have extra space on the right
  // gridStyle: '#1919FF',
  // signature: 'https://i.imgur.com/Zp4A6e4.png',
  return {
    messageColor: '#000000',
    backgroundStyle: bgColor,
    gridStyle: tgColor,
    aroundTextColor: tgColor,
    iconOutlineColor: iOColor,
    iconFillColor: iIColor,
    gridIconTemplate: genRandomNormalGITemplate(),
    ...otherSettings,
  }
}

export const genImageFile = (
  element,
  filename,
  imageCB = (f) => {},
  opts = {}
) => {
  return new Promise((resolve) => {
    html2canvas(element, {
      useCORS: true,
      scale: 1.5,
      width: 350,
      height: 350,
      windowWidth: 350,
      windowHeight: 350,
      backgroundColor: 'transparent',
      ...opts,
    }).then((canvas) => {
      if (IMAGE_DEBUG) console.log(canvas.toDataURL('image/png'))
      canvas.toBlob((blob) => {
        if (imageCB && blob) {
          const file = new File([blob], filename, { type: 'image/png' })
          imageCB(file)
          resolve(file)
        }
      }, 'image/png')
    })
  })
}

export const genHTMLFile = (htmlStr, filename, fileCB) => {
  const withDoctype = `
    <!DOCTYPE html>
    <html lang="en" style="width: 350px; height: 350px;">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@1,500&family=Noto+Sans+TC&display=swap" rel="stylesheet">
      <style>
      @font-face {
        font-family: 'Cubic11';
        src: url('https://elle-nft-prod.s3.ap-southeast-1.amazonaws.com/assets/Cubic_11_1.013_R.woff2 ') format('woff2');
        font-weight: 400;
      }
      </style>
    </head>
    <body style="width: 350px; height: 350px; margin: 0;">
      ${htmlStr}
    </body>
    </html>
  `

  if (HTML_DEBUG) console.log(withDoctype)
  const blob = new Blob([withDoctype], { type: 'text/html' })
  const file = new File([blob], filename, { type: 'text/html' })
  if (fileCB) fileCB(file)
}

export const getAssets = ({
  Comps = CompsNFTMain,
  ...settings
}: NFTParametersBasic): Promise<any> =>
  new Promise((resolve) => {
    const dummyElem = document.createElement('div')
    dummyElem.id = 'nft-generation-placeholder'
    dummyElem.style.height = '0'
    dummyElem.style.width = '0'
    dummyElem.style.overflow = 'hidden'
    document.body.append(dummyElem)

    const data = getNFTSettings(settings)
    ReactDOM.render(<Comps data={data} assetsCB={resolve} />, dummyElem)
  })

export const genRandomId = () =>
  `_${Math.random().toString(36).substring(2, 15)}`

export const urlRegex = new RegExp(
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
)

// ! This is a temporary solution, will need to change argument
export const genKolAssets = async (amount = 5) => {
  const assets: any[] = []
  const availableIcons = [...KOL_GI_TEMPLATES]

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * availableIcons.length)
    const kol = await getAssets({
      isKol: true,
      signature: 'https://i.imgur.com/Qpji4ZS.png',
      gridIconTemplate: availableIcons.splice(randomIndex, 1)[0],
      message: 'message',
      aroundText: 'aroundText',
    })
    // ! Add await upload function here
    assets.push(kol)
  }

  return assets
}
