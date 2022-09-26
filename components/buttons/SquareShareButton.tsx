import { classNames } from 'utils/helpers'

export const SquareShareButton = ({ className = '', ...props }) => (
  <button className={classNames(className, 'relative')} {...props}>
    <SquareShareSvg className="hidden md:block" width={64} height={64} />
    <SquareShareSvg className="md:hidden" width={42} height={42} />
  </button>
)

const SquareShareSvg = ({ width, height, ...props }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 42 42"
    {...props}
  >
    <path fill="#EDFA00" d="M0 0h36v36H0z" />
    <path
      d="M27 17.875 18.75 10v4.5C10.855 14.5 9 20.161 9 25.75c2.279-2.918 4.294-4.5 9.75-4.5v4.5L27 17.875Z"
      stroke="#000"
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <path
      fill="#55F263"
      d="M1 36h1v1H1zM2 36h1v2H2zM3 36h1v3H3zM4 36h1v4H4zM5 36h1v5H5zM6 36h36v6H6zM36 6h6v30h-6zM36 5h5v1h-5zM36 3h3v1h-3zM36 4h4v1h-4zM36 1h1v1h-1zM36 2h2v1h-2z"
    />
  </svg>
)
