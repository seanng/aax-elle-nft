import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [58, 140]

export const Raindrops = (props) => (
  <motion.svg
    fill="none"
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path
      d="M6 34 24.2 3.2a5.5 5.5 0 0 1 9.6 0L51.9 34a28.2 28.2 0 0 1 5.9 17.3 28.801 28.801 0 0 1-56.302 8.58A28.8 28.8 0 0 1 6 34Z"
      fill="#78CBED"
    />
    <path
      d="m6 92.9 18.2-30.7a5.5 5.5 0 0 1 9.6 0l18.1 30.7A28.8 28.8 0 1 1 .2 110.3 29.3 29.3 0 0 1 6 92.9Z"
      fill="#78CBED"
    />
  </motion.svg>
)
