export const CaretDownIcon = ({
  width = 25,
  height = 15,
  fill = '#55F263',
  ...props
}) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 25 15`}
    {...props}
  >
    <path fill={fill} d="M0 0h5v5H0zM5 5h5v5H5zM10 10h5v5h-5z" />
    <path fill={fill} d="M10 10h5v5h-5zM15 5h5v5h-5zM20 0h5v5h-5z" />
  </svg>
)
