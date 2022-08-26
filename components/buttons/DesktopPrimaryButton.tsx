import { classNames } from 'utils/helpers'

export const DesktopPrimaryButton = ({
  className = '',
  children,
  disabled = false,
  height = 64,
  width = 240,
  ...props
}) => {
  return (
    <button
      className={classNames('relative', className)}
      disabled={disabled}
      {...props}
    >
      {disabled ? (
        <DisabledSvg {...{ width, height }} />
      ) : (
        <PrimarySvg {...{ width, height }} />
      )}
      <div
        className={classNames(
          'absolute mx-auto font-noto text-lg font-medium w-full h-full top-3 pr-2 leading-150%',
          disabled ? 'text-[#5F6368]' : 'text-black'
        )}
      >
        {children}
      </div>
    </button>
  )
}

const PrimarySvg = ({ height, width, ...props }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 240 64`}
    {...props}
  >
    <path
      fill="#55F263"
      d="M10 52h230v12H10zM4 52h2v6H4zM6 52h2v8H6zM8 52h2v10H8zM2 52h2v4H2zM0 52h2v2H0z"
    />
    <path fill="#EDFA00" d="M0 0h228v52H0z" />
    <path fill="#55F263" d="M228 9.629h12v42.37h-12z" />
    <path
      fill="#55F263"
      d="M228 7.704h10V9.63h-10zM228 3.852h6v1.926h-6zM228 5.778h8v1.926h-8zM228 0h2v1.926h-2zM228 1.926h4v1.926h-4z"
    />
  </svg>
)

const DisabledSvg = ({ height, width, ...props }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 240 64`}
    {...props}
  >
    <path
      fill="#626262"
      d="M10 52h230v12H10zM4 52h2v6H4zM6 52h2v8H6zM8 52h2v10H8zM2 52h2v4H2zM0 52h2v2H0zM228 9.629h12v42.37h-12z"
    />
    <path
      fill="#626262"
      d="M228 7.704h10V9.63h-10zM228 3.852h6v1.926h-6zM228 5.778h8v1.926h-8zM228 0h2v1.926h-2zM228 1.926h4v1.926h-4z"
    />
    <path fill="#C4C4C4" d="M0 0h228v52H0z" />
  </svg>
)
