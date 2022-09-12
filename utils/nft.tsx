import React from 'react'
import ReactDOM from 'react-dom'
import html2canvas from 'html2canvas'

import type { Files, NFTParameters, NFTParametersBasic } from 'shared/types'
import CompsNFTMain from 'components/NFT/Main'
import IconsV1 from 'components/NFT/shared/icons-template/v1'
import IconsV2 from 'components/NFT/shared/icons-template/v2'

const IMAGE_DEBUG = true
const HTML_DEBUG = false

const BG_COLORS = [
  '#FF0111',
  '#FF6216',
  '#FFABC3',
  '#FF66FF',
  '#FFFF76',
  '#D0FB00',
  '#54ED6B',
  '#029A3E',
  '#C9BC9D',
  '#FFFFFF',
]
export const genRandomBGColor = () => {
  return BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)]
}

const TGI_Colors = [
  '#00CCFF',
  '#9900FF',
  '#DCDCDC',
  '#8B0111',
  '#00593B',
  '#2084E0',
  '#FFDF52',
  '#60BED9',
  '#8F78F0',
  '#FF9999',
]
export const genRandomTGIColor = () => {
  return TGI_Colors[Math.floor(Math.random() * TGI_Colors.length)]
}

const NORMAL_GI1_TEMPLATES = [IconsV1]
export const genRandomNormalGI1Template = () => {
  return NORMAL_GI1_TEMPLATES[
    Math.floor(Math.random() * NORMAL_GI1_TEMPLATES.length)
  ]
}

const NORMAL_GI2_TEMPLATES = [IconsV2]
export const genRandomNormalGI2Template = () => {
  return NORMAL_GI2_TEMPLATES[
    Math.floor(Math.random() * NORMAL_GI2_TEMPLATES.length)
  ]
}

const KOL_GI1_TEMPLATES = [IconsV1]
export const genRandomKolGI1Template = () => {
  return KOL_GI1_TEMPLATES[Math.floor(Math.random() * KOL_GI1_TEMPLATES.length)]
}

const KOL_GI2_TEMPLATES = [IconsV1]
export const genRandomKolGI2Template = () => {
  return KOL_GI2_TEMPLATES[Math.floor(Math.random() * KOL_GI2_TEMPLATES.length)]
}

// backgroundStyle | hex, gradient, link
// gridIconStyle1 | hex, gradient, link | color/png for beforeOpen & neverOpened
// gridIconStyle2 | hex, gradient, link | color/png for afterOpen
// gridIconTemplate1 | FC | required if gridIconStyle1 is hex or gradient | IconSet for beforeOpen & neverOpened
// gridIconTemplate2 | FC | required if gridIconStyle2 is hex or gradient | IconSet for afterOpen
// aroundTextColor | hex
// messageColor | hex
// opacity | '0.0' to '1.0' | optional
// signature | link | currently uses png link, modification to component will be need for svg comps
export const getNFTSettings = (texts, kolKey?: any): NFTParameters => {
  if (!kolKey) {
    const bgColor = genRandomBGColor()
    const tgiColor = genRandomTGIColor()
    const i1Template = genRandomNormalGI1Template()
    const i2Template = genRandomNormalGI2Template()
    return {
      ...texts,
      backgroundStyle: bgColor,
      gridIconStyle1: tgiColor,
      gridIconStyle2: tgiColor,
      gridIconTemplate1: i1Template,
      gridIconTemplate2: i2Template,
      aroundTextColor: tgiColor,
      messageColor: '#000000',
    }
  }

  // Mapping KOL keys
  switch (kolKey) {
    default: {
      const i1Template = genRandomKolGI1Template()
      const i2Template = genRandomKolGI2Template()
      return {
        ...texts,
        // backgroundStyle: 'https://i.imgur.com/4q7eRSU.png',
        // gridIconStyle1: 'https://i.imgur.com/3meuTyr.png', // the exported png have extra space on the right
        // gridIconStyle2: 'https://i.imgur.com/3meuTyr.png', // the exported png have extra space on the right
        backgroundStyle:
          'radial-gradient(60.05% 60.05% at 50.55% 55.01%, #FFFF00 3%, #FFFF00 24%, #33FF99 100%)',
        gridIconStyle1: '#1919FF',
        gridIconStyle2: '#1919FF',
        gridIconTemplate1: i1Template,
        gridIconTemplate2: i2Template,
        aroundTextColor: '#1919FF',
        messageColor: '#000000',
        signature: 'https://i.imgur.com/Zp4A6e4.png',
      }
    }
  }
}

export const genImageFile = (element, filename, imageCB) => {
  return new Promise((resolve) => {
    html2canvas(element, {
      useCORS: true,
      scale: 1.5,
      width: 350,
      height: 350,
      windowWidth: 350,
      windowHeight: 350,
      backgroundColor: 'transparent',
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
}: NFTParametersBasic): Promise<Files> =>
  new Promise((resolve) => {
    const dummyElem = document.createElement('div')
    dummyElem.id = 'nft-generation-placeholder'
    dummyElem.style.height = '0'
    dummyElem.style.width = '0'
    dummyElem.style.overflow = 'hidden'
    document.body.append(dummyElem)

    const data = getNFTSettings({ message, aroundText }, kolKey)
    ReactDOM.render(<CompsNFTMain data={data} assetsCB={resolve} />, dummyElem)
  })

export const genRandomId = () =>
  `_${Math.random().toString(36).substring(2, 15)}`

export const urlRegex = new RegExp(
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
)
