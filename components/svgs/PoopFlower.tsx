import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [191, 169]

export const PoopFlower = (props) => (
  <motion.svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path
      d="M99.345 99.073a4.702 4.702 0 0 0 0-6.401L38.062 31.454a4.498 4.498 0 0 0-7.548 4.855 4.5 4.5 0 0 0 1.25 1.447l61.183 61.317a4.697 4.697 0 0 0 6.398 0Z"
      fill="#55F263"
    />
    <path
      d="M56.857 74.866a17.51 17.51 0 0 0 0-24.707 4.523 4.523 0 0 0-7.723 3.2 4.531 4.531 0 0 0 1.325 3.202 8.505 8.505 0 0 1-6.102 14.147 8.494 8.494 0 0 1-5.895-2.144 4.497 4.497 0 0 0-7.186 3.282 4.502 4.502 0 0 0 .888 3.02 17.49 17.49 0 0 0 24.693 0Z"
      fill="#55F263"
    />
    <path
      d="M82.65 64.063a17.51 17.51 0 0 0 0-24.708 4.497 4.497 0 0 0-7.187 3.282 4.503 4.503 0 0 0 .888 3.02 8.506 8.506 0 0 1-.343 11.66 8.495 8.495 0 0 1-11.653.344 4.526 4.526 0 0 0-4.93-.982 4.525 4.525 0 0 0-2.449 5.915c.227.55.56 1.048.98 1.468a17.49 17.49 0 0 0 24.694 0Z"
      fill="#55F263"
    />
    <path
      d="M.673 35.254a11.61 11.61 0 0 0 7.343 10.9 11.59 11.59 0 0 0 4.554.804h.4a11.911 11.911 0 0 0 3.399 8.502 11.595 11.595 0 0 0 8.397 3.401h.1a11.991 11.991 0 0 0 4.699-1 11.491 11.491 0 0 0 5.898 1.5h.1a11.893 11.893 0 0 0 8.398-3.5 12.207 12.207 0 0 0 3.299-8.503v-.3h.1a11.69 11.69 0 0 0 8.436-3.392 11.704 11.704 0 0 0 3.46-8.412 12.01 12.01 0 0 0-1-4.701 13.31 13.31 0 0 0 1.5-6.002 11.71 11.71 0 0 0-3.499-8.402 12.292 12.292 0 0 0-8.597-3.301h-.2C47.36 6.046 42.36.944 35.663.944h-.1a12.89 12.89 0 0 0-4.799 1 12.491 12.491 0 0 0-5.798-1.5h-.1a11.49 11.49 0 0 0-8.397 3.501 11.804 11.804 0 0 0-3.3 8.503v.3h-.1a11.689 11.689 0 0 0-8.472 3.426 11.703 11.703 0 0 0-3.424 8.477 12.91 12.91 0 0 0 1 4.802 11.509 11.509 0 0 0-1.5 5.801Z"
      fill="#EDFA00"
    />
    <path
      d="M22.567 24.452a9.398 9.398 0 0 1 8.338-3.979 9.395 9.395 0 0 1 7.713 5.086 9.407 9.407 0 0 1-3.823 12.53 9.394 9.394 0 0 1-4.63 1.167 10.094 10.094 0 0 1-5.399-1.7 9.403 9.403 0 0 1-2.2-13.104Z"
      fill="#FF6216"
    />
    <path
      d="M172.924 126.282a19.625 19.625 0 0 0 2.699-9.903 19.414 19.414 0 0 0-3.624-11.247 19.393 19.393 0 0 0-9.472-7.059 17.512 17.512 0 0 0-2.91-26.652 17.489 17.489 0 0 0-9.587-2.956h-3.499c.648-4.203.782-8.469.4-12.704a17.424 17.424 0 0 0-6.14-11.832 17.403 17.403 0 0 0-24.53 2.122 17.424 17.424 0 0 0-4.02 12.711c.3 3.501-.2 6.202-1.2 7.302-.999 1.1-4.798 2.3-6.198 2.4h-6.098a17.39 17.39 0 0 0-12.3 5.099A17.41 17.41 0 0 0 81.35 85.87a17.91 17.91 0 0 0 4.899 12.203 19.395 19.395 0 0 0-9.473 7.059 19.413 19.413 0 0 0-3.624 11.247c.005 3.482.937 6.9 2.7 9.903-9.998 2.4-17.396 10.703-17.396 20.506 0 11.803 10.498 21.306 23.594 21.306h84.775c12.997 0 23.594-9.503 23.594-21.306 0-9.803-7.398-18.106-17.495-20.506Z"
      fill="#53493A"
    />
    <path
      d="M156.029 98.873a4.811 4.811 0 0 1-1.12 3.833 4.79 4.79 0 0 1-3.629 1.66 4.785 4.785 0 0 1-1.995-.435 4.794 4.794 0 0 1-2.754-5.058 4.808 4.808 0 0 1 1.12-3.832 4.787 4.787 0 0 1 3.629-1.66 4.796 4.796 0 0 1 4.606 3.454c.193.662.242 1.357.143 2.038Z"
      fill="#fff"
    />
    <path
      d="M151.93 99.574a2.6 2.6 0 0 1-2.7 2.6 2.599 2.599 0 0 1-2.599-2.6 2.704 2.704 0 0 1 1.498-2.96 2.695 2.695 0 0 1 3.235.725 2.707 2.707 0 0 1 .566 2.235Z"
      fill="#000"
    />
    <path
      d="M134.835 98.874a4.804 4.804 0 0 1-2.963 4.436 4.799 4.799 0 0 1-6.269-6.274 4.799 4.799 0 0 1 9.232 1.838Z"
      fill="#fff"
    />
    <path
      d="M130.736 99.473a2.501 2.501 0 0 1-2.699 2.601 2.6 2.6 0 0 1-2.6-2.601 2.704 2.704 0 0 1 1.498-2.96 2.696 2.696 0 0 1 3.768 1.78c.098.386.109.789.033 1.18Z"
      fill="#000"
    />
    <path
      d="M134.735 99.373a3.9 3.9 0 1 1-7.798 0 3.8 3.8 0 0 1 3.899-3.9 3.999 3.999 0 0 1 3.899 3.9Z"
      fill="#fff"
    />
    <path
      d="M134.935 98.873a5.003 5.003 0 0 1-4.949 4.296 4.998 4.998 0 0 1-4.949-4.296 4.998 4.998 0 0 1 4.999-4.901 4.898 4.898 0 0 1 4.899 4.901Z"
      fill="#fff"
    />
    <path
      d="M131.336 100.273a2.701 2.701 0 0 1-2.7 2.701 2.797 2.797 0 0 1-2.699-2.801 2.703 2.703 0 0 1 2.699-2.7 2.797 2.797 0 0 1 2.7 2.8Z"
      fill="#000"
    />
    <path
      d="M155.929 99.474a3.803 3.803 0 0 1-3.899 3.901 3.998 3.998 0 0 1-3.899-3.901 3.904 3.904 0 0 1 3.899-3.901 3.799 3.799 0 0 1 3.899 3.9Z"
      fill="#fff"
    />
    <path
      d="M156.129 98.973a4.899 4.899 0 1 1-9.798 0 4.808 4.808 0 0 1 3.008-4.556 4.799 4.799 0 0 1 1.891-.346 4.799 4.799 0 0 1 4.899 4.902Z"
      fill="#fff"
    />
    <path
      d="M152.63 100.373a2.801 2.801 0 0 1-5.499-.1 2.794 2.794 0 0 1 .635-2.299 2.794 2.794 0 0 1 3.361-.687 2.8 2.8 0 0 1 1.503 3.086Z"
      fill="#000"
    />
  </motion.svg>
)
