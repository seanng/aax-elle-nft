import React from 'react'
import ReactDOM from 'react-dom'
import html2canvas from 'html2canvas'
import CompsNFTMain from 'components/NFT/Main'
import type { Files, NFTParameters } from 'shared/types'

export const genImageFile = (element, filename, imageCB) => {
  html2canvas(element, {
    width: 350,
    height: 350,
    windowWidth: 350,
    windowHeight: 350,
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      if (imageCB && blob)
        imageCB(new File([blob], filename, { type: 'image/png' }))
    }, 'image/png')
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

  const blob = new Blob([withDoctype], { type: 'text/html' })
  const file = new File([blob], filename, { type: 'text/html' })
  if (fileCB) fileCB(file)
}

export const getAssets = (data: NFTParameters): Promise<Files> =>
  new Promise((resolve) => {
    const dummyElem = document.createElement('div')
    dummyElem.id = 'nft-generation-placeholder'
    dummyElem.style.height = '0'
    dummyElem.style.width = '0'
    dummyElem.style.overflow = 'hidden'
    document.body.append(dummyElem)
    ReactDOM.render(<CompsNFTMain data={data} assetsCB={resolve} />, dummyElem)
  })

export const genRandomId = () =>
  `_${Math.random().toString(36).substring(2, 15)}`
