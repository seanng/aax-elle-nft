import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [240, 355]

export const HushHandSign = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path
      d="M226.1 147a38.197 38.197 0 0 0-53.9 3.6l-39.9 45.6v-22.6H70.1V53.3a34.2 34.2 0 0 0-5.2-18.2C58.3 20.4 43.1 3.2 8.5 1A7.3 7.3 0 0 0 .9 8.2V180a34.5 34.5 0 0 0 23 32.6v109a32.602 32.602 0 0 0 32.6 32.6h9.2a66.606 66.606 0 0 0 54.1-27.8l109.9-125.5a38.2 38.2 0 0 0-3.6-53.9Z"
      fill="#D3CAB2"
    />
    <path
      d="M35.1 142.8A34.199 34.199 0 0 0 .9 177v26.2h189.5V177a34.2 34.2 0 0 0-34.2-34.2H35.1Z"
      fill="#EAE5DA"
    />
    <path
      d="M159.001 169.4h-123.6a34.406 34.406 0 0 0-24.425 10.075A34.407 34.407 0 0 0 .9 203.9v90.9a59.4 59.4 0 0 0 59.4 59.4h6.9v-.4c29.5-3.5 52.399-29.8 52.399-61.9 0-32.1-22.9-58.4-52.4-61.9v-.3h62.9v31.5c0 3.795.748 7.553 2.2 11.06a28.914 28.914 0 0 0 15.641 15.64 28.886 28.886 0 0 0 11.06 2.2 31.4 31.4 0 0 0 31.4-31.4v-57.9a31.403 31.403 0 0 0-31.4-31.4Z"
      fill="#F4E827"
    />
  </motion.svg>
)
