import clsx from 'clsx'

export function FormStamp({ children, className = '', ...props }) {
  return (
    <div
      className={clsx(
        'relative flex flex-col justify-between items-center h-12 w-12 ',
        className
      )}
      {...props}
    >
      <div className="w-9 h-1.5 bg-lime" />
      <div className="flex justify-between items-center w-full">
        <div className="w-1.5 h-9 bg-lime" />
        <div className="text-lime font-mono font-medium text-xl">
          {children}
        </div>
        <div className="w-1.5 h-9 bg-lime" />
      </div>
      <div className="w-9 h-1.5 bg-lime" />
    </div>
  )
}
