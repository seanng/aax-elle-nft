import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Files } from 'shared/types'
import { getAssets } from 'utils/nft'
import CompsNFTUnopen from 'components/NFT/Unopen'
// import { MintLayout } from 'components'

const data = {
  opacity: '0.25',
  background:
    'radial-gradient(60.05% 60.05% at 50.55% 55.01%, #FFFF00 3%, #FFFF00 24%, #33FF99 100%)',
  gridIconColor: '#1919FF',
  aroundTextColor: '#1919FF',
  aroundText:
    'AAAAAAAAAA BBBBBBBBBB CCCCCCCCC DDDDDDDDD gpqy EEEEEEEEEE FFFFFFFFFF GGGGGGGGGG HHHHHHHHHH',
  messageColor: '#000000',
  message:
    '在旅途中，\n小王子思考愛的真諦明白馴養的意義。\n小王子思考愛的真諦明白馴養的意義。\nI love you.\n我愛你。',
}

const TestPage: NextPage = () => {
  const [files, setFiles] = useState<Files>({
    beforeOpenImage: null,
    beforeOpenHtml: null,
    afterOpenImage: null,
    afterOpenHtml: null,
    neverOpenedImage: null,
    neverOpenedHtml: null,
  })
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null) // eslint-disable-line

  useEffect(() => {
    const handler = async () => {
      const assets = await getAssets(data)
      setFiles(assets)
      console.log(assets) // eslint-disable-line
    }

    handler()
  }, [])

  useEffect(() => {
    if (files.beforeOpenHtml) {
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          setPreview(reader.result)
        },
        false
      )

      reader.readAsText(files.beforeOpenHtml)
    }
  }, [files])
  // return preview ? (
  //   <div dangerouslySetInnerHTML={{ __html: preview as string }} />
  // ) : null
  return <CompsNFTUnopen data={data} />
}

export default TestPage
