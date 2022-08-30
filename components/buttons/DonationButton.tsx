import Image from 'next/image'
import { classNames } from 'utils/helpers'

export function DonationButton({
  isActive = false,
  children,
  className = '',
  ...props
}) {
  return (
    <button
      className={classNames(
        'flex justify-center font-medium font-mono text-xl md:text-3xl items-center w-1/3 p-2',
        isActive ? 'bg-lime text-black' : 'bg-transparent text-lime',
        className
      )}
      {...props}
    >
      <div className="relative w-4 h-6">
        <Image
          layout="fill"
          src={isActive ? '/images/bone-black.png' : '/images/bone-green.png'}
        />
      </div>
      <span className="ml-2">{children}</span>
    </button>
  )
}
