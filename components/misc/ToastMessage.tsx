export function ToastMessage({ heading = '', body = '' }) {
  return (
    <div className="font-noto tracking-wide leading-150% ml-2">
      <h6 className="font-medium">{heading}</h6>
      <p>{body}</p>
    </div>
  )
}
