const width = 25
const height = 20

export const HamburgerIcon = (props) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    {...props}
  >
    <path
      fill="#fff"
      d="M0 0h5v5H0zM0 15h5v5H0zM5 0h5v5H5zM5 15h5v5H5zM10 0h5v5h-5zM10 15h5v5h-5zM15 0h5v5h-5zM15 15h5v5h-5zM20 0h5v5h-5zM20 15h5v5h-5z"
    />
  </svg>
)
