import { DesktopSecondaryButton, MobileSecondaryButton } from 'components'
import { classNames } from 'utils/helpers'

export const ResponsiveSecondaryButton = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <>
      <MobileSecondaryButton
        className={classNames('md:hidden', className)}
        {...props}
      >
        {children}
      </MobileSecondaryButton>
      <DesktopSecondaryButton
        className={classNames('hidden md:inline-block', className)}
        {...props}
      >
        {children}
      </DesktopSecondaryButton>
    </>
  )
}
