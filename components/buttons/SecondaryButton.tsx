import clsx from 'clsx'

export const SecondaryButton = ({
  children,
  disabled = false,
  wide = false,
  ...props
}) => {
  const px = wide ? 'px-20 md:px-30' : 'px-7 md:px-20'

  const colors = disabled
    ? 'text-shadow-gray border-shadow-gray shadow-pixel-disabled-sm md:shadow-pixel-disabled-lg'
    : 'text-lemon border-lemon shadow-pixel-active-sm md:shadow-pixel-active-lg'

  const shadowMargins = 'mb-1.5 mr-1.5 md:mb-3 md:mr-3'

  const btnClass = clsx(
    'font-medium md:text-lg py-1 md:py-3 bg-transparent border',
    px,
    colors,
    shadowMargins
  )

  return (
    <button className={btnClass} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
