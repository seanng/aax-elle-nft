import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [260, 392]

export const HushHandSign = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path
      d="M245.342 159.512a41.461 41.461 0 0 0-45.744-5.987 41.497 41.497 0 0 0-12.839 9.888l-43.487 49.614V188.42H75.591V57.582a37.227 37.227 0 0 0-5.598-19.806C62.795 21.772 46.299 3.066 8.71.666a7.794 7.794 0 0 0-7.66 4.696 7.806 7.806 0 0 0-.638 3.106v186.954a37.725 37.725 0 0 0 6.916 21.739 37.697 37.697 0 0 0 18.177 13.772v118.534a35.429 35.429 0 0 0 10.33 25.104 35.385 35.385 0 0 0 25.06 10.406h9.997a72.542 72.542 0 0 0 33.098-8.043 72.59 72.59 0 0 0 25.785-22.265l119.466-136.54a41.526 41.526 0 0 0-3.899-58.617Z"
      fill="#fff"
    />
    <path
      d="M37.602 154.91a37.176 37.176 0 0 0-26.332 10.934A37.215 37.215 0 0 0 .412 192.221v28.408h215.239v-28.408a37.324 37.324 0 0 0-10.922-26.383 37.28 37.28 0 0 0-26.368-10.928H37.601Z"
      fill="#DFD7C4"
    />
    <path
      d="M181.461 183.819H37.901a37.477 37.477 0 0 0-26.544 11.022A37.512 37.512 0 0 0 .412 221.43v104.931h.2a70.45 70.45 0 0 0 10.529 31.842 70.398 70.398 0 0 0 24.055 23.358 70.344 70.344 0 0 0 65.034 3.195 70.387 70.387 0 0 0 26.225-20.887 70.438 70.438 0 0 0 13.595-30.657 70.439 70.439 0 0 0-19.472-62.167 69.761 69.761 0 0 0-44.287-20.406v-.2h-3.6a5.015 5.015 0 0 1-.2-1.201v-5.201a6.399 6.399 0 0 1 6.398-6.402h64.682a6.4 6.4 0 0 1 6.399 6.402v39.711a31.518 31.518 0 0 0 9.223 22.281 31.484 31.484 0 0 0 22.268 9.229 34.184 34.184 0 0 0 24.176-10.02 34.22 34.22 0 0 0 10.014-24.19v-63.019a34.22 34.22 0 0 0-10.014-24.19 34.184 34.184 0 0 0-24.176-10.02Z"
      fill="#C6BA9A"
    />
  </motion.svg>
)