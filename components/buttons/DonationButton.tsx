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
        'flex justify-between font-medium text-xl items-center w-1/3 p-2',
        isActive ? 'bg-lime text-black' : 'bg-transparent text-lime',
        className
      )}
      {...props}
    >
      <Image
        width={16}
        height={22}
        src={isActive ? '/images/bone-black.png' : '/images/bone-green.png'}
      />
      <span>{children}</span>
    </button>
  )
}
