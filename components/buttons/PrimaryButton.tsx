import clsx from 'clsx'

export const PrimaryButton = ({
  children,
  disabled = false,
  wide = false,
  mobileOnly = false,
  ...props
}) => {
  const px = wide
    ? clsx('px-20', !mobileOnly && 'md:px-30')
    : clsx('px-7', !mobileOnly && 'md:px-20')

  const colors = disabled
    ? clsx(
        'text-shadow-gray bg-cement shadow-pixel-disabled-sm',
        !mobileOnly && 'md:shadow-pixel-disabled-lg'
      )
    : clsx(
        'text-black bg-banana shadow-pixel-active-sm',
        !mobileOnly && 'md:shadow-pixel-active-lg'
      )

  const shadowMargins = clsx('mb-1.5 mr-1.5', !mobileOnly && 'md:mb-3 md:mr-3')

  const btnClass = clsx(
    'font-medium py-1',
    !mobileOnly && 'md:text-lg md:py-3',
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
