import { MintResponseData } from 'shared/types'
import {
  FormHeading,
  LinkAndPasscode,
  SquareDLButton,
  SquareIGButton,
} from 'components'
import { config } from 'utils/config'

interface Props {
  data: MintResponseData
}

export function SuccessStep({ data }: Props) {
  // const d = { shortcode: 'abcd1', passcode: 'love1331' }
  const handleIGClick = () => {
    console.log('handling ig click.')
  }

  const link = `${config.siteUrl}/open/${data?.shortcode}`

  return (
    <div className="flex flex-col font-noto pt-16 w-80 mx-auto text-center">
      <FormHeading className="mb-2">恭喜成功鑄造NFT！</FormHeading>
      <p className="mb-4">複製連結把上鎖的心意傳給你的愛人！</p>
      {/* NFT ANIMATION URL GOES HERE */}
      <div className="flex space-x-4 justify-center mb-5">
        <SquareDLButton />
        <SquareIGButton onClick={handleIGClick} />
      </div>
      <LinkAndPasscode
        link={link}
        passcode={data?.passcode ?? 'abc12'}
        className="mb-5"
      />
      <p className="text-left">
        我們已將上鎖密碼即連結寄到你的email，你可以稍後查看。
      </p>
    </div>
  )
}
