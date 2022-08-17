import { SquareDLButton, SquareIGButton } from 'components/buttons'
import { useMint } from 'hooks'
import { classNames } from 'utils/helpers'

export function SocialButtons({ className = '' }) {
  const { files } = useMint()
  const handleDLClick = () => {
    // Download Original NFT Image
    // Show toast
  }

  const handleIGClick = () => {
    // Download IG NFT Image
    // Show toast
  }

  return (
    <div className={classNames('flex space-x-4 justify-center', className)}>
      <SquareDLButton onClick={handleDLClick} />
      <SquareIGButton onClick={handleIGClick} />
    </div>
  )
}
