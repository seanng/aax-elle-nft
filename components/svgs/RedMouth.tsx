import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [669, 418]

export const RedMouth = (props) => (
  <motion.svg
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: props.animate ? 0.5 : 1 }}
    variants={{ first: { scale: 1 } }}
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path
      d="M498.553 39.601c-2.1-2.3-4.299-4.601-6.598-6.702l-1.1-1.1A118.929 118.929 0 0 0 413.333.729 118.922 118.922 0 0 0 334.5 28.297 118.924 118.924 0 0 0 255.667.728a118.929 118.929 0 0 0-77.522 31.07v-.2l-2.2 2.201-3.399 3.401L.996 207.55 170.547 379a76.979 76.979 0 0 0 6.598 6.602l1 1.1c21.194 19.306 56.983 31.109 103.77 31.109h108.869c49.286 0 78.977-11.803 100.071-31.109v.2l2.299-2.2 3.399-3.401 171.451-170.25-169.451-171.45Z"
      fill="#FF003A"
    />
    <path
      d="m360.392 167.538-.999-1-.2-.2a18.687 18.687 0 0 0-12.597-4.901 19.084 19.084 0 0 0-12.096 4.401 18.588 18.588 0 0 0-11.997-4.401 19.084 19.084 0 0 0-12.696 4.901l-.3.4-.6.5-26.992 26.908 26.692 27.008 1.1 1.1h.1a18.585 18.585 0 0 0 12.696 4.902h1.7c6.88-.7 13.814-.7 20.694 0h1.699a18.189 18.189 0 0 0 12.597-4.902l.4-.4.499-.5 27.093-26.908-26.793-26.908Z"
      fill="#000"
    />
  </motion.svg>
)
