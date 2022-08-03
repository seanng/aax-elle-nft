import { classNames } from 'utils/helpers'

export const PrimaryButtonNew = ({ className = '', children, ...props }) => {
  return (
    <button className={classNames('relative', className)} {...props}>
      <Svg />
      <div className="absolute mx-auto font-noto text-base w-full h-full top-0 leading-[37px]">
        {children}
      </div>
    </button>
  )
}

const Svg = ({ height = 42, width = 127, ...props }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    {...props}
  >
    <path fill="#F6F" d="M0 0h121v36H0z" />
    <path
      fill="#3563E9"
      d="M121 6h6v30h-6zM6 36h121v6H6zM3 36h1v3H3zM4 36h1v4H4zM5 36h1v5H5zM2 36h1v2H2zM121 3h3v1h-3zM121 4h4v1h-4zM121 5h5v1h-5zM1 36h1v1H1zM121 1h1v1h-1zM121 2h2v1h-2z"
    />
  </svg>
)
