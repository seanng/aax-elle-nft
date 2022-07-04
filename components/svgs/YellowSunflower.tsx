import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [155, 142]

export const YellowSunflower = (props) => (
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
      d="M20.161 70.569 8.864 60.666A25.207 25.207 0 0 1 .267 41.661c0-10.103 6.098-20.406 18.594-24.708a21.982 21.982 0 0 1 21.694 4.302l8.098 7.102A28.415 28.415 0 0 1 57.28 8.848a28.383 28.383 0 0 1 19.765-8h.4a28.383 28.383 0 0 1 19.764 8 28.41 28.41 0 0 1 8.627 19.509l8.098-7.102a21.989 21.989 0 0 1 21.694-4.302c12.496 4.302 18.595 14.605 18.595 24.707a25.205 25.205 0 0 1-8.598 19.006l-11.297 9.903 11.997 11.403a25.314 25.314 0 0 1 7.898 18.306c0 10.403-6.399 20.906-19.395 24.907a21.98 21.98 0 0 1-21.694-5.102l-7.298-6.902a28.315 28.315 0 0 1-8.462 19.794 28.277 28.277 0 0 1-19.93 8.114h-.4a28.277 28.277 0 0 1-19.929-8.114 28.315 28.315 0 0 1-8.462-19.794l-7.298 6.902a21.988 21.988 0 0 1-21.694 5.102C6.665 121.184.267 110.681.267 100.278a24.92 24.92 0 0 1 7.897-18.306L20.161 70.57Z"
      fill="#EDFA00"
    />
    <path
      d="M103.934 81.04c5.414-14.489-1.936-30.626-16.416-36.043-14.481-5.417-30.609 1.937-36.023 16.426-5.414 14.489 1.936 30.626 16.417 36.043 14.48 5.417 30.608-1.937 36.022-16.426Z"
      fill="#000"
    />
  </motion.svg>
)
