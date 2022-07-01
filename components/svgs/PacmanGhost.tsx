const [width, height] = [199, 179]

export const PacmanGhost = (props) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M111.866 165.118a38.065 38.065 0 0 0 25.648-19.546 38.057 38.057 0 0 0 60.499-38.058l-6.929-31.852a39.248 39.248 0 0 0-1.861-6.206C175.055 21.678 126.035-8.003 76.601 2.753A96.385 96.385 0 0 0 1.83 110.1c.078 2.158.355 4.304.827 6.412l6.93 31.852a37.959 37.959 0 0 0 32.069 29.71 37.961 37.961 0 0 0 38.771-20.195 37.858 37.858 0 0 0 31.439 7.239Z"
      fill="#3D3A39"
    />
    <path
      d="M138.693 97.956c17.362-3.754 28.394-20.871 24.64-38.233-3.754-17.362-20.871-28.394-38.233-24.64-17.362 3.754-28.394 20.872-24.64 38.233 3.754 17.362 20.871 28.394 38.233 24.64Z"
      fill="#EDFA00"
    />
    <path
      d="M149.527 66.61c.172-9.823-7.652-17.925-17.474-18.096-9.823-.172-17.924 7.652-18.096 17.474-.171 9.823 7.652 17.924 17.475 18.096 9.822.171 17.924-7.652 18.095-17.475Z"
      fill="#55F263"
    />
    <path
      d="M58.264 115.392c17.362-3.754 28.393-20.872 24.64-38.234-3.754-17.362-20.872-28.393-38.234-24.64-17.362 3.754-28.394 20.872-24.64 38.234 3.754 17.362 20.872 28.393 38.234 24.64Z"
      fill="#221714"
    />
    <path
      d="M69.11 84.07c.17-9.823-7.653-17.925-17.475-18.096-9.823-.172-17.924 7.652-18.096 17.474-.171 9.823 7.652 17.924 17.475 18.096 9.822.171 17.924-7.652 18.095-17.475Z"
      fill="#fff"
    />
  </svg>
)
