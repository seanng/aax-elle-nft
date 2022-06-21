export function BLCursorButton({ children, ...props }) {
  return (
    <button
      type="button"
      className="bg-black text-white justify-center rounded-3xl relative border-[6px] px-6 py-4 border-[#55F263]"
      {...props}
    >
      <span className="text-lg font-bold">{children}</span>
      <BLCursor className="absolute -bottom-[25px] -left-[14px]" />
    </button>
  )
}

function BLCursor(props) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      {...props}
    >
      <path
        d="M15.73 2.932 5.816 28.157c-1.092 2.78 2.146 5.247 4.536 3.458L35.5 12.79l-9.642-4.247L15.73 2.932Z"
        fill="#000"
        stroke="#000"
        strokeWidth={3}
      />
      <path
        d="m3.79 30.932 2.905.75-2.905-.75ZM13.905 3.75a3 3 0 1 0-5.81-1.5l5.81 1.5Zm24.12 16.334a3 3 0 1 0-3.05-5.167l3.05 5.167ZM8.168 34.226l-1.525-2.584 1.525 2.584ZM6.695 31.68l7.21-27.931-5.81-1.5-7.21 27.932 5.81 1.5Zm28.28-16.764L6.643 31.642l3.05 5.167 28.332-16.725-3.05-5.167ZM.885 30.182c-1.328 5.147 4.23 9.33 8.808 6.627l-3.05-5.167a.143.143 0 0 1-.019.01l.008-.002c.013-.003.028-.004.041-.003l.015.002.004.002-.003-.002a.059.059 0 0 1-.013-.01l-.003-.002.003.004a.142.142 0 0 1 .015.054v.007s0-.007.004-.02l-5.81-1.5Z"
        fill="#55F263"
      />
    </svg>
  )
}
