import { classNames } from 'utils/helpers'

export function OutlinedHeading({
  className = '',
  color = '#55F263',
  children,
}) {
  return (
    <h2
      className={classNames(
        'text-black font-medium leading-150% text-[28px] md:text-5xl',
        className
      )}
      style={{
        textShadow: `-1px -1px 0 ${color}, 1px -1px 0 ${color}, -1px 1px 0 ${color}, 1px 1px 0 ${color}`,
      }}
    >
      {children}
    </h2>
  )
}
