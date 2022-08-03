import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [144, 190]

export const BowlingStick = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    initial={{ opacity: 0 }}
    variants={{ second: { opacity: 1, transition: { duration: 0.5 } } }}
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path
      d="M73.852 189.212a10.79 10.79 0 0 1-7.844-2.554 10.804 10.804 0 0 1-3.753-7.349l-5.498-72.121a10.812 10.812 0 0 1 2.297-8.228 10.798 10.798 0 0 1 11.877-3.445 10.795 10.795 0 0 1 6.339 5.723c.612 1.335.946 2.781.98 4.249l5.5 72.122a10.71 10.71 0 0 1-2.521 7.875 10.696 10.696 0 0 1-7.377 3.728Z"
      fill="#C9BC9C"
    />
    <path
      d="M131.335 53.372a7.393 7.393 0 0 0-4.498-1.5v.7a53.879 53.879 0 0 1-.9 15.604c.2.1.3.3.5.5h-.6c-8.198 1.1-27.992-.3-56.184-8.902-28.192-8.603-45.387-18.506-51.485-24.007-.2-.2-.4-.3-.5-.5h.7a56.228 56.228 0 0 1 6.098-11.004 7.3 7.3 0 0 0-7.598-3.9c-8.597 1.1-13.796 4.5-15.495 10.002-2.8 8.903 5.998 16.705 12.896 21.406l5.798 3.601c11.597 6.802 27.692 13.504 45.187 18.806 17.495 5.302 34.59 8.803 47.987 9.703l6.798.2h4.398c7.598-.6 16.096-2.901 18.295-10.403 2.999-9.903-7.798-17.805-11.397-20.306Z"
      fill="#F6F"
    />
    <path
      d="M65.254 74.178c-17.495-5.302-33.59-12.003-45.187-18.805l-5.798-3.601a60.155 60.155 0 0 0-.1 9.502 56.533 56.533 0 0 0 13.766 32.844 56.458 56.458 0 0 0 66.05 14.229 56.499 56.499 0 0 0 26.054-24.266l-6.798-.2c-13.397-.9-30.492-4.301-47.987-9.703Z"
      fill="#3E3A39"
    />
    <path
      d="M126.837 51.872a56.538 56.538 0 0 0-12.998-31.305A56.48 56.48 0 0 0 85.277 2.335a56.453 56.453 0 0 0-33.85 1.4 56.487 56.487 0 0 0-26.96 20.529c.415.778.686 1.625.799 2.5 0 .3.1.5.1.8 0 .3-.1-.5-.1-.8a7.305 7.305 0 0 0-.8-2.5 56.227 56.227 0 0 0-6.098 11.003c-.1.2-.1.4-.2.6 6.098 5.502 23.293 15.405 51.485 24.007 28.192 8.602 47.986 10.003 56.184 8.903a1.3 1.3 0 0 1 .1-.6 53.878 53.878 0 0 0 .9-15.605v-.7Z"
      fill="#53493A"
    />
    <path
      d="M82.05 16.761a5.321 5.321 0 0 1-2.902 5.145 5.31 5.31 0 0 1-7.139-2.346 5.32 5.32 0 0 1-.556-1.998 5.404 5.404 0 0 1 4.898-5.702 5.297 5.297 0 0 1 5.699 4.901ZM74.052 31.866a5.304 5.304 0 0 1-2.825 5.183 5.296 5.296 0 0 1-7.543-3.233 5.305 5.305 0 0 1 1.8-5.622 5.296 5.296 0 0 1 2.87-1.13 5.198 5.198 0 0 1 5.698 4.802ZM92.247 30.465a5.303 5.303 0 0 1-6.943 5.454 5.198 5.198 0 0 1-3.554-4.653 5.104 5.104 0 0 1 4.798-5.602 5.196 5.196 0 0 1 5.699 4.801Z"
      fill="#fff"
    />
  </motion.svg>
)