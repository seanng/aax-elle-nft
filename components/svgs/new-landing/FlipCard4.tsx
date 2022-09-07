export const FlipCard4 = ({
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
      d="M189.474 28.571v1H199V141.857h-9.526v19.046H103.76v9.526h-9.52v9.525h-9.526v9.52H75.19V199H39.097V160.903H10.526v-19.046H1V29.571h9.526V10.526H29.57V1H170.43v9.526h19.045V28.57Z"
      fill={isBack ? '#FF6216' : '#000'}
      stroke="#FF6216"
      strokeWidth={2}
    />
  </svg>
)
