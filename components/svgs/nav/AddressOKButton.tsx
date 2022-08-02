const width = 126
const height = 37

export const AddressOKButton = (props) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${width} ${height}`}
    {...props}
  >
    <path
      fill="#55F263"
      d="M119.803 1H126v30h-6.197zM1.033 31H126v6H1.033zM0 31h1.033v5H0zM119.803 0h5.164v1h-5.164z"
    />
    <path fill="#EDFA00" d="M0 0h124.967v36H0z" />
    <path fill="#000" d="M6 27h25v3H6zM6 13h25v3H6zM21 7h3v3h-3z" />
    <path
      fill="#000"
      d="M24 7h3v9h-3zM18 8h3v3h-3zM15 9h3v3h-3zM12 10h3v3h-3zM9 11h3v5H9zM6 15h3v13H6zM28 15h3v13h-3z"
    />
  </svg>
)
