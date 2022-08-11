import { classNames } from 'utils/helpers'

export const SquareDLButton = ({
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
        <path fill="#55F263" d="M39 5h5v35h-5z" />
        <path fill="#55F263" d="M5 39h39v5H5zM39 2.001h2.999v1H39z" />
        <path
          fill="#55F263"
          d="M39 3h3.999v1H39zM39 4h4.999v1H39zM39 0h1v1h-1z"
        />
        <path fill="#55F263" d="M39 .999h1.999v1H39zM5 41.999H2v-1h3z" />
        <path fill="#55F263" d="M5 41H1v-1h4zM5 40H0v-1h5zM5 44.001H4v-1h1z" />
        <path fill="#55F263" d="M5 43.002H3v-1h2z" />
        <path fill="#000" d="M.5.5h39v39H.5z" />
        <path fill="#EDFA00" d="M.5.5h39v39H.5z" />
        <path stroke="#55F263" d="M.5.5h39v39H.5z" />
        <path
          fill="#000"
          d="M12.263 17.685h2.895v2.895h-2.895zM15.157 20.58h2.895v2.895h-2.895zM18.052 23.475h2.895v2.895h-2.895z"
        />
        <path
          fill="#000"
          d="M18.052 23.475h2.895v2.895h-2.895zM18.053 9h2.895v11.579h-2.895zM20.947 20.58h2.895v2.895h-2.895zM23.843 17.685h2.895v2.895h-2.895zM12 31v-3h15v3z"
        />
      </svg>
    </button>
  )
}
