import { classNames } from 'utils/helpers'

export const WarningStamp = ({ className = '', ...props }) => (
  <div
    className={classNames(
      'relative flex flex-col justify-between items-center h-8 w-8 flex-none',
      className
    )}
    {...props}
  >
    <div className="w-6 h-1 bg-white" />
    <div className="flex justify-between items-center w-full">
      <div className="w-1 h-6 bg-white" />
      <div className="text-white font-mono font-bold text-md">!</div>
      <div className="w-1 h-6 bg-white" />
    </div>
    <div className="w-6 h-1 bg-white" />
  </div>
)
