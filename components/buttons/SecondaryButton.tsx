import { classNames } from 'utils/helpers'

export const SecondaryButton = ({
  children,
  disabled = false,
  wide = false,
  ...props
}) => {
  const px = wide ? 'px-20 md:px-30' : 'px-7 md:px-20'
  return (
    <button
      className={classNames(
        'font-medium md:text-lg py-1 md:py-3 bg-transparent border',
        px,
        disabled
          ? 'text-shadow-gray border-shadow-gray shadow-pixel-disabled-sm md:shadow-pixel-disabled-lg'
          : 'text-lemon border-lemon shadow-pixel-active-sm md:shadow-pixel-active-lg'
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
