import clsx from 'clsx'

export function CaretDownButton({ className = '', ...props }) {
  return (
    <button className={clsx('relative', className)} {...props}>
      <Svg />
    </button>
  )
}

const Svg = ({ height = 25, width = 45, ...props }) => (
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
      d="M20 20h5v5h-5zM25 15h5v5h-5zM30 10h5v5h-5zM35 5h5v5h-5zM40 0h5v5h-5zM15 15h5v5h-5zM10 10h5v5h-5zM5 5h5v5H5zM0 0h5v5H0z"
    />
  </svg>
)
