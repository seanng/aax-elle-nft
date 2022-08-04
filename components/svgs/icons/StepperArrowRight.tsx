export function StepperArrowRight({
  width = 15,
  height = 26,
  fill = '#000',
  ...props
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill={fill} d="M0 25.5v-5h5v5zM5 20.5v-5h5v5zM10 15.5v-5h5v5z" />
      <path fill={fill} d="M10 15.5v-5h5v5zM5 10.5v-5h5v5zM0 5.5v-5h5v5z" />
    </svg>
  )
}
