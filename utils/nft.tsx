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

const IMAGE_DEBUG = false
const HTML_DEBUG = false

const BG_COLORS = [
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
  return BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)]
}

const TGI_Colors = [
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
  return TGI_Colors[Math.floor(Math.random() * TGI_Colors.length)]
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

const KOL_GI1_TEMPLATES = [Icon01]
export const genRandomKolGI1Template = () => {
  return KOL_GI1_TEMPLATES[Math.floor(Math.random() * KOL_GI1_TEMPLATES.length)]
}

const KOL_GI2_TEMPLATES = [Icon01]
export const genRandomKolGI2Template = () => {
  return KOL_GI2_TEMPLATES[Math.floor(Math.random() * KOL_GI2_TEMPLATES.length)]
}

// gridIconTemplate | FC | required if gridStyle is hex or gradient | IconSet for beforeOpen & neverOpened
// backgroundStyle | hex, gradient, link
// gridStyle | hex, gradient, link | color/png for beforeOpen & neverOpened & afterOpen
// aroundTextColor | hex
// iconOutlineColor | hex
// iconFillColor | hex
// messageColor | hex
// signature | link | currently uses png link, modification to component will be need for svg comps
// opacity | '0.0' to '1.0' | optional
export const getNFTSettings = (texts, kolKey?: any) => {
  if (!kolKey) {
    const gridIconTemplate = genRandomNormalGITemplate()
    const bgColor = genRandomAColor()
    const tgColor = genRandomBColor()
    const iOColor = genRandomBColor()
    const iIColor = genRandomAColor()

    return {
      ...texts,
      messageColor: '#000000',
      gridIconTemplate,
      backgroundStyle: bgColor,
      gridStyle: tgColor,
      aroundTextColor: tgColor,
      iconOutlineColor: iOColor,
      iconFillColor: iIColor,
    } as NFTParameters
  }

  // Mapping KOL keys
  switch (kolKey) {
    default: {
      const i1Template = genRandomKolGI1Template()
      return {
        ...texts,
        // backgroundStyle: 'https://i.imgur.com/4q7eRSU.png',
        // gridStyle: 'https://i.imgur.com/3meuTyr.png', // the exported png have extra space on the right
        messageColor: '#000000',
        gridIconTemplate: i1Template,
        backgroundStyle:
          'radial-gradient(60.05% 60.05% at 50.55% 55.01%, #FFFF00 3%, #FFFF00 24%, #33FF99 100%)',
        gridStyle: '#1919FF',
        aroundTextColor: '#1919FF',
        signature: 'https://i.imgur.com/Zp4A6e4.png',
      }
    }
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
  message,
  aroundText,
  kolKey,
  Comps = CompsNFTMain,
}: NFTParametersBasic): Promise<any> =>
  new Promise((resolve) => {
    const dummyElem = document.createElement('div')
    dummyElem.id = 'nft-generation-placeholder'
    dummyElem.style.height = '0'
    dummyElem.style.width = '0'
    dummyElem.style.overflow = 'hidden'
    document.body.append(dummyElem)

    const data = getNFTSettings({ message, aroundText }, kolKey)
    ReactDOM.render(<Comps data={data} assetsCB={resolve} />, dummyElem)
  })

export const genRandomId = () =>
  `_${Math.random().toString(36).substring(2, 15)}`

export const urlRegex = new RegExp(
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
)
