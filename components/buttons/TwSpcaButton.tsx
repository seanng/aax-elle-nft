import Image from 'next/image'

export const TwSpcaButton = ({ className = '', ...props }) => {
  return (
    <a
      href="https://www.spca.org.tw"
      target="_blank"
      className={className}
      rel="noreferrer"
    >
      <button className="relative" type="button" {...props}>
        <ButtonSvgMobile className="md:hidden" />
        <ButtonSvgDesktop className="hidden md:block" />
        {/* MOBILE */}
        <div className="absolute md:hidden flex w-full top-2 left-3 items-center">
          <Image
            layout="fixed"
            width={24}
            height={24}
            src="/images/taiwan-spca-dog-icon.png"
          />
          <p className="text-lime ml-3 text-sm leading-150%">
            Taiwan SPCA 台灣防止虐待動物協會
          </p>
        </div>
        {/* DESKTOP */}
        <div className="hidden md:absolute md:flex w-full top-1 left-4 items-center">
          <Image
            layout="fixed"
            width={40}
            height={40}
            src="/images/taiwan-spca-dog-icon.png"
          />
          <p className="text-lime ml-5 text-lg leading-150%">
            Taiwan SPCA 台灣防止虐待動物協會
          </p>
        </div>
      </button>
    </a>
  )
}

const ButtonSvgDesktop = ({ width = 408, height = 64, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 408 64`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path stroke="#55F263" d="M.5.5h395v51H.5z" />
    <path
      fill="#55F263"
      d="M4 52h2v6H4zM6 52h2v8H6zM8 52h2v10H8zM2 52h2v4H2zM0 52h2v2H0zM10 52h398v12H10zM396 10h12v42h-12zM396 8h10v2h-10zM396 4h6v2h-6zM396 6h8v2h-8zM396 0h2v2h-2zM396 2h4v2h-4z"
    />
  </svg>
)

const ButtonSvgMobile = ({ height = 44, width = 300, ...props }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 300 44`}
    {...props}
  >
    <path fill="#000" stroke="#55F263" d="M.5.5h295v39H.5z" />
    <path
      fill="#55F263"
      d="M295 5h5v39h-5zM5 39h290v5H5zM295 2.001h2.999v1H295z"
    />
    <path
      fill="#55F263"
      d="M295 3h3.999v1H295zM295 4h4.999v1H295zM295 0h1v1h-1z"
    />
    <path fill="#55F263" d="M295 .999h1.999v1H295zM5 41.999H2v-1h3z" />
    <path fill="#55F263" d="M5 41H1v-1h4zM5 40H0v-1h5zM5 44.001H4v-1h1z" />
    <path fill="#55F263" d="M5 43.002H3v-1h2z" />
  </svg>
)
