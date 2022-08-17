import { classNames } from 'utils/helpers'
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
        <ButtonSvg />
        <div className="absolute flex w-full top-2 left-3 items-center">
          <Image
            layout="fixed"
            width={24}
            height={24}
            src="/images/taiwan-spca-dog-icon.png"
          />
          <p className="text-lime ml-3 leading-150%">
            認識SPCA台灣防止虐待動物協會
          </p>
        </div>
      </button>
    </a>
  )
}

const ButtonSvg = ({ height = 44, width = 300, ...props }) => (
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
