import { classNames } from 'utils/helpers'

export const SquareFBButton = ({
  className = '',
  width = 44,
  height = 44,
  ...props
}) => {
  return (
    <button className={classNames('relative', className)} {...props}>
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 44 44`}
      >
        <path fill="#EDFA00" stroke="#55F263" d="M.5.5h39v39H.5z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33 19.576C33 12.63 27.403 7 20.5 7S8 12.63 8 19.576c0 6.276 4.57 11.479 10.547 12.423v-8.787h-3.175v-3.636h3.175v-2.771c0-3.151 1.866-4.893 4.721-4.893 1.368 0 2.799.246 2.799.246v3.095H24.49c-1.552 0-2.037.969-2.037 1.965v2.358h3.466l-.553 3.636h-2.913V32C28.43 31.056 33 25.854 33 19.576Z"
          fill="#EDFA00"
          stroke="#000"
          strokeWidth={1.5}
        />
        <path fill="#55F263" d="M39 5h5v35h-5z" />
        <path fill="#55F263" d="M5 39h39v5H5zM39 2.001h2.999v1H39z" />
        <path
          fill="#55F263"
          d="M39 3h3.999v1H39zM39 4h4.999v1H39zM39 0h1v1h-1z"
        />
        <path fill="#55F263" d="M39 .999h1.999v1H39zM5 41.999H2v-1h3z" />
        <path fill="#55F263" d="M5 41H1v-1h4zM5 40H0v-1h5zM5 44.001H4v-1h1z" />
        <path fill="#55F263" d="M5 43.002H3v-1h2z" />
      </svg>
    </button>
  )
}
