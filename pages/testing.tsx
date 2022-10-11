import type { NextPage } from 'next'
import {
  genKolAssets,
  getAssets,
  getNFTSettings,
  genRandomKolGITemplate,
} from 'utils/nft'
import CompsNFTMain from 'components/NFT/Main'
import { NFTParameters } from 'shared/types'
import { useEffect } from 'react'

const TestPage: NextPage = () => {
  // ? Enable below to test getAssets function
  // useEffect(() => {
  //   const test = async () => {
  //     await getAssets({
  //       aroundText:
  //         'AAAAAAAAAA BBBBBBBBBB CCCCCCCCC DDDDDDDDD gpqy EEEEEEEEEE FFFFFFFFFF GGGGGGGGGG HHHHHHHHHH',
  //       message:
  //         '在旅途中，\n小王子思考愛的真諦明白馴養的意義。\n小王子思考愛的真諦明白馴養的意義。\nI love you.\n我愛你。',
  //     })
  //   }

  //   test()
  // }, [])

  const downloadFile = (file) => {
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const genKOL = () => {
    genKolAssets(1).then((assets) => {
      console.log(assets)

      assets.forEach((asset) => {
        Object.values(asset).forEach((file) => {
          downloadFile(file)
        })
      })
    })
  }

  return <button onClick={genKOL}>Gen Kol Assets</button>

  return (
    <CompsNFTMain
      data={getNFTSettings({
        isKol: true,
        signature: 'https://i.imgur.com/Qpji4ZS.png',
        gridIconTemplate: genRandomKolGITemplate(),
        aroundText:
          'AAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCFDDDDDDDDDDDDDDDDDDEE',
        message:
          '在旅途中，\n小王子思考愛的真諦明白馴養的意義。\n小王子思考愛的真諦明白馴養的意義。\nI love you.\n我愛你。',
      })}
      assetsCB={(assets) => {
        console.log(assets)
        // ? Enable below to download a file (remember to change the assets.xxx)

        // const link = document.createElement('a')
        // const url = URL.createObjectURL(assets.afterOpenHtml)

        // link.href = url
        // link.download = assets.afterOpenHtml.name
        // document.body.appendChild(link)
        // link.click()

        // document.body.removeChild(link)
        // window.URL.revokeObjectURL(url)
      }}
    />
  )
}

export default TestPage
