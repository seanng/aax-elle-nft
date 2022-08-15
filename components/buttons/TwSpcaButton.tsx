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
        <div className="absolute flex w-full top-1 left-4 items-center">
          <Image
            layout="fixed"
            width={34}
            height={34}
            src="/images/taiwan-spca-dog-icon.png"
          />
          <div className="block text-left text-lime ml-3">
            <p className="font-mono leading-6">Taiwan SPCA</p>
            <p className="text-sm leading-5">台灣防止虐待動物協會 </p>
          </div>
        </div>
      </button>
    </a>
  )
}

const ButtonSvg = ({ height = 57, width = 224, ...props }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 224 57`}
    {...props}
  >
    <path fill="#000" stroke="#55F263" d="M.5.5h219v52H.5z" />
    <path fill="#55F263" d="M219 4h5v53h-5z" />
    <path fill="#55F263" d="M5 52h215v5H5zM219 2.001h2.999v1H219z" />
    <path
      fill="#55F263"
      d="M219 3h3.999v1H219zM219 4h4.999v1H219zM219 0h1v1h-1z"
    />
    <path fill="#55F263" d="M219 .999h1.999v1H219zM5 54.999H2v-1h3z" />
    <path fill="#55F263" d="M5 54H1v-1h4zM5 53H0v-1h5zM5 57.001H4v-1h1z" />
    <path fill="#55F263" d="M5 56.002H3v-1h2z" />
  </svg>
)
