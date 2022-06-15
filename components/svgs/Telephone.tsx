import { motion } from 'framer-motion'
import { getWidthHeightPercentages } from 'utils/helpers'

const [width, height] = [483, 176]

export const Telephone = (props) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox={`0 0 ${width} ${height}`}
    {...getWidthHeightPercentages(width, height)}
    {...props}
  >
    <path
      d="M262.67 144.957a1.986 1.986 0 0 1 .1-.701 3 3 0 0 1 3.499-2.3 43.875 43.875 0 0 0 18.095-.3c-5.799-7.302-8.498-16.205-6.698-25.008l.3-1.6a17.405 17.405 0 0 1 7.395-11.007 17.388 17.388 0 0 1 12.999-2.597 17.392 17.392 0 0 1 11 7.4 17.414 17.414 0 0 1 2.596 13.006l-.3 1.6c-1.8 8.903-7.798 16.105-16.195 20.506a39.565 39.565 0 0 0 16.295 7.102 40.858 40.858 0 0 0 18.095-.2c-6.099-7.602-8.498-16.504-6.698-25.107l.3-1.6a17.35 17.35 0 0 1 7.416-11.014 17.33 17.33 0 0 1 13.028-2.54 17.342 17.342 0 0 1 11.007 7.42 17.363 17.363 0 0 1 2.539 13.036l-.3 1.6c-1.8 8.603-7.498 15.805-16.296 20.406a39.589 39.589 0 0 0 16.296 7.202 3.004 3.004 0 0 1 1.924 1.253 2.99 2.99 0 0 1 .475 2.248 3 3 0 0 1-3.599 2.401 45.683 45.683 0 0 1-21.394-10.403 48.453 48.453 0 0 1-23.993 1.3 47.179 47.179 0 0 1-21.394-10.403 48.444 48.444 0 0 1-24.093 1.2 3.002 3.002 0 0 1-2.399-2.9Zm43.587-26.808a11.405 11.405 0 0 0-8.997-10.803 11.492 11.492 0 0 0-13.396 8.902l-.3 1.601c-1.5 7.702 1.3 15.504 6.898 21.706 7.898-3.501 13.796-9.603 15.296-17.305l.3-1.6a6.916 6.916 0 0 0 .199-2.501Zm45.487 9.202a11.306 11.306 0 0 0-2.999-7.557 11.292 11.292 0 0 0-15.105-1.349 11.304 11.304 0 0 0-4.289 6.906l-.3 1.6c-1.4 7.002.6 14.205 5.798 20.506.419.387.789.823 1.1 1.301l1.699-.801c7.298-3.701 12.197-9.602 13.497-16.504l.399-1.601c.117-.829.183-1.664.2-2.501Z"
      fill="#53493A"
    />
    <path
      d="M307.457 154.059a1.507 1.507 0 0 1 .1-.7 2.998 2.998 0 0 1 3.499-2.401 40.759 40.759 0 0 0 18.095-.3c-5.998-7.602-8.398-16.404-6.698-25.007l.3-1.6a17.505 17.505 0 0 1 7.455-11.014 17.487 17.487 0 0 1 13.039-2.59 17.895 17.895 0 0 1 10.997 7.402 17.313 17.313 0 0 1 2.599 13.104l-.4 1.5c-1.799 8.903-7.798 16.105-16.195 20.506a40.865 40.865 0 0 0 16.295 7.202 42.36 42.36 0 0 0 18.095-.3c-5.798-7.302-8.498-16.205-6.698-25.007l.3-1.601a16.694 16.694 0 0 1 7.398-11.003 17.196 17.196 0 0 1 12.996-2.601 16.7 16.7 0 0 1 10.997 7.402 17.12 17.12 0 0 1 2.599 13.004l-.3 1.601c-1.699 8.602-7.498 15.804-16.295 20.506a40.689 40.689 0 0 0 16.395 7.102 3 3 0 0 1 2.299 3.601 2.902 2.902 0 0 1-2.337 2.328c-.385.069-.78.06-1.162-.028a46.565 46.565 0 0 1-21.493-10.403 47.254 47.254 0 0 1-23.994 1.301 46.688 46.688 0 0 1-21.393-10.403 46.966 46.966 0 0 1-23.993 1.2 3 3 0 0 1-2.5-2.801Zm43.688-26.808a11.306 11.306 0 0 0-9.098-10.803 11.19 11.19 0 0 0-8.488 1.619 11.196 11.196 0 0 0-4.808 7.184l-.4 1.6c-1.399 6.902.7 14.204 5.898 20.506l1.1 1.201c7.898-3.501 13.696-9.603 15.196-17.205l.3-1.601c.192-.82.293-1.658.3-2.501Zm45.387 9.103a10.915 10.915 0 0 0-1.9-6.002 11.302 11.302 0 0 0-5.077-4.18 11.303 11.303 0 0 0-6.544-.643 11.301 11.301 0 0 0-8.873 8.925l-.3 1.5c-1.599 7.802 1.2 15.605 6.998 21.806l1.6-.8c7.298-3.701 12.196-9.603 13.596-16.505l.3-1.6c.165-.823.232-1.662.2-2.501ZM172.396 126.752c-.015-.205.02-.411.1-.6a2.99 2.99 0 0 1 1.288-1.968 2.999 2.999 0 0 1 2.311-.433 40.773 40.773 0 0 0 18.095-.3c-5.899-7.302-8.598-16.205-6.798-25.007l.3-1.601a17.902 17.902 0 0 1 7.398-11.003 17.387 17.387 0 0 1 25.714 7.851 17.419 17.419 0 0 1 .978 10.054l-.4 1.5c-1.7 8.903-7.798 16.105-16.195 20.506a40.983 40.983 0 0 0 16.295 7.203 42.36 42.36 0 0 0 18.095-.301c-5.799-7.302-8.498-16.204-6.698-25.107l.3-1.5a17.34 17.34 0 0 1 7.381-11.029 17.323 17.323 0 0 1 24.034 4.81 17.352 17.352 0 0 1 2.575 13.021l-.3 1.6c-1.7 8.603-7.498 15.805-16.295 20.406a40.874 40.874 0 0 0 16.395 7.202 3.011 3.011 0 0 1-1.2 5.902 45.772 45.772 0 0 1-21.394-10.403 47.66 47.66 0 0 1-24.093 1.3 46.181 46.181 0 0 1-21.394-10.403 46.954 46.954 0 0 1-23.993 1.201 3.207 3.207 0 0 1-2.499-2.901Zm43.688-26.708a11.505 11.505 0 0 0-9.098-10.903 11.087 11.087 0 0 0-8.497 1.7 11.29 11.29 0 0 0-4.799 7.202l-.4 1.6c-1.5 7.703 1.3 15.505 6.998 21.707 7.898-3.501 13.696-9.603 15.196-17.305l.3-1.5c.192-.82.293-1.659.3-2.501Zm45.387 9.103a11.314 11.314 0 0 0-3-7.558 11.293 11.293 0 0 0-19.394 5.557l-.3 1.601c-1.6 7.802 1.2 15.604 6.998 21.806l1.599-.8c7.398-3.701 12.197-9.603 13.597-16.505l.299-1.601c.166-.822.233-1.662.201-2.5Z"
      fill="#53493A"
    />
    <path
      d="M398.331 172.265v-.6c.071-.398.222-.777.444-1.115a2.994 2.994 0 0 1 3.155-1.286 33.167 33.167 0 0 0 25.093-4.901 33.716 33.716 0 0 0 14.296-21.306l9.297-46.314a2.89 2.89 0 0 1 1.259-1.897 2.898 2.898 0 0 1 2.24-.404 3 3 0 0 1 2.399 3.502l-9.297 46.313a39.51 39.51 0 0 1-16.85 25.08 39.472 39.472 0 0 1-29.637 5.829 3.002 3.002 0 0 1-2.399-2.901ZM473.071 45.82c5.293-4.169 6.207-11.841 2.042-17.138-4.166-5.296-11.834-6.211-17.127-2.043-5.294 4.168-6.208 11.84-2.043 17.137 4.166 5.296 11.834 6.211 17.128 2.043Z"
      fill="#53493A"
    />
    <path
      d="M451.016 106.045a12.202 12.202 0 0 1-8.792-16.69 12.198 12.198 0 0 1 11.312-7.468 12.19 12.19 0 0 1 11.224 7.6c.91 2.236 1.137 4.691.652 7.056a12.118 12.118 0 0 1-5.208 7.769 12.091 12.091 0 0 1-9.188 1.733Z"
      fill="#53493A"
    />
    <path
      d="m465.095 96.237 11.915-59.128-11.133-2.246-11.915 59.128 11.133 2.246Z"
      fill="#53493A"
    />
    <path
      d="M455.115 96.643a1.6 1.6 0 0 1-1.2-1.8 1.601 1.601 0 0 1 1.8-1.3 1.51 1.51 0 0 1 1.027.68c.114.179.188.38.217.591.03.21.015.425-.045.629a1.5 1.5 0 0 1-1.799 1.2ZM451.516 93.142a1.603 1.603 0 0 1-1.3-1.8 1.493 1.493 0 0 1 1.271-1.246c.211-.03.425-.014.629.045a1.497 1.497 0 0 1 1.199 1.8 1.599 1.599 0 0 1-1.799 1.2ZM450.416 98.443a1.6 1.6 0 0 1-1.199-1.8 1.6 1.6 0 0 1 1.799-1.3 1.498 1.498 0 0 1 1.245 1.27c.029.211.014.426-.045.63a1.502 1.502 0 0 1-1.8 1.2ZM467.111 36.926a1.502 1.502 0 0 1-1.199-1.8 1.502 1.502 0 0 1 1.799-1.201 1.597 1.597 0 0 1 1.3 1.8 1.598 1.598 0 0 1-1.9 1.2ZM463.513 33.525a1.498 1.498 0 0 1-1.245-1.272c-.03-.21-.015-.425.045-.629a1.49 1.49 0 0 1 1.2-1.21c.198-.037.402-.034.599.01a1.6 1.6 0 0 1 1.2 1.8 1.602 1.602 0 0 1-1.799 1.3ZM462.413 38.726a1.599 1.599 0 0 1-1.2-1.8 1.502 1.502 0 0 1 1.8-1.201 1.598 1.598 0 0 1 1.299 1.8 1.6 1.6 0 0 1-1.899 1.2Z"
      fill="#fff"
    />
    <path
      d="M81.722 76.137a10.591 10.591 0 0 1-6.633-4.692 10.608 10.608 0 0 1-1.365-8.012L86.221 8.417A10.62 10.62 0 0 1 94.779.303a10.605 10.605 0 0 1 10.766 4.806 10.615 10.615 0 0 1 1.37 8.01L94.418 68.135a10.605 10.605 0 0 1-8.556 8.117 10.59 10.59 0 0 1-4.14-.115ZM122.31 85.34a10.596 10.596 0 0 1-8.113-8.563 10.6 10.6 0 0 1 .116-4.142l12.496-55.016a10.628 10.628 0 0 1 4.692-6.632 10.61 10.61 0 0 1 8.005-1.37 10.607 10.607 0 0 1 6.628 4.694 10.615 10.615 0 0 1 1.369 8.01l-12.496 55.016a10.602 10.602 0 0 1-12.697 8.002Z"
      fill="#F6F"
    />
    <path
      d="m126.109 23.722-24.493-5.602a23.278 23.278 0 0 0-19.994 4.901L8.742 85.14a23.008 23.008 0 0 0-7.388 22.976 23.006 23.006 0 0 0 17.186 16.936L158.7 156.76a22.883 22.883 0 0 0 22.998-8.072 22.914 22.914 0 0 0 2.694-24.237l-42.687-88.326a22.806 22.806 0 0 0-15.596-12.403Z"
      fill="#BC76AE"
    />
    <path
      d="M133.207 70.935a27.113 27.113 0 0 1-7.779 13.686 27.087 27.087 0 0 1-29.682 5.09 27.097 27.097 0 0 1-11.89-10.314 27.12 27.12 0 0 1 .825-30.12 27.077 27.077 0 0 1 28.132-10.75 27.091 27.091 0 0 1 16.896 11.983 27.116 27.116 0 0 1 3.498 20.425Z"
      fill="#fff"
    />
    <path
      d="M120.111 67.934a13.71 13.71 0 0 1-3.905 6.95 13.692 13.692 0 0 1-21.048-2.58 13.71 13.71 0 0 1 6.707-20.129 13.69 13.69 0 0 1 7.949-.545 13.594 13.594 0 0 1 8.535 6.01 13.62 13.62 0 0 1 1.762 10.294Z"
      fill="#F6F"
    />
    <path
      d="M119.311 136.554a1.907 1.907 0 0 1-1.285-.865 1.897 1.897 0 0 1-.214-1.536 1.998 1.998 0 0 1 2.399-1.6 2.202 2.202 0 0 1 1.599 2.501 2.097 2.097 0 0 1-2.499 1.5ZM121.311 127.652a2.102 2.102 0 0 1-1.5-2.5 1.905 1.905 0 0 1 .865-1.287 1.893 1.893 0 0 1 1.534-.214 2.098 2.098 0 0 1 1.6 2.401 2.097 2.097 0 0 1-2.499 1.6ZM108.214 134.054a2.2 2.2 0 0 1-1.599-2.501 2.098 2.098 0 0 1 3.783-.643c.301.454.415 1.008.316 1.543a2.2 2.2 0 0 1-2.5 1.601ZM110.214 125.151a2.102 2.102 0 0 1-1.5-2.5 1.907 1.907 0 0 1 1.61-1.558c.264-.036.533-.017.79.057a2.1 2.1 0 0 1 1.599 2.401 2.201 2.201 0 0 1-2.499 1.6ZM97.517 131.653a2.098 2.098 0 0 1-1.499-2.501 1.901 1.901 0 0 1 2.4-1.5 2.1 2.1 0 0 1 1.599 2.401 2.2 2.2 0 0 1-2.5 1.6ZM99.517 122.751a2.1 2.1 0 0 1-1.5-2.501 2 2 0 0 1 2.5-1.5 1.891 1.891 0 0 1 1.285.865 1.891 1.891 0 0 1 .214 1.535 2.1 2.1 0 0 1-2.5 1.601ZM86.42 129.153a2.104 2.104 0 0 1-1.531-2.486 2.104 2.104 0 0 1 2.431-1.616 2.101 2.101 0 0 1-.9 4.102ZM88.42 120.149a1.888 1.888 0 0 1-1.286-.865 1.895 1.895 0 0 1-.213-1.535 2.102 2.102 0 0 1 2.399-1.601 2.2 2.2 0 0 1 1.6 2.501 2.102 2.102 0 0 1-2.5 1.5ZM75.724 126.651a1.888 1.888 0 0 1-1.286-.865 1.902 1.902 0 0 1-.214-1.535 2.102 2.102 0 0 1 2.4-1.601 2.2 2.2 0 0 1 1.599 2.501 2.102 2.102 0 0 1-2.5 1.5ZM77.823 117.749a1.991 1.991 0 0 1-1.612-1.601 2.002 2.002 0 0 1 .013-.8 2.202 2.202 0 0 1 2.499-1.6 2.099 2.099 0 0 1 1.5 2.501 1.903 1.903 0 0 1-2.4 1.5ZM64.627 124.151a1.888 1.888 0 0 1-1.286-.865 1.9 1.9 0 0 1-.214-1.535 2.102 2.102 0 0 1 2.4-1.601 2.2 2.2 0 0 1 1.6 2.501 2.102 2.102 0 0 1-2.5 1.5ZM66.626 115.248a2.003 2.003 0 0 1-1.558-1.692 2.002 2.002 0 0 1 .059-.809 1.896 1.896 0 0 1 1.61-1.557c.264-.037.533-.018.79.057a2 2 0 0 1 1.599 2.5 2.099 2.099 0 0 1-2.5 1.501Z"
      fill="#EDFA00"
    />
  </motion.svg>
)
