import { classNames } from 'utils/helpers'

export const ModalCloseButton = ({
  width = 20,
  height = 20,
  fill = '#fff',
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={classNames('focus:outline-none', className)}
      {...props}
    >
      <span className="sr-only">Close</span>
      <svg
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 20 20`}
        {...props}
      >
        <path
          fill="#fff"
          d="M0 0h4v4H0zM0 16h4v4H0zM4 4h4v4H4zM4 12h4v4H4zM8 8h4v4H8z"
        />
        <path
          fill="#fff"
          d="M8 8h4v4H8zM12 4h4v4h-4zM12 12h4v4h-4zM16 0h4v4h-4zM16 16h4v4h-4z"
        />
      </svg>
    </button>
  )
}
