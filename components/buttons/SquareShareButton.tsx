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
    <path fill="#000" d="M21 11h3v3h-3zM18 9h3v3h-3zM18 12h3v3h-3z" />
    <path fill="#000" d="M16 14h3v3h-3zM13 15h3v3h-3z" />
    <path fill="#000" d="M11 17h3v3h-3zM9 20h3v3H9zM8 23h3v3H8z" />
    <path fill="#000" d="M7 25h3v2H7zM10 23h3v3h-3zM23 13h3v3h-3z" />
    <path fill="#000" d="M25 15h3v3h-3z" />
    <path fill="#000" d="M27 17h3v3h-3z" />
    <path fill="#000" d="M25 19h3v3h-3z" />
    <path
      fill="#000"
      d="M23 21h3v3h-3zM18 25h3v3h-3zM18 13h3v3h-3zM18 20h3v3h-3z"
    />
    <path fill="#000" d="M18 22h3v3h-3zM13 22h3v3h-3z" />
    <path fill="#000" d="M15 21h3v3h-3zM21 23h3v3h-3z" />
    <path
      fill="#55F263"
      d="M1 36h1v1H1zM2 36h1v2H2zM3 36h1v3H3zM4 36h1v4H4zM5 36h1v5H5zM6 36h36v6H6zM36 6h6v30h-6zM36 5h5v1h-5zM36 3h3v1h-3zM36 4h4v1h-4zM36 1h1v1h-1zM36 2h2v1h-2z"
    />
  </svg>
)
