import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [1064, 636]

export const IntroWhiteScreen = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path d="m5 114 52.6 392.4 955.2 129.3L1059.2 5 5 114Z" fill="#fff" />
    <path
      d="M4.9 111.6 1059.1 4.9"
      stroke="url(#a)"
      strokeWidth={9}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <path
      d="m61 507.1 929.2 122.1"
      stroke="url(#b)"
      strokeWidth={9}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="a"
        x1={0.43}
        y1={58.28}
        x2={1063.57}
        y2={58.28}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56CA42" />
        <stop offset={1} stopColor="#CEFF00" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={56.55}
        y1={568.13}
        x2={994.73}
        y2={568.13}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#56CA42" />
        <stop offset={1} stopColor="#CEFF00" />
      </linearGradient>
    </defs>
  </motion.svg>
)
