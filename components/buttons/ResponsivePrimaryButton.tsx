import { DesktopPrimaryButton, MobilePrimaryButton } from 'components'
import { classNames } from 'utils/helpers'

export const ResponsivePrimaryButton = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <>
      <MobilePrimaryButton
        className={classNames('md:hidden', className)}
        {...props}
      >
        {children}
      </MobilePrimaryButton>
      <DesktopPrimaryButton
        className={classNames('hidden md:inline-block', className)}
        {...props}
      >
        {children}
      </DesktopPrimaryButton>
    </>
  )
}
