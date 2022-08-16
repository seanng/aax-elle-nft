import { MintNavigation } from 'components'
import { classNames } from 'utils/helpers'

export function MintLayout({ children, className = '' }) {
  return (
    <>
      <MintNavigation />
      <div
        className={classNames(
          className,
          'bg-black min-h-screen pt-navbar-height text-white bg-repeat flex flex-col items-center overflow-hidden'
        )}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        {children}
      </div>
    </>
  )
}
