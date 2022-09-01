export const FlipCard3 = ({
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
      d="M189.474 66.669v1H199v93.234h-9.526v9.526h-9.52v9.525h-9.525v9.52h-9.526V199H48.617v-9.526H29.571v-9.52h-9.525v-9.525h-9.52v-9.526H1V67.669h9.526V48.617h9.52V1h26.571v9.526h9.526v9.52h9.526v9.525h68.662v-9.525h9.526v-9.52h9.526V1H179.954V48.617h9.52V66.67Z"
      fill={isBack ? '#EDFA00' : '#000'}
      stroke="#EDFA00"
      strokeWidth={2}
    />
  </svg>
)
