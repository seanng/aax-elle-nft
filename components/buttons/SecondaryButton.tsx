import { classNames } from 'utils/helpers'

export const SecondaryButton = ({ className = '', children, ...props }) => {
  return (
    <button className={classNames('relative', className)} {...props}>
      <Svg />
      <div className="absolute mx-auto font-noto text-base font-medium text-lemon w-full h-full top-0 leading-[40px]">
        {children}
      </div>
    </button>
  )
}

const Svg = ({ height = 42, width = 120, ...props }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 120 42`}
    {...props}
  >
    <path
      fill="#55F263"
      d="M113.208 5H120v31h-6.792zM6.792 36H120v6H6.792zM3.396 36h1.132v3H3.396zM4.528 36H5.66v4H4.528zM5.66 36h1.132v5H5.66zM2.264 36h1.132v2H2.264zM113.208 2h3.396v1h-3.396zM113.208 3h4.528v1h-4.528zM113.208 4h5.66v1h-5.66zM1.132 36h1.132v1H1.132zM113.208 0h1.132v1h-1.132zM113.208 1h2.264v1h-2.264z"
    />
    <path stroke="#EDFA00" d="M.5.5h113.34v35H.5z" />
  </svg>
)
