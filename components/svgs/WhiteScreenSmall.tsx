import { motion } from 'framer-motion'

const [width, height] = [341, 516]

export const WhiteScreenSmall = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M.179 58.268 22.936 469.07l308.294 44.827L341 2.046.179 58.267Z"
        fill="#fff"
      />
      <path
        d="M.238 59.496 0 55.288 341 0v4.15L.238 59.496ZM331.17 516 23.115 471.875l-.239-4.208L331.29 511.85l-.12 4.15Z"
        fill="#55F263"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h341v516H0z" />
      </clipPath>
    </defs>
  </motion.svg>
)
