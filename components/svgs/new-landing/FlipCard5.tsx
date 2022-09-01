export const FlipCard5 = ({
  width = 200,
  height = 200,
  isBack = false,
  ...props
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M189.474 66.669v1H199v121.805h-9.526V199H10.526v-9.526H1V67.669h9.526v-9.526h28.571V20.046h9.52v-9.52h9.526V1h83.714v9.526h9.526v9.52h9.52v38.097h28.571v8.526Zm-74.188-28.572v-1H84.714v21.046h30.572V38.097Z"
      fill={isBack ? '#00EAFF' : '#000'}
      stroke="#00EAFF"
      strokeWidth={2}
    />
  </svg>
)
