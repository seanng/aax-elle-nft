import { classNames } from 'utils/helpers'

export function FormHeading({ className = '', children }) {
  return (
    <h2
      className={classNames(
        'text-black font-medium leading-150% text-[28px] md:text-5xl',
        className
      )}
      style={{
        textShadow:
          '-1px -1px 0 #55F263, 1px -1px 0 #55F263, -1px 1px 0 #55F263, 1px 1px 0 #55F263',
      }}
    >
      {children}
    </h2>
  )
}
