import { classNames } from 'utils/helpers'

export const SecondaryButton = ({ className = '', ...props }) => {
  return (
    <button
      type="button"
      className={classNames(
        'text-black bg-white border border-black w-full rounded-full text-base py-3 disabled:opacity-40',
        className
      )}
      {...props}
    />
  )
}
