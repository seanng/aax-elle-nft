import { Files, MintResponseData } from 'shared/types'
import { IGIcon, OutlinedHeading, LinkAndPasscode } from 'components'
import { metadata } from 'utils/config'
import Link from 'next/link'
import { usePreviewHtml } from 'hooks'

interface Props {
  data: MintResponseData
  files: Files
}

export function SuccessStep({ data, files }: Props) {
  const preview = usePreviewHtml(files.beforeOpenHtml)
  const link = `${metadata.siteUrl}/open/${data?.slug}`

  return (
    <div className="flex flex-col font-noto pt-16 text-center">
      <OutlinedHeading className="mb-2 md:mb-7">
        恭喜成功鑄造 Impact NFT！
      </OutlinedHeading>
      <div className="text-center mx-auto">
        <p className="w-64 md:w-full mb-4 md:mb-7 md:text-xl mx-auto tracking-wide">
          這份愛的告白會永久保存在區塊鏈上也可以分享NFT到社群喔
        </p>
        <div dangerouslySetInnerHTML={{ __html: preview as string }} />
        <div className="mt-6 mb-4">
          <Link href={`/ig-share?id=${data?.messageTokenId}`} passHref>
            <a target="__blank">
              <IgShareButton />
            </a>
          </Link>
        </div>
        <Link href="/collection" passHref>
          <a target="__blank">
            <GoToCollectionButton />
          </a>
        </Link>
        <LinkAndPasscode
          link={link}
          passcode={data?.passcode ?? 'abc12'}
          className="mb-5 md:mb-9 mt-8"
        />
        <p className="w-64 md:w-full mx-auto md:text-lg tracking-wide mb-6 md:mb-8">
          我們已將上鎖密碼即連結寄到你的email，你可以稍後查看。
        </p>
      </div>
    </div>
  )
}

const IgShareButton = ({ width = 227, height = 42, ...props }) => (
  <button className="relative" {...props}>
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 227 42`}
    >
      <path fill="#55F263" d="M219.669 5.001h6.792v31h-6.792z" />
      <path fill="#55F263" d="M4.136 36h222v6h-222zM2 36.001h1.132v3H2z" />
      <path fill="#55F263" d="M3 36.001h1.132v4H3z" />
      <path
        fill="#55F263"
        d="M4 36.001h1.132v5H4zM1 36.001h1.132v2H1zM219.669 2.001h3.396v1h-3.396zM219.669 3.001h4.528v1h-4.528zM219.669 4.001h5.66v1h-5.66z"
      />
      <path
        fill="#55F263"
        d="M0 36.001h1.132v1H0zM131.395.001h1.132v1h-1.132zM219.669 1.001h2.264v1h-2.264z"
      />
      <path fill="#EDFA00" d="M.136 0h220v36h-220z" />
    </svg>
    <div className="absolute flex items-center mx-auto text-black font-medium md:text-lg font-mono w-full h-full top-0 leading-[32px] md:leading-[40px] left-4">
      <IGIcon color="black" height={34} width={34} />
      分享至 Instagram
    </div>
  </button>
)

const GoToCollectionButton = ({ width = 227, height = 45, ...props }) => (
  <button className="relative" {...props}>
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 227 45`}
    >
      <path
        fill="#55F263"
        d="M219.233 5h7v35h-7zM4 40h222v5H4zM2.023 40h1v3h-1z"
      />
      <path
        fill="#55F263"
        d="M3.023 40h1v4h-1zM4.023 40h1v5h-1zM1.023 40h1v2h-1zM218.769 2h4.32v1h-4.32zM218.769 3h5.759v1h-5.759zM219.229 4h7v1h-7z"
      />
      <path
        fill="#55F263"
        d="M.023 40h1v1h-1zM173.567 0h1.44v1h-1.44zM218.769 1h2.88v1h-2.88z"
      />
      <path stroke="#EDFA00" d="M.5.5h219v39H.5z" />
    </svg>
    <div className="absolute mx-auto text-lemon font-medium md:text-lg font-mono w-full h-full top-0 leading-[38px] md:leading-[40px]">
      前往我的秘密告白
    </div>
  </button>
)
