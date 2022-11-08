import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { OutlinedHeading, WarningIcon, IgShareInstructions } from 'components'
import { useCallback, useEffect, useState } from 'react'
import { genImageFile, getAssets } from 'utils/nft'
import randomstring from 'randomstring'
import Image from 'next/image'
import { publicFrameText, s3BaseUrl } from 'utils/config'
import AroundText2 from 'components/NFT/shared/AroundText2'

const html2canvasOpts = {
  height: 690,
  windowHeight: 690,
  width: 394,
  windowWidth: 394,
  backgroundColor: 'black',
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
        <OutlinedHeading className="mb-10">分享 Impact NFT</OutlinedHeading>
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
          <img src={previewImage} height="694px" width="390px" alt="finalImg" />
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
        <div className="h-0 w-[390px] bg-black overflow-hidden">
          <div
            ref={compRef}
            className="bg-black h-[694px] w-full flex flex-col items-center"
          >
            <div className="flex justify-between items-center pt-20 px-5 w-full mb-10">
              <img src="/images/ig-share-top-left.png" height="25" width="99" />
              <img src="/logos/elle-white.png" height="39" width="104" />
              <img
                src="/images/ig-share-top-right.png"
                height="25"
                width="99"
              />
            </div>
            {nftImageSource && (
              <div className="px-[35px]">
                <img
                  src={nftImageSource}
                  width="320"
                  height="320"
                  crossOrigin="anonymous"
                  alt="my-secret-message"
                />
              </div>
            )}
            <div className="flex items-center mt-6">
              <OutlinedHeading
                color="#FF66FF"
                fontSizeClass="font-noto text-lg tracking-[4px] mr-3"
              >
                前往
              </OutlinedHeading>
              <OutlinedHeading
                color="#FF66FF"
                fontSizeClass="italic text-lg tracking-[4px] mr-3 font-mono"
              >
                {`>>>`}
              </OutlinedHeading>
              <span className="text-[22px] font-medium italic text-guava font-mono">
                elleverse.io
              </span>
            </div>
            <OutlinedHeading
              color="#FF66FF"
              fontSizeClass="font-noto text-lg tracking-[4px]"
            >
              鑄造你的 Impact NFT！
            </OutlinedHeading>
            <div className="mt-20 text-center">
              <img src="/images/ig-share-bottom.png" height="25" width="354" />
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
          aroundText: publicFrameText,
          neverOpenedAroundText: publicFrameText,
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
