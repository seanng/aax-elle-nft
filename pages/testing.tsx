import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Files } from 'shared/types'
import { getAssets } from 'utils/nft'
import CompsNFTMain from 'components/NFT/Main'

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
  // const mode = 'assets' // "assets" or "comps"
  const [files, setFiles] = useState<Files>({
    beforeOpenImage: null,
    beforeOpenHtml: null,
    afterOpenImage: null,
    afterOpenHtml: null,
    neverOpenedImage: null,
    neverOpenedHtml: null,
  })

  // useEffect(() => {
  //   if (mode === 'assets') {
  //     const handler = async () => {
  //       const assets = await getAssets(data)
  //       setFiles(assets)
  //       console.log(assets)
  //       console.log(assets.beforeOpenPreview)
  //     }

  //     handler()
  //   }
  // }, [])

  // if (mode === 'comps')
  //   return (
  //     <CompsNFTMain
  //       data={data}
  //       assetsCB={(assets) => {
  //         console.log(assets)
  //         console.log(assets.beforeOpenPreview)
  //       }}
  //     />
  //   )

  return (
    <div className="text-center">
      {/* {
        // eslint-disable-next-line
        files.beforeOpenPreview && (
          <div dangerouslySetInnerHTML={{ __html: files.beforeOpenPreview }} />
        )
      }
      {files.beforeOpenDataURL && (
        <div>
          <a
            className="bg-blue-900 text-white p-3 inline-block"
            href={files.beforeOpenDataURL}
            download="unopened.png"
          >
            Download Before Open PNG
          </a>
        </div>
      )}
      {files.beforeOpenPreview && (
        <div>
          <a
            className="bg-blue-900 text-white p-3 inline-block"
            href={`data:text/html;charset=utf-8,${encodeURIComponent(
              files.beforeOpenPreview
            )}`}
            download="unopened.html"
          >
            Download Before Open HTML
          </a>
        </div>
      )}

      {
        // eslint-disable-next-line
        files.afterOpenPreview && (
          <div dangerouslySetInnerHTML={{ __html: files.afterOpenPreview }} />
        )
      }
      {files.afterOpenDataURL && (
        <div>
          <a
            className="bg-blue-900 text-white p-3 inline-block"
            href={files.afterOpenDataURL}
            download="opened.png"
          >
            Download Opened PNG
          </a>
        </div>
      )}
      {files.afterOpenPreview && (
        <div>
          <a
            className="bg-blue-900 text-white p-3 inline-block"
            href={`data:text/html;charset=utf-8,${encodeURIComponent(
              files.afterOpenPreview
            )}`}
            download="opened.html"
          >
            Download Opened HTML
          </a>
        </div>
      )}

      {
        // eslint-disable-next-line
        files.neverOpenedPreview && (
          <div dangerouslySetInnerHTML={{ __html: files.neverOpenedPreview }} />
        )
      }
      {files.neverOpenedDataURL && (
        <div>
          <a
            className="bg-blue-900 text-white p-3 inline-block"
            href={files.neverOpenedDataURL}
            download="neverOpened.png"
          >
            Download Unopen PNG
          </a>
        </div>
      )}
      {files.neverOpenedPreview && (
        <div>
          <a
            className="bg-blue-900 text-white p-3 inline-block"
            href={`data:text/html;charset=utf-8,${encodeURIComponent(
              files.neverOpenedPreview
            )}`}
            download="neverOpened.html"
          >
            Download Unopen HTML
          </a>
        </div>
      )} */}
    </div>
  )
}

export default TestPage
