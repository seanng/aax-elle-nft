import { NextPage } from 'next'
// import { decrypt } from 'lib/crypto'
import { useRouter } from 'next/router'
import { OutlinedHeading, WarningIcon, IgShareInstructions } from 'components'
import CompsNFTBeforeOpen from 'components/NFT/BeforeOpen'
import { useCallback, useEffect, useState } from 'react'
import { genImageFile, getAssets } from 'utils/nft'
import { downloadFile } from 'utils/helpers'
import randomstring from 'randomstring'
import Image from 'next/image'
import { s3BaseUrl } from 'utils/config'
import AroundText2 from 'components/NFT/shared/AroundText2'

const html2canvasOpts = {
  height: 534,
  windowHeight: 534,
}

const IgSharePage: NextPage = () => {
  const [previewImage, setPreviewImage] = useState<any>(null)
  const [compNode, setCompNode] = useState<any>(null)
  const router = useRouter()
  const nftImageSource = useNftImageSource(router)

  const compRef = useCallback((node) => {
    if (node) setCompNode(node)
  }, [])

  // Set Image from Component
  useEffect(() => {
    if (compNode && nftImageSource) {
      ;(async () => {
        const file = await genImageFile(
          compNode,
          'Impact NFT Shareable Image',
          undefined,
          html2canvasOpts
        )
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => {
            setPreviewImage(reader.result)
          },
          false
        )
        reader.readAsDataURL(file as File)
      })()
    }
  }, [compNode, nftImageSource])

  return (
    <>
      <div className="flex flex-col items-center bg-black min-h-screen text-white py-10 md:py-20">
        <OutlinedHeading className="mb-10">
          如何儲存分享Impact NFT？
        </OutlinedHeading>
        <IgShareInstructions />
        {router.query.at && (
          <div className="flex justify-center w-80 md:w-[650px] text-orange space-x-2 mb-4 md:mb-16">
            <WarningIcon className="flex-none mt-1" width={16} height={16} />
            <div>
              你的告白完成到一半摟！想要把你心中的愛真正分享給愛的收件者並獲得抽獎資格嗎？趕緊去鑄造一張Impact
              NFT吧！
            </div>
          </div>
        )}

        {previewImage ? (
          <img src={previewImage} height="534" width="350" alt="finalImg" />
        ) : (
          <div className="pt-10">
            <Image
              priority
              src="/images/loading-icon.gif"
              layout="fixed"
              height={104}
              width={104}
            />
          </div>
        )}

        {/* Hidden div */}
        <div className="h-0 overflow-hidden">
          <div
            ref={compRef}
            className="bg-black h-[534px] flex flex-col items-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.3) 0.5px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.3) 0.5px, transparent 1px)`,
              backgroundSize: '40px 40px',
              backgroundPosition: '-10% -10%',
            }}
          >
            <img
              className="py-8"
              src="/logos/elle-white.png"
              height="27"
              width="72"
            />
            {nftImageSource && (
              <img
                src={nftImageSource}
                width="350"
                height="350"
                crossOrigin="anonymous"
                alt="my-secret-message"
              />
            )}
            <div className="flex justify-between font-mono py-8 items-center">
              <OutlinedHeading
                className="mb-0.5"
                fontSizeClass="text-lg tracking-wider font-noto"
                color="#EDFA00"
              >
                前往鑄造
              </OutlinedHeading>
              <OutlinedHeading
                fontSizeClass="text-lg tracking-wider italic"
                color="#EDFA00"
                className="ml-2"
              >
                {`>>>`}
              </OutlinedHeading>
              <OutlinedHeading
                className="ml-4"
                fontSizeClass="text-lg tracking-wider italic"
                color="#FF66FF"
              >
                elleverse.io
              </OutlinedHeading>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const CompsMessageBox = ({ data, assetsCB }) => {
  const [compNode, setCompNode] = useState<any>(null)
  const [isAroundTextReady, setIsAroundTextReady] = useState(false)
  const [file, setFile] = useState(null)

  // Set Comp Node
  const compRef = useCallback((node) => {
    if (node) setCompNode(node)
  }, [])

  useEffect(() => {
    if (isAroundTextReady) {
      genImageFile(compNode, 'my-secret-message.png', setFile, {
        width: 320,
        height: 320,
        windowWidth: 320,
        windowHeight: 320,
      })
    }
  }, [compNode, isAroundTextReady])

  useEffect(() => {
    if (file) assetsCB(file)
  }, [file, assetsCB])

  return (
    <div
      className="w-80 h-[320px] md:w-[642px] md:h-[642px] mb-6 relative flex justify-center items-center"
      ref={compRef}
    >
      <AroundText2
        aroundText={data.aroundText}
        setIsCompReady={setIsAroundTextReady}
      />

      {data.message && (
        <div
          id="message"
          style={{
            WebkitFilter: 'blur(0px)',
          }}
          className="
          relative
          shadow-sm
          block
          md:scale-[2]
          w-[280px]
          h-[280px]
          px-[5.5px]
          py-0
          tracking-[0.01em]
          text-[26px]
          leading-[150%]
          bg-black
          border-0
          rounded-none
          resize-none
          text-white
          font-cubic
          focus:border-transparent 
          focus:ring-0
        "
        >
          {data.message.split('\n').map((line, index) => (
            <div className={line === '' ? 'invisible' : ''} key={index}>
              {line === '' ? 'f' : line}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function useNftImageSource(router) {
  const [imageSource, setImageSource] = useState<any>(null)

  useEffect(() => {
    if (router.query.id) {
      const id = Number(router.query.id)
      // Randomizing the query param force-fetches the image from source
      const randomQuery = randomstring.generate({ length: 6 })
      if (id >= 0 && id < 3113)
        fetch(`${s3BaseUrl}/public/${id}.png?${randomQuery}`)
          .then((response) => response.blob())
          .then((imageBlob) => setImageSource(URL.createObjectURL(imageBlob)))
      return
    }

    if (router.query.at) {
      ;(async () => {
        const imageFile = await getAssets({
          message: (router.query.m as string) ?? '',
          aroundText: (router.query.at as string) ?? '',
          neverOpenedAroundText: (router.query.at as string) ?? '',
          Comps: CompsMessageBox,
        })

        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => setImageSource(reader.result),
          false
        )

        reader.readAsDataURL(imageFile as File)
      })()
    }
  }, [router.query])

  return imageSource
}

export default IgSharePage
