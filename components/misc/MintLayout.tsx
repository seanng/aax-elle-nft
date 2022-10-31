import clsx from 'clsx'
import { MintNavigation, MintFooter } from 'components'

export function MintLayout({ children, className = '' }) {
  return (
    <>
      <MintNavigation />
      <div
        className={clsx(
          className,
          'bg-black min-h-screen pt-navbar-height pb-10 md:pb-20 text-white bg-repeat'
        )}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px), linear-gradient(to bottom, rgba(85, 242, 99, 0.3) 0.1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        {children}
      </div>
      <MintFooter />
    </>
  )
}
