import { classNames } from 'utils/helpers'

export function OutlinedHeading({
  className = '',
  fontSizeClass = 'text-[28px] md:text-5xl',
  color = '#55F263',
  children,
  ...props
}) {
  return (
    <h2
      className={classNames(
        fontSizeClass,
        'text-black font-medium leading-150%',
        className
      )}
      style={{
        textShadow: `-1px -1px 0 ${color}, 1px -1px 0 ${color}, -1px 1px 0 ${color}, 1px 1px 0 ${color}`,
      }}
      {...props}
    >
      {children}
    </h2>
  )
}
