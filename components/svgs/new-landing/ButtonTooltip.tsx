export const ButtonTooltip = ({ width = 109, height = 56, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 109 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#alpha)">
      <rect
        x={8}
        y={6}
        width={93}
        height={34}
        rx={2}
        fill="#fff"
        fillOpacity={0.8}
      />
      <g clipPath="url(#beta)">
        <path
          d="m54.657 34.341 5.657 5.657-4.243 4.243a2 2 0 0 1-2.828 0L49 39.998l5.657-5.657Z"
          fill="#fff"
          fillOpacity={0.8}
        />
      </g>
    </g>
    <defs>
      <clipPath id="beta">
        <path
          fill="#fff"
          transform="translate(49 40)"
          d="M0 0h11.314v5.655H0z"
        />
      </clipPath>
      <filter
        id="alpha"
        x={0}
        y={0}
        width={109}
        height={64.31}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={4} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2714_31991"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2714_31991"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
