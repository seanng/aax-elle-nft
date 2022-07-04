import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [63, 88]

export const Raindrop = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    initial={{ y: '-600px' }}
    variants={{ fourth: { y: 0 } }}
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path
      d="m6.8 37.218 19.795-33.51a6 6 0 0 1 8.2-2.2 6 6 0 0 1 2.197 2.2l19.794 33.51a31.319 31.319 0 0 1-8.528 45.464A31.278 31.278 0 0 1 3.791 70.029a31.325 31.325 0 0 1 3.01-32.81Z"
      fill="#00EAFF"
    />
  </motion.svg>
)
