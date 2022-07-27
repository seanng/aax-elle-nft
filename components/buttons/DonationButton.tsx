import { classNames } from 'utils/helpers'

export function DonationButton({ isActive = false, children, ...props }) {
  return (
    <button
      className={classNames(
        'flex rounded-full py-2 px-4 items-center',
        isActive ? 'bg-cucumber' : 'border border-gray-400'
      )}
      {...props}
    >
      <svg
        width="20"
        height="10"
        viewBox="0 0 20 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={isActive ? 'white' : '#cccccc'}
          d="M18.715 4.6425C19.5025 4.24875 20 3.44375 20 2.56344V2.32469C20 1.04062 18.9594 0 17.6753 0C16.6747 0 15.7866 0.640312 15.47 1.58938C15.23 2.30906 15.1075 3 14.2791 3H5.72062C4.865 3 4.73375 2.20187 4.52969 1.58938C4.21344 0.640312 3.325 0 2.32469 0C1.04062 0 0 1.04062 0 2.32469V2.56344C0 3.44375 0.4975 4.24875 1.285 4.6425C1.57969 4.78969 1.57969 5.21031 1.285 5.3575C0.4975 5.75125 0 6.55625 0 7.43656V7.67531C0 8.95937 1.04062 10 2.32437 10C3.325 10 4.21312 9.35969 4.52969 8.41063C4.76969 7.69094 4.89219 7 5.72062 7H14.2791C15.1347 7 15.2659 7.79813 15.47 8.41063C15.7866 9.35969 16.675 10 17.6753 10C18.9591 10 19.9997 8.95937 19.9997 7.67531V7.43656C19.9997 6.55594 19.5022 5.75125 18.7147 5.3575C18.4203 5.21031 18.4203 4.78969 18.715 4.6425Z"
        />
      </svg>
      <span
        className={classNames(
          'text-base font-mono ml-2',
          isActive ? 'text-white' : 'text-gray-400'
        )}
      >
        {children}
      </span>
    </button>
  )
}
