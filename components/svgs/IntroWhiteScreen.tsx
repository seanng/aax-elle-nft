import { motion } from 'framer-motion'

const [width, height] = [1006, 698]

export const IntroWhiteScreen = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
    {...props}
  >
    <path
      d="m.4 69.264 48.606 498.784 883.602 123.067L1005 6.593.4 69.263Z"
      fill="#fff"
    />
    <path
      d="M.4 66.265 1005 6.593M52.316 569.083l880.292 122.032"
      stroke="#55F263"
      strokeWidth={12}
      strokeMiterlimit={10}
    />
  </motion.svg>
)
