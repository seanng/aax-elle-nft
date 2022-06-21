import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [40, 40]

export const PacManSmall = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    {...getWidthHeightPercentages(width, height, 414, 174)}
    {...props}
  >
    <path
      d="M23.147.365A19.638 19.638 0 1 1 .007 21.094a2.182 2.182 0 0 1 2.296-2.355l17.284.92.976-17.284a2.125 2.125 0 0 1 2.584-2.01Z"
      fill="#EDFA00"
    />
    <path
      d="M27.798 12.02a3.273 3.273 0 0 0-.919 4.594 3.332 3.332 0 0 0 4.651.919 3.388 3.388 0 0 0 .861-4.651 3.33 3.33 0 0 0-4.593-.861Z"
      fill="#000"
    />
  </motion.svg>
)
