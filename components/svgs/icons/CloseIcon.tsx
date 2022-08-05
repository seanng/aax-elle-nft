export const CloseIcon = ({ width = 25, height = 25, ...props }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 25 25`}
    {...props}
  >
    <path
      fill="#fff"
      d="M0 0h5v5H0zM0 20h5v5H0zM5 5h5v5H5zM5 15h5v5H5zM10 10h5v5h-5z"
    />
    <path
      fill="#fff"
      d="M10 10h5v5h-5zM15 5h5v5h-5zM15 15h5v5h-5zM20 0h5v5h-5zM20 20h5v5h-5z"
    />
  </svg>
)
