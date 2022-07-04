import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [141, 126]

export const GreenBeard = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    initial={{ opacity: 0 }}
    variants={{ second: { opacity: 1 } }}
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path
      d="M133.774 71.772 122.777 61.37h-.1a69.144 69.144 0 0 0 17.795-46.513 15.81 15.81 0 0 0-5.03-10.355 15.79 15.79 0 0 0-21.432 0 15.809 15.809 0 0 0-5.029 10.355 38.224 38.224 0 0 1-11.185 27.02 38.178 38.178 0 0 1-27.004 11.191 38.178 38.178 0 0 1-27.004-11.192 38.222 38.222 0 0 1-11.185-27.02 15.808 15.808 0 0 0-5.03-10.354 15.79 15.79 0 0 0-21.432 0 15.808 15.808 0 0 0-5.03 10.355 69.643 69.643 0 0 0 17.796 46.513h-.1L7.91 71.772A22.807 22.807 0 0 0 .712 88.477c0 9.503 5.898 19.006 17.695 22.707a19.883 19.883 0 0 0 19.694-4.701l6.698-6.302a25.915 25.915 0 0 0 7.688 18.026 25.881 25.881 0 0 0 18.105 7.481h.4a25.886 25.886 0 0 0 18.169-7.446 25.915 25.915 0 0 0 7.723-18.061l6.598 6.302a19.99 19.99 0 0 0 19.795 4.701c11.796-3.701 17.595-13.204 17.595-22.707a23.12 23.12 0 0 0-7.098-16.705Z"
      fill="#55F263"
    />
  </motion.svg>
)
