import { SquareDLButton, SquareIGButton } from 'components/buttons'
import { classNames } from 'utils/helpers'

export function SocialButtons({ className = '', onDLClick, onIGClick }) {
  return (
    <div className={classNames('flex space-x-4 justify-center', className)}>
      <SquareDLButton onClick={onDLClick} />
      <SquareIGButton onClick={onIGClick} />
    </div>
  )
}
