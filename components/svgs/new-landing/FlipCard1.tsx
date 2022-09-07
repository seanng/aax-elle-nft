export const FlipCard1 = ({
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
      d="M189.474 66.669v1H199v55.142h-9.526v19.046h-9.52v19.046h-9.525v9.526h-9.526v9.525h-9.52v9.52h-19.052V199H67.669v-9.526H48.617v-9.52h-9.52v-9.525h-9.526v-9.526h-9.525v-19.046h-9.52v-19.046H1V67.669h9.526V48.617h9.52v-9.52h9.525v-9.526h9.526v-9.525h9.52v-9.52h9.526V1H84.714v9.526h9.526v9.52h11.52v-9.52h9.526V1h26.571v9.526h9.526v9.52h9.52v9.525h9.526v9.526h9.525v9.52h9.52V66.67Z"
      fill={isBack ? '#55F263' : '#000'}
      stroke="#55F263"
      strokeWidth={2}
    />
  </svg>
)
