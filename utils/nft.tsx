import React from 'react'
import ReactDOM from 'react-dom'
import html2canvas from 'html2canvas'
import CompsNFTMain from 'components/NFT/Main'
import type { Files, NFTParameters } from 'shared/types'

export const genImageFile = (element, filename, cb) => {
  html2canvas(element).then((canvas) => {
    canvas.toBlob((blob) => {
      if (cb && blob) cb(new File([blob], filename, { type: 'image/png' }))
    }, 'image/png')
  })
}

export const genHTMLFile = (htmlStr, filename, cb) => {
  const withDoctype = `
    <!DOCTYPE html>
    <html lang="en" style="width: 350px; height: 350px;">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NFT Animation URL</title>
    </head>
    <body style="width: 350px; height: 350px; margin: 0;">
      ${htmlStr}
    </body>
    </html>
  `

  const blob = new Blob([withDoctype], { type: 'text/html' })
  const file = new File([blob], filename, { type: 'text/html' })
  if (cb) cb(file)
}

export const getAssets = (data: NFTParameters): Promise<Files> =>
  new Promise((resolve) => {
    const dummyElem = document.createElement('div')
    dummyElem.id = 'nft-generation-placeholder'
    dummyElem.style.height = '0'
    dummyElem.style.width = '0'
    dummyElem.style.visibility = 'hidden'
    dummyElem.style.overflow = 'hidden'
    document.body.append(dummyElem)
    ReactDOM.render(<CompsNFTMain data={data} assetsCB={resolve} />, dummyElem)
  })

export const genRandomId = () =>
  `_${Math.random().toString(36).substring(2, 15)}`
