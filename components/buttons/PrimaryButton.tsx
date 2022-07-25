import { classNames } from 'utils/helpers'

export const PrimaryButton = ({ className = '', ...props }) => {
  return (
    <button
      type="button"
      className={classNames(
        'text-white bg-black w-full rounded-full text-base py-3 disabled:opacity-40',
        className
      )}
      {...props}
    />
  )
}
