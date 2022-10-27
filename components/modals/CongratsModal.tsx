import { ModalCloseButton, HeartIcon } from 'components'
import { Container } from './Container'
import clsx from 'clsx'

const borderBase = 'absolute bg-black border-4'
const Borders = ({ classes = '' }) => {
  const baseClasses = clsx(borderBase, classes)
  return (
    <>
      <div className={clsx(baseClasses, '-top-5 h-6 w-full border-b-0')} />
      <div className={clsx(baseClasses, '-bottom-5 h-6 w-full border-t-0')} />
      <div className={clsx(baseClasses, '-left-5 w-6 h-full border-r-0')} />
      <div className={clsx(baseClasses, '-right-5 w-6 h-full border-l-0')} />
    </>
  )
}

export function CongratsModal({ onClose, isOpen, prizeName }) {
  return (
    <Container onClose={onClose} isOpen={isOpen}>
      <ModalCloseButton
        onClick={onClose}
        className="absolute -right-2 -top-4 sm:top-0"
        fill="#55F263"
      />
      <div className="relative bg-transparent text-white mt-10 sm:mt-16 mb-10 sm:mb-0">
        <Borders classes="border-lime" />
        <div className="bg-black py-3 w-60 md:w-96 px-3 h-72 md:h-96">
          <div className="relative w-full h-full">
            <Borders classes="border-guava border-dashed" />
            <div className="flex flex-col items-center py-5 md:py-8">
              <HeartIcon color="#55F263" />
              <h2 className="text-lime font-bold font-noto text-2xl md:text-3xl mt-2 md:mt-4">
                恭喜你抽中
              </h2>
              <h1 className="text-white font-cubic text-4xl md:text-6xl my-4 md:my-7 text-center !leading-120%">
                {prizeName}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
