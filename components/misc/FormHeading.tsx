import { classNames } from 'utils/helpers'

export function FormHeading({ className = '', children }) {
  return (
    <h2
      className={classNames(
        'text-black text-2xl font-medium leading-150%',
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
