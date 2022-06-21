export function TRCursorButton({ children, ...props }) {
  return (
    <button
      type="button"
      className="bg-black text-white justify-center rounded-3xl relative border-[6px] px-6 py-4 border-[#55F263]"
      {...props}
    >
      <span className="text-lg font-bold">{children}</span>
      <TRCursor className="absolute -top-[14px] -right-[4px]" />
    </button>
  )
}

function TRCursor(props) {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="m11.942 18.884 5.096-12.967c.562-1.429-1.103-2.698-2.332-1.778L1.78 13.816l4.957 2.183 5.206 2.885Z"
        fill="#000"
        stroke="#000"
        strokeWidth={1.524}
      />
      <path
        d="M14.157 17.607 17.89 4.749c.39-1.343-1.083-2.458-2.27-1.719L1.78 11.652"
        stroke="#1DD840"
        strokeWidth={6}
        strokeLinecap="round"
      />
    </svg>
  )
}
