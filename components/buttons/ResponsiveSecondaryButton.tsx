import { DesktopSecondaryButton, MobileSecondaryButton } from 'components'

export const ResponsiveSecondaryButton = ({ children, ...props }) => {
  return (
    <>
      <MobileSecondaryButton className="md:hidden" {...props}>
        {children}
      </MobileSecondaryButton>
      <DesktopSecondaryButton className="hidden md:block" {...props}>
        {children}
      </DesktopSecondaryButton>
    </>
  )
}
