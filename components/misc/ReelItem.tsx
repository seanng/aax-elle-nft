export function ReelItem({ children }) {
  return (
    <div
      className="
        text-center
        font-cubic
        tracking-wide
        text-white
        overflow-hidden
        whitespace-nowrap
        transform-gpu
        text-ellipsis
        text-xl
        md:text-5xl
        h-full
        flex
        items-center
        justify-center"
    >
      {children}
    </div>
  )
}
