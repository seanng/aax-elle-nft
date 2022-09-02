// import { motion } from 'framer-motion'

const [width, height] = [35, 21]

export const GreenDialog = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    {...props}
  >
    <path
      d="M27.275 0H7.752A7.752 7.752 0 0 0 0 7.752v2.87a7.982 7.982 0 0 0 1.436 4.48L.23 20.04a.345.345 0 0 0 .516.344l4.25-2.526c.884.32 1.815.495 2.756.517h19.523a7.695 7.695 0 0 0 7.694-7.752V7.752A7.752 7.752 0 0 0 27.275 0Z"
      fill="#55F263"
    />
    <path
      d="M7.866 9.015a2.068 2.068 0 0 1 2.067-2.01 2.067 2.067 0 0 1 0 4.077 2.067 2.067 0 0 1-2.067-2.067ZM15.33 9.015a2.01 2.01 0 0 1 2.01-2.01 2.068 2.068 0 1 1 0 4.077 2.009 2.009 0 0 1-2.01-2.067ZM22.738 9.015a2.067 2.067 0 0 1 2.067-2.01 2.068 2.068 0 0 1 0 4.077 2.067 2.067 0 0 1-2.067-2.067Z"
      fill="#000"
    />
  </svg>
)