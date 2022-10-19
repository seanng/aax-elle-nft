import { classNames } from 'utils/helpers'

export const PrimaryButton = ({
  children,
  disabled = false,
  wide = false,
  mobileOnly = false,
  ...props
}) => {
  const px = wide
    ? `px-20 ${mobileOnly ? '' : 'md:px-30'}`
    : `px-7 ${mobileOnly ? '' : 'md:px-20'}`
  return (
    <button
      className={classNames(
        'font-medium py-1',
        mobileOnly ? '' : 'md:text-lg md:py-3',
        px,
        disabled
          ? `text-shadow-gray bg-cement shadow-pixel-disabled-sm ${
              mobileOnly ? '' : 'md:shadow-pixel-disabled-lg'
            }`
          : `text-black bg-banana shadow-pixel-active-sm ${
              mobileOnly ? '' : 'md:shadow-pixel-active-lg'
            }`
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
