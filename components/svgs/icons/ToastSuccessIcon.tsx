export const ToastSuccessIcon = ({ height = 32, width = 32, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#000"
      d="M0 4h4v24H0zM28 4h4v24h-4zM4 0h24v4H4zM4 28h24v4H4zM8 16.414l2.828-2.828 7.071 7.07-2.828 2.83z"
    />
    <path fill="#000" d="m15.07 23.486-2.828-2.829 9.9-9.9 2.828 2.83z" />
  </svg>
)
