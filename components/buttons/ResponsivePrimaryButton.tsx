import { DesktopPrimaryButton, MobilePrimaryButton } from 'components'

export const ResponsivePrimaryButton = ({ children, ...props }) => {
  return (
    <>
      <MobilePrimaryButton className="md:hidden" {...props}>
        {children}
      </MobilePrimaryButton>
      <DesktopPrimaryButton className="hidden md:inline-block" {...props}>
        {children}
      </DesktopPrimaryButton>
    </>
  )
}
