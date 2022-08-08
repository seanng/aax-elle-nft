import React from 'react'

export function WarningIcon({ width = 64, height = 64, ...props }) {
  return (
    <svg
      viewBox={`0 0 64 64`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <rect x="4" y="56" width="56" height="8" fill="#FF7A00" />
      <rect x="56" y="48" width="8" height="8" fill="#FF7A00" />
      <rect y="48" width="8" height="8" fill="#FF7A00" />
      <rect x="4" y="40" width="8" height="8" fill="#FF7A00" />
      <rect x="8" y="32" width="8" height="8" fill="#FF7A00" />
      <rect x="12" y="24" width="8" height="8" fill="#FF7A00" />
      <rect x="16" y="16" width="8" height="8" fill="#FF7A00" />
      <rect x="20" y="8" width="8" height="8" fill="#FF7A00" />
      <rect x="24" width="16" height="8" fill="#FF7A00" />
      <rect x="36" y="8" width="8" height="8" fill="#FF7A00" />
      <rect x="40" y="16" width="8" height="8" fill="#FF7A00" />
      <rect x="44" y="24" width="8" height="8" fill="#FF7A00" />
      <rect x="48" y="32" width="8" height="8" fill="#FF7A00" />
      <rect x="52" y="40" width="8" height="8" fill="#FF7A00" />
      <rect x="28" y="20" width="8" height="20" fill="#FF7A00" />
      <rect x="28" y="44" width="8" height="8" fill="#FF7A00" />
    </svg>
  )
}
